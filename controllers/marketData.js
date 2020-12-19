const Market = require("../models/market.js");

const ValidationError = require("mongoose").Error.ValidationError;
const axios = require("axios");

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
                if(err instanceof ValidationError){
                    return res.json(err.errors[Object.keys(err.errors)[0]].properties.message);
                }
                return res.json("ERROR: MARKET CREATION FAILED");
            });
    },

    /*
    PUT - Updates a market's data
    req.body = {
        id: String // id of the market
        name: String // name of the market,
        address: String // address of the place where the market is held (empty if none),
        description: String, // description of the market
    }
    response = Market
    */
    updateMarket: function(req, res){
        Market.findOne({_id: req.body.id})
            .then(async (market)=>{
                if(market.owner.toString() !== req.session.vendor){
                    throw "YOU DO NOT HAVE PERMISSION TO DO THAT";
                }

                if(req.body.address !== market.address.full){
                    const apiUrl = "https://api.geocod.io/v1.6/geocode";
                    const address = req.body.address.replace(/ /g, "+");
                    const fullUrl = `${apiUrl}?q=${address}&api_key=${process.env.MARKET_GEOENCODE_KEY}&limit=1`;

                    try{
                        const geoData = await axios.get(fullUrl);
                        const result = geoData.data.results[0];
                        const lat = result.location.lat;
                        const lng = result.location.lng;

                        market.location = {
                            type: "Point",
                            coordinates: [lat, lng]
                        }

                        const comps = result.address_components;
                        market.address = {
                            streetNumber: comps.number,
                            road: comps.formatted_street,
                            city: comps.city,
                            county: comps.county,
                            state: comps.state,
                            country: comps.country,
                            zipCode: comps.zip,
                            full: result.formatted_address
                        }
                    }catch(err){
                        throw err;
                    }
                }

                market.name = req.body.name;
                market.description = req.body.description;

                return market.save();
            })
            .then((market)=>{
                return res.json(market);
            })
            .catch((err)=>{
                if(typeof(err) === "string"){
                    return res.json(err);
                }
                if(err instanceof ValidationError){
                    return res.json(err.errors[Object.keys(err.errors)[0]].properties.message);
                }
                return res.json("ERROR: UNABLE TO UPDATE MARKET DATA");
            });
    },

    

    /*
    GET: Gets a list of all markets in the area
    queries:
        address = address to search from
        distance = the distance(in miles) in miles, from the address, to search
    response = [Market]
    */
    getMarkets: function(req, res){
        const apiUrl = "https://api.geocod.io/v1.6/geocode";
        const address = req.query.address;
        const fullUrl = `${apiUrl}?q=${address}&api_key=${process.env.MARKET_GEOENCODE_KEY}&limit=1`;

        axios.get(fullUrl)
            .then((response)=>{
                const location = [response.data.results[0].location.lat, response.data.results[0].location.lng];
                const distance = parseFloat(req.query.distance) * 1609.344;

                return Market.find({
                    location: {
                        $nearSphere: {
                            $maxDistance: distance,
                            $geometry: {
                                type: "Point",
                                coordinates: location
                            }
                        }
                    }
                });
            })
            .then((markets)=>{
                return res.json(markets);
            })
            .catch((err)=>{
                return res.json("ERROR: UNABLE TO PERFORM SEARCH");
            });
    },

    /*
    POST: add Vendors to the Market's list of Vendors
    req.body = [String (Vendor ids)]
    response = Market
    */
    addVendors: function(req, res){
        if(req.session.vendor === undefined){
            return res.json("YOU DO NOT HAVE PERMISSION TO DO THAT");
        }

        Market.findOne({_id: req.params.id})
            .then((market)=>{
                if(market.owner.toString() !== req.session.vendor){
                    throw "YOU DO NOT HAVE PERMISSION TO DO THAT";
                }

                for(let i = 0; i < req.body.length; i++){
                    market.vendors.push(req.body[i]);
                }

                return market.save();
            })
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
                return res.json("ERROR: ADDING VENDORS TO MARKET FAILED");
            });
    },

    /*
    GET - get the data for a single market
    params: Market id
    response = Market (owner/vendors populated)
    */
    getMarket: function(req, res){
        Market.findOne({_id: req.params.id})
            .populate("vendor", "name url description items")
            .populate("vendors", "name url description items")
            .then((market)=>{
                if(market === null){
                    throw "UNABLE TO FIND THAT MARKET";
                }

                return res.json(market);
            })
            .catch((err)=>{
                if(typeof(err) === "string"){
                    return res.json(err);
                }
                return res.json("ERROR: UNABLE TO SEARCH FOR THE MARKET");
            });
    },

    /*
    DELETE: remove a market from the database
    params:
        id = id of market to remove
    repsonse = {}
    */
    removeMarket: function(req, res){
        if(req.session.vendor === undefined){
            return res.json("YOU DO NOT HAVE PERMISSION TO DO THAT");
        }

        Market.findOne({_id: req.params.id})
            .then((market)=>{
                if(market.owner.toString() !== req.session.vendor){
                    throw "YOU DO NOT HAVE PERMISSION TO DO THAT";
                }

                return Market.deleteOne({_id: req.params.id});
            })
            .then((response)=>{
                return res.json({});
            })
            .catch((err)=>{
                if(typeof(err) === "string"){
                    return res.json(err);
                }
                return res.json("ERROR: UNABLE TO DELETE VENDOR");
            });
    }
}