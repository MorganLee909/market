const bcrypt = require("bcryptjs");
const axios = require("axios");
const ObjectId = require("mongoose").Types.ObjectId;

const Vendor = require("../models/vendor.js");

const VendorValidator = require("../validation/vendor.js");
const Helper = require("./helper.js");

module.exports = {
    /*
    Gets a single vendor
    output = Vendor
    */
    getVendor: function(req, res){
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
    Gets all vendors in the area
    output = [Vendor]
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
    Creates a single vendor
    req.body = {
        name: name of the business,
        email: email of the business,
        password: password for the vendor,
        confirmPassword: confirmation of password,
    }
    */
    createVendor: async function(req, res){
        const vendorCheck = await VendorValidator.new(
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.confirmPassword
        );
        if(vendorCheck !== true){
            return res.json(vendorCheck);
        }

        Helper.createURL(req.body.name)
            .then((url)=>{
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);

                let newVendor = new Vendor({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    url: url
                });

                return newVendor.save();
            })
            .then((vendor)=>{
                return res.json({});
            })
            .catch((err)=>{
                return res.json("ERROR: Unable to create vendor at this time");
            });
    },

    /*
    Updates the profile information of the vendor
    req.body: {
        name: String,
        email: String,
        ownerName: String,
        description: String,
        address: String (should be formatted already)
    }
    response = Vendor object
    */
    updateVendor: function(req, res){
        if(!req.session.user){
            return res.json("You do not have permission to do that");
        }

        Vendor.findOne({_id: req.session.user})
            .then(async (vendor)=>{
                //Validate and update email
                if(req.body.email !== vendor.email){
                    const emailCheck = await VendorValidator.email(req.body.email);
                    if(emailCheck !== true){
                        return res.json(emailCheck);
                    }
                    vendor.email = req.body.email;
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
                    const nameCheck = VendorValidator.name(req.body.name);
                    if(nameCheck !== true){
                        return res.json(nameCheck);
                    }
                    vendor.name = req.body.name;
                    vendor.url = Helper.createURL(req.body.name);
                }

                //Validate and update ownerName
                if(req.body.ownerName !== vendor.ownerName){
                    const ownerNameCheck = VendorValidator.ownerName(req.body.ownerName);
                    if(ownerNameCheck !== true){
                        return res.json(ownerNameCheck);
                    }
                    vendor.ownerName = req.body.ownerName;
                }

                //Validate and update description
                if(req.body.description !== vendor.description){
                    const descriptionCheck = VendorValidator.description(req.body.description);
                    if(descriptionCheck !== true){
                        return res.json(descriptionCheck);
                    }
                    vendor.description = req.body.description;
                }

                return vendor.save();
            })
            .then((vendor)=>{
                return res.json(vendor);
            })
            .catch((err)=>{
                return res.json("ERROR: Unable to update your data");
            });
    },

    logLeeIn: function(req, res){
        Vendor.findOne({email: "bobby@mail.com"})
            .then((vendor)=>{
                req.session.user = vendor._id;
                return res.json("OK");
            })
            .catch((err)=>{});
    }
}