const Vendor = require("../models/vendor.js");

const Validator = require("./validate.js");
const Helper = require("./helper.js");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcryptjs");

module.exports = {
    /*
    Gets a single vendor
    output = Vendor
    */
    getVendor: function(req, res){
        Vendor.aggregate([
            {$match: {
                _id: ObjectId(req.session.user)
            }},
            {$project: {
                _id: 0,
                name: 1,
                url: 1,
                description: 1,
                status: 1,
                items: 1
            }}
        ])
            .then((vendor)=>{
                vendor[0].status = undefined;
                return res.json(vendor[0]);
            })
            .catch((err)=>{
                return res.json("ERROR: Unable to find vendor");
            });
    },

    /*
    Creates a single vendor
    req.body = {
        name: name of the business,
        email: email of the business,
        password: password for the vendor,
        confirmPassword: confirmation of password,
    }
    */
    createVendor: async function(req, res){
        const validation = Validator.newVendor(req.body);
        if(validation !== true){
            return res.json(validation);
        }

        if(await Vendor.findOne({email: req.body.email})){
            return res.json("An account with that email already exists");
        }

        Helper.createURL(req.body.name)
            .then((url)=>{
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);

                let newVendor = new Vendor({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    url: url
                });

                return newVendor.save();
            })
            .then((vendor)=>{
                return res.json({});
            })
            .catch((err)=>{
                return res.json("ERROR: Unable to create vendor at this time");
            });
    }
}