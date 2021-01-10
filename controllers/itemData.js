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
    },

    /*
    DELETE: removes a single item from a vendor's list of items
    params:
        id: id of the item to remove
    response = {}
    */
    removeItem: function(req, res){
        if(req.session.vendor === undefined){
            return "YOU DO NOT HAVE PERMISSION TO DO THAT";
        }

        Vendor.findOne({_id: req.session.vendor})
            .then((vendor)=>{
                let exists = false;
                for(let i = 0; i < vendor.items.length; i++){
                    if(vendor.items[i]._id.toString() === req.params.id){
                        vendor.items.splice(i, 1);
                        exists = true;
                    }
                }

                if(exists === false){
                    throw "UNABLE TO FIND THAT ITEM";
                }

                return vendor.save();
            })
            .then((vendor)=>{
                return res.json({});
            })
            .catch((err)=>{
                if(typeof(err) === "string"){
                    return res.json(err);
                }
                return res.json("ERROR: UNABLE TO DELETE YOUR ITEM");
            });
    },

    /*
    PUT: update a list of items
    req.body = [{
        id: String
        name: String,
        quantity: Number,
        unit: String
    }]
    response = Vendor (returns private data)
    */
    updateItems: function(req, res){
        if(req.session.vendor === undefined){
            return "YOU DO NOT HAVE PERMISSION TO DO THAT";
        }

        Vendor.findOne({_id: req.session.vendor})
            .then((vendor)=>{
                for(let i = 0; i < req.body.length; i++){
                    for(let j = 0; j < vendor.items.length; j++){
                        if(req.body[i].id === vendor.items[j]._id.toString()){
                            vendor.items[j].name = req.body[i].name;
                            vendor.items[j].quantity = req.body[i].quantity;
                            vendor.items[j].unit = req.body[i].unit;

                            break;
                        }
                    }
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
                return res.json("ERROR: UNABLE TO UPDATE YOUR ITEMS");
            });
    }
}