const Vendor = require("../models/vendor.js");

const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    getVendor: function(req, res){
        if(!req.session.user){
            return res.json("You must be logged in to do that");
        }

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
                vendor.status = undefined;
                return res.json(vendor);
            })
            .catch((err)=>{
                return res.json("ERROR: Unable to find vendor");
            });
    }
}