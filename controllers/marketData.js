const Market = require("../models/market.js");

const ValidationError = require("mongoose").Error.ValidationError;

module.exports = {
    /*
    POST - Creates a new market
    req.body = {
        name: String //name of the new market,
    }
    response = Market
    */
    createMarket: function(req, res){
        if(req.session.vendor === undefined){
            return res.json("YOU MUST HAVE A VENDOR ACCOUNT TO CREATE A MARKET");
        }

        let market = new Market({
            name: req.body.name,
            owner: req.session.vendor
        });

        market.save()
            .then((market)=>{
                return res.json(market);
            })
            .catch((err)=>{
                console.log(err);
                if(typeof(err) === "string"){
                    return res.json(err);
                }
                if(err instanceof ValidationError){
                    return res.json(err.errors[Object.keys(err.errors)[0]].properties.message);
                }
                return res.json("ERROR: MARKET CREATION FAILED");
            });
    }
}