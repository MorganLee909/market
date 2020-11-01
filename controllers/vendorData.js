const Vendor = require("../models/vendor.js");

const VendorValidator = require("../validation/vendor.js");
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
        const vendorCheck = await VendorValidator.new(
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.confirmPassword
        );
        if(vendorCheck !== true){
            return res.json(vendorCheck);
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
    },

    /*
    Updates the profile information of the vendor
    req.body = {
        name: String,
        email: String,
        ownerName: String,
        description: String,
        address: String (should be formatted already)
    }
    response = Vendor object
    */
    // updateVendor: function(req, res){
    //     if(!req.session.user){
    //         return res.json("You do not have permission to do that");
    //     }

    //     Vendor.findOne({_id: req.session.user})
    //         .then((vendor)=>{
    //             if(req.body.email !== vendor.email){

    //             }

    //             if(req.body.name !== vendor.name){
    //                 vendor.url = Helper.createURL(req.body.name);
    //             }

                

    //             vendor.name = req.body.name;
    //             vendor.email = req.body.email;
    //             vendor.ownerName = req.body.ownerName;
    //             vendor.description = req.body.description;

    //             return vendor.save();
    //         })
    //         .then((vendor)=>{
    //             return res.json(vendor);
    //         })
    //         .catch((err)=>{
    //             return res.json("ERROR: Unable to update your data");
    //         });
    // }
}