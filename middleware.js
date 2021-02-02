const Vendor = require("./models/vendor.js");

const helper = require("./controllers/helper.js");

module.exports = {
    verifyVendor: function(req, res, next){
        if(req.session.vendor === undefined){
            res.locals.vendor = null;
            return;
        }

        Vendor.findOne({"session.sessionId": req.session.vendor})
            .then((vendor)=>{
                if(vendor === null){
                    throw "none";
                }

                if(vendor.session.date < new Date){
                    let newExpiration = new Date();
                    newExpiration.setDate(newExpiration.getDate() + 90);

                    vendor.session.sessionId = helper.generateId(25);
                    vender.session.expiration = newExpiration;
                    vendor.save();
                    res.locals.vendor = null;
                    throw "login";
                }

                res.locals.vendor = vendor;
                return next();
            })
            .catch((err)=>{
                if(typeof(err) === "string"){
                    return res.json(err);
                }
                return res.json("ERROR: UNABLE TO RETRIEVE DATA");
            });
    }
}