const Market = require("../models/market.js");

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
                if(typeof(err) === "string"){
                    return res.json(err);
                }
                return res.json("ERROR: MARKET CREATION FAILED");
            });
    }
}