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
        if(res.locals.vendor === null){
            return res.json("YOU DO NOT HAVE PERMISSION TO DO THAT");
        }

        for(let i = 0; i < req.body.length; i++){
            res.locals.vendor.items.push(req.body[i]);
        }

        res.locals.vendor.save()
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
        if(res.locals.vendor === null){
            return "YOU DO NOT HAVE PERMISSION TO DO THAT";
        }

        let exists = false;
        for(let i = 0; i < res.locals.vendor.items.length; i++){
            if(res.locals.vendor.items[i]._id.toString() === req.params.id){
                res.locals.vendor.items.splice(i, 1);
                exists = true;
            }
        }

        if(exists === false){
            throw "UNABLE TO FIND THAT ITEM";
        }

        res.locals.vendor.save()
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
        id: String,
        name: String,
        quantity: Number,
        unit: String
    }]
    response = updated Vendor item
    */
    updateItems: function(req, res){
        if(res.locals.vendor === null){
            return "YOU DO NOT HAVE PERMISSION TO DO THAT";
        }

        let item = {};
        for(let i = 0; i < req.body.length; i++){
            for(let j = 0; j < res.locals.vendor.items.length; j++){
                if(req.body[i].id === res.locals.vendor.items[j]._id.toString()){
                    res.locals.vendor.items[j].name = req.body[i].name;
                    res.locals.vendor.items[j].quantity = req.body[i].quantity;
                    res.locals.vendor.items[j].unit = req.body[i].unit;

                    item = res.locals.vendor.items[j];

                    break;
                }
            }
        }

        res.locals.vendor.save()
            .then((vendor)=>{
                vendor.password = undefined;
                vendor.status = undefined;

                return res.json(item);
            })
            .catch((err)=>{
                if(err instanceof ValidationError){
                    return res.json(err.errors[Object.keys(err.errors)[0]].properties.message);
                }
                return res.json("ERROR: UNABLE TO UPDATE YOUR ITEMS");
            });
    }
}