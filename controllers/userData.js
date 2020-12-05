const User = require("../models/user.js");

const bcrypt = require("bcryptjs");

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
                return res.json(user);
            })
            .catch((err)=>{
                if(typeof(err) === "string"){
                    return res.json(err);
                }
                if(err.name === "ValidationError"){
                    return res.json(err.errors[Object.keys(err.errors)[0]].properties.message);
                }
                return res.json("ERROR: NEW USER CREATION FAILED");
            });
    }
}