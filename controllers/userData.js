const User = require("../models/user.js");

const bcrypt = require("bcryptjs");
const ValidationError = require("mongoose").Error.ValidationError;

module.exports = {
    /*
    POST: Create a new user
    req.body = {
        name: String,
        email: String,
        password: String,
        confirmPassword: String
    }
    response = User
    */
    createUser: function(req, res){
        const email = req.body.email.toLowerCase();

        User.findOne({email: email})
            .then((user)=>{
                if(user !== null){
                    throw "USER WITH THAT EMAIL ALREADY EXISTS";
                }

                if(req.body.password !== req.body.confirmPassword){
                    throw "PASSWORDS DO NOT MATCH";
                }

                if(req.body.password.length < 10){
                    throw "PASSWORD MUST CONTAIN AT LEAST 10 CHARACTERS";
                }

                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);

                return new User({
                    name: req.body.name,
                    email: email,
                    password: hash
                }).save();
            })
            .then((user)=>{
                user.password = undefined;
                return res.json(user);
            })
            .catch((err)=>{
                if(typeof(err) === "string"){
                    return res.json(err);
                }
                if(err instanceof ValidationError){
                    return res.json(err.errors[Object.keys(err.errors)[0]].properties.message);
                }
                return res.json("ERROR: NEW USER CREATION FAILED");
            });
    },

    /*
    PUT: Updates a user's data
    req.body = {
        id: String,
        name: String,
        email: String
    }
    response = User
    */
    updateUser: function(req, res){
        if(req.session.user !== req.body.id){
            return res.json("YOU DO NOT HAVE PERMISSION TO DO THAT");
        }

        const email = req.body.email.toLowerCase();

        User.findOne({_id: req.body.id})
            .then(async (user)=>{
                if(email !== user.email){
                    const emailCheck = await User.findOne({email: email});
                    if(emailCheck !== null){
                        throw "USER WITH THAT EMAIL ADDRESS ALREADY EXISTS";
                    }

                    user.email = email;
                }

                user.name = req.body.name;

                return user.save();
            })
            .then((user)=>{
                user.password = undefined;
                return res.json(user);
            })
            .catch((err)=>{
                if(typeof(err) === "string"){
                    return res.json(err);
                }
                if(err instanceof ValidationError){
                    return res.json(err.errors[Object.keys(err.errors)[0]].properties.message);
                }
                return res.json("ERROR: USER UPDATE FAILED");
            });
    },

    /*
    GET: logs in the user
    req.body = {
        email: String (user email),
        password: String (user password)
    }
    response = {} (return a string if the login failed)
    */
    userLogin: function(req, res){
        User.findOne({email: req.body.email.toLowerCase()})
            .then((user)=>{
                if(user === null){
                    throw "INCORRECT EMAIL OR PASSWORD";
                }

                return bcrypt.compare(req.body.password, user.password, (err, result)=>{
                    if(result === true){
                        req.session.user = user._id;
                        return res.json({});
                    }

                    return res.json("INCORRECT EMAIL OR PASSWORD");
                });
            })
            .catch((err)=>{
                if(typeof(err) === "string"){
                    return res.json(err);
                }
                return res.json("ERROR: UNABLE TO VALIDATE PASSWORD");
            });
    },

    getUser: function(req, res){
        if(req.session.user !== req.params.id){
            return res.json("YOU DO NOT HAVE PERSMISSION TO DO THAT");
        }

        User.findOne({_id: req.session.user}, {password: 0})
            .then((user)=>{
                return res.json(user);
            })
            .catch((err)=>{
                return res.json("ERROR: UNABLE TO RETRIEVE USER DATA");
            });
    },

    removeUser: function(req, res){
        if( req.session.user !== req.params.id){
            return res.json("YOU DO NOT HAVE PERMISSION TO DO THAT");
        }

        User.deleteOne({_id: req.session.user})
            .then((user)=>{
                return res.json({});
            })
            .catch((err)=>{
                return res.json("ERROR: USER DELETION FAILED");
            });
    }
}