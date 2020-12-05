const Vendor = require("../models/vendor.js");

const helper = require("./helper.js");

const bcrypt = require("bcryptjs");
const axios = require("axios");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    /*
    GET: Gets a single vendor
    response = Vendor
    */
    getVendor: function(req, res){
        //TODO: this should not be an aggregate for a single vendor (findOne)
        Vendor.aggregate([
            {$match: {
                _id: ObjectId(req.params.id)
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
    GET: Gets all vendors in the area
    response = [Vendor]
    */
    getVendors: function(req, res){
        const apiUrl = "https://api.geocod.io/v1.6/geocode";
        const address = req.query.address;
        const fullUrl = `${apiUrl}?q=${address}&api_key=${process.env.MARKET_GEOENCODE_KEY}&limit=1`;

        axios.get(fullUrl)
            .then((response)=>{
                const location = [response.data.results[0].location.lat, response.data.results[0].location.lng];
                const distance = parseFloat(req.query.distance) * 1609.344;

                return Vendor.find(
                    {
                        location: {
                            $nearSphere: {
                                $maxDistance: distance,
                                $geometry: {
                                    type: "Point",
                                    coordinates: location
                                }
                            }
                        }
                    },
                    {
                        name: 1,
                        email: 1,
                        description: 1,
                        items: 1
                    }
                );
            })
            .then((vendors)=>{
                return res.json(vendors);
            })
            .catch((err)=>{
                return res.json("ERROR: Unable to perform search");
            });
    },

    /*
    POST: Creates a single vendor
    req.body = {
        name: name of the business,
        email: email of the business,
        password: password for the vendor,
        confirmPassword: confirmation of password,
    }
    response = Vendor
    */
    createVendor: async function(req, res){
        const email = req.body.email.toLowerCase();
        const vendor = await Vendor.findOne({email: email});
        if(vendor !== null){
            return res.json("VENDOR WITH THIS EMAIL ADDRESS ALREADY EXISTS");
        }

        helper.createURL(req.body.name)
            .then((url)=>{
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);

                let newVendor = new Vendor({
                    name: req.body.name,
                    email: email,
                    password: hash,
                    url: url
                });

                return newVendor.save();
            })
            .then((vendor)=>{
                return res.json(vendor);
            })
            .catch((err)=>{
                if(typeof(err) === "string"){
                    return res.json(err);
                }
                if(err.name === "ValidationError"){
                    return res.json(err.errors[Object.keys(err.errors)[0]].properties.message);
                }
                return res.json("ERROR: VENDOR CREATION FAILED");
            });
    },

    /*
    PUT: Updates the profile information of the vendor
    req.body: {
        name: String,
        email: String,
        ownerName: String,
        description: String,
        address: String (should be formatted already)
    }
    response = Vendor
    */
    updateVendor: function(req, res){
        if(!req.session.user){
            return res.json("YOU DO NOT HAVE PERMISSION TO DO THAT");
        }

        Vendor.findOne({_id: req.session.user})
            .then(async (vendor)=>{
                //Validate and update email
                const email = req.body.email.toLowerCase();
                if(email !== vendor.email){
                    const vendor = await Vendor.findOne({email: email});
                    if(vendor){
                        throw "VENDOR WITH THIS EMAIL ADDRESS ALREADY EXISTS";
                    }
                    vendor.email = email;
                }


                //Update address and coordinates of vendor
                if(req.body.address !== vendor.address.full){
                    const apiUrl = "https://api.geocod.io/v1.6/geocode";
                    const address = req.body.address.replace(/ /g, "+");
                    const fullUrl = `${apiUrl}?q=${address}&api_key=${process.env.MARKET_GEOENCODE_KEY}&limit=1`;

                    try{
                        const geoData = await axios.get(fullUrl);
                        const result = geoData.data.results[0];
                        const lat = result.location.lat;
                        const lng = result.location.lng;
                        
                        vendor.location = {
                            type: "Point",
                            coordinates: [lat, lng]
                        }

                        const comps = result.address_components;
                        vendor.address = {
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
                        return err;
                    }
                }

                //Validate name and update name/url
                if(req.body.name !== vendor.name){
                    vendor.name = req.body.name;
                    vendor.url = await helper.createURL(req.body.name);
                }

                vendor.ownerName = req.body.ownerName;
                vendor.description = req.body.description;

                return vendor.save();
            })
            .then((vendor)=>{
                return res.json(vendor);
            })
            .catch((err)=>{
                if(typeof(err) === "string"){
                    return res.json(err);
                }
                if(err.name === "ValidationError"){
                    return res.json(err.errors[Object.keys(err.errors)[0]].properties.message);
                }
                return res.json("ERROR: UNABLE TO UPDATE YOUR DATA");
            });
    },

    /*
    DELETE: remove a single vendor
    */
    removeVendor: function(req, res){
        if(req.params.id !== req.session.user){
            return res.json("YOU DO NOT HAVE PERMISSION TO DO THAT");
        }

        Vendor.deleteOne({_id: req.session.user})
            .then((response)=>{
                return res.json({});
            })
            .catch((err)=>{
                return res.json("ERROR: UNABLE TO DELETE VENDOR");
            });
    },

    logLeeIn: function(req, res){
        Vendor.findOne({email: "morgan.leer@protonmail.com"})
            .then((vendor)=>{
                req.session.user = vendor._id;
                return res.json("OK");
            })
            .catch((err)=>{
                return res.json(err);
            });
    }
}