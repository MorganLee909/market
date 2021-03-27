const Vendor = require("../models/vendor.js");

const helper = require("./helper.js");

const bcrypt = require("bcryptjs");
const axios = require("axios");
const ValidationError = require("mongoose").Error.ValidationError;

module.exports = {
    /*
    GET: Gets all vendors in the area
    queries:
        address = address to search from
        distance = the distance (in miles) from the address, to search
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
                        description: 1,
                        url: 1,
                        items: 1,
                        ownerName: 1,
                        address: 1
                    }
                );
            })
            .then((vendors)=>{
                let response = [];
                for(let i = 0; i < vendors.length; i++){
                    response.push({
                        name: vendors[i].name,
                        description: vendors[i].description,
                        url: vendors[i].url,
                        items: vendors[i].items,
                        ownerName: vendors[i].ownerName,
                        address: vendors[i].address.city
                    });
                }

                return res.json(response);
            })
            .catch((err)=>{
                return res.json("ERROR: UNABLE TO PERFORM SEARCH");
            });
    },

    /*
    GET: Checks for a logged in user
    response = Vendor || null
    */
    checkSession: function(req, res){
        return res.json(res.locals.vendor);
    },

    /*
    GET: Gets a single vendor
    params: 
        id: id of the vendor to retrieve
    response = Vendor
    */
    getVendor: function(req, res){
        Vendor.findOne({_id: req.params.id})
            .then((vendor)=>{
                if(vendor === null) throw "THIS VENDOR DOES NOT EXIST";

                let address = (res.locals.vendor !== null && vendor._id.toString() === res.locals.vendor._id.toString()) ? vendor.address : vendor.address.city;

                return res.json({
                    _id: vendor._id,
                    name: vendor.name,
                    email: vendor.email,
                    url: vendor.url,
                    items: vendor.items,
                    description: vendor.description,
                    ownerName: vendor.ownerName,
                    address: address
                });
            })
            .catch((err)=>{
                if(typeof(err) === "string") return res.json(err);
                return res.json("ERROR: UNABLE TO FIND VENDOR");
            });
    },

    /*
    POST: Creates a single vendor
    req.body = {
        name: name of the business,
        email: email of the business,
        password: password for the vendor,
        confirmPassword: confirmation of password
    }
    response = Vendor
    */
    createVendor: async function(req, res){
        const email = req.body.email.toLowerCase();
        const vendor = await Vendor.findOne({email: email});
        if(vendor !== null) return res.json("VENDOR WITH THIS EMAIL ADDRESS ALREADY EXISTS");

        let expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 90);

        helper.createURL(req.body.name)
            .then((url)=>{
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);

                let newVendor = new Vendor({
                    name: req.body.name,
                    email: email,
                    password: hash,
                    url: url,
                    status: [],
                    session: {
                        sessionId: helper.generateId(25),
                        expiration: expirationDate
                    }
                });

                return newVendor.save();
            })
            .then((vendor)=>{
                req.session.vendor = vendor.session.sessionId;

                vendor.status = undefined;
                vendor.password = undefined;
                vendor.session = undefined;

                return res.json(vendor);
            })
            .catch((err)=>{
                if(typeof(err) === "string") return res.json(err);
                if(err instanceof ValidationError) return res.json(err.errors[Object.keys(err.errors)[0]].properties.message);
                return res.json("ERROR: VENDOR CREATION FAILED");
            });
    },

    /*
    GET: logs in the vendor
    req.body = {
        email: String (vendor email)
        password: String (vendor password)
    }
    response = Vendor (returns private data)
    */
    vendorLogin: function(req, res){
        Vendor.findOne({email: req.body.email.toLowerCase()})
            .then((vendor)=>{
                if(vendor === null) throw "INCORRECT EMAIL OR PASSWORD";

                return bcrypt.compare(req.body.password, vendor.password, (err, result)=>{
                    if(result === true){
                        req.session.vendor = vendor.session.sessionId;
                        return res.json(vendor)
                    }

                    return res.json("INCORRECT EMAIL OR PASSWORD");
                }); 
            })
            .catch((err)=>{
                if(typeof(err) === "string") return res.json(err);
                return res.json("ERROR: UNABLE TO VALIDATE PASSWORD");
            });
    },

    /*
    PUT: Updates the profile information of the vendor
    req.body: {
        id: String,
        name: String,
        email: String,
        ownerName: String,
        description: String,
        address: String,
        sharesAddress: Boolean,
        sharesOwnerName: Boolean
    }
    response = Vendor (returns private data)
    */
    updateVendor: async function(req, res){
        if(res.locals.vendor === null) return res.json("YOU DO NOT HAVE PERMISSION TO DO THAT");
        if(res.locals.vendor._id.toString() !== req.body.id) return res.json("YOU DO NOT HAVE PERMISSION TO DO THAT");

        //Validate and update email
        const email = req.body.email.toLowerCase();
        if(email !== res.locals.vendor.email){
            const vendor = await Vendor.findOne({email: email});
            if(vendor !== null) throw "VENDOR WITH THIS EMAIL ADDRESS ALREADY EXISTS";
            res.locals.vendor.email = email;
        }

        //Update address and coordinates of vendor
        if(req.body.address !== res.locals.vendor.address.full){
            if(req.body.address === ""){
                res.locals.vendor.address = undefined;
            }else{
                const apiUrl = "https://api.geocod.io/v1.6/geocode";
                const address = req.body.address.replace(/ /g, "+");
                const fullUrl = `${apiUrl}?q=${address}&api_key=${process.env.MARKET_GEOENCODE_KEY}&limit=1`;

                try{
                    const geoData = await axios.get(fullUrl);
                    const result = geoData.data.results[0];
                    const lat = result.location.lat;
                    const lng = result.location.lng;
                    
                    res.locals.vendor.location = {
                        type: "Point",
                        coordinates: [lat, lng]
                    }

                    const comps = result.address_components;
                    res.locals.vendor.address = {
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
        }

        //Validate name and update name/url
        if(req.body.name !== res.locals.vendor.name){
            res.locals.vendor.name = req.body.name;
            res.locals.vendor.url = await helper.createURL(req.body.name);
        }

        res.locals.vendor.ownerName = req.body.ownerName;
        res.locals.vendor.description = req.body.description;

        res.locals.vendor.save()
            .then((vendor)=>{
                vendor.password = undefined;
                vendor.status = undefined;

                return res.json(vendor);
            })
            .catch((err)=>{
                if(typeof(err) === "string") return res.json(err);
                if(err instanceof ValidationError) return res.json(err.errors[Object.keys(err.errors)[0]].properties.message);
                return res.json("ERROR: UNABLE TO UPDATE YOUR DATA");
            });
    },

    /*
    DELETE: remove a single vendor
    response = {}
    */
    removeVendor: function(req, res){
        if(req.params.id !== res.locals.vendor._id.toString()) return res.json("YOU DO NOT HAVE PERMISSION TO DO THAT");

        Vendor.deleteOne({_id: req.params.id})
            .then((response)=>{
                return res.json({});
            })
            .catch((err)=>{
                return res.json("ERROR: UNABLE TO DELETE VENDOR");
            });
    }
}