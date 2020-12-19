const Vendor = require("../models/vendor.js");

const ValidationError = require("mongoose").Error.ValidationError;

module.exports = {
    /*
    POST: add items to a specific vendor
    req.body = [{
        name: String,
        quantity: Number,
        unit: String
    }]
    response = Vendor (returns private data)
    */
    addItems: function(req, res){
        if(req.session.vendor === undefined){
            return "YOU DO NOT HAVE PERMISSION TO DO THAT";
        }

        Vendor.findOne({_id: req.session.vendor})
            .then((vendor)=>{
                for(let i = 0; i < req.body.length; i++){
                    vendor.items.push(req.body[i]);
                }

                return vendor.save();
            })
            .then((vendor)=>{
                vendor.password = undefined;
                vendor.status = undefined;

                return res.json(vendor);
            })
            .catch((err)=>{
                if(err instanceof ValidationError){
                    return res.json(err.errors[Object.keys(err.errors)[0]].properties.message);
                }
                return res.json("ERROR: UNABLE TO ADD YOUR ITEMS");
            });
    }
}