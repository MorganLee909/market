const validation = require("./validation.js");

const mongoose = require("mongoose");

//All market data is public
const MarketSchema = new mongoose.Schema({
    //PUBLIC: name of the market
    name: {
        type: String,
        required: [true, "MARKET NAME IS REQUIRED"],
        minlength: [3, "MARKET NAME MUST CONTAIN AT LEAST 3 CHARACTERS"],
        validate: {
            validator: validation.isSanitary,
            message: "MARKET NAME CONTAINS ILLEGAL CHARACTERS"
        }
    },

    //PUBLIC: reference to the owner (Vendor) of the market
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: [true, "MARKET MUST HAVE AN OWNER"]
    },

    //PUBLIC: list of all vendors that are a part of the market
    //NOTE: See Vendor Schema for public/private on each individual Vendor
    vendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: false
    }],

    //PUBLIC: url for visiting the market
    url: String,

    //PUBLIC: address of market broken down into seperate components
    address: {
        streetNumber: String,
        road: String,
        city: String,
        county: String,
        state: String,
        country: String,
        zipCode: String,
        full: String
    },

    //PUBLIC: coordinates of the market
    location: {
        type: {type: "String"},
        coordinates: [],
        required: false
    },
    
    //PUBLIC: description of the market
    description: {
        type: String,
        required: false,
        minlength: [10, "MARKET DESCRIPTION MUST CONTAIN AT LEAST 10 CHARACTERS"],
        validate: {
            validator: validation.isSanitary,
            message: "MARKET DESCRIPTION CONTAINS ILLEGAL CHARACTERS"
        }
    },

    //PUBLIC: list of dates/times that the market will meet
    meetings: [Date]
});

MarketSchema.index({location: "2dsphere"});

module.exports = mongoose.model("Market", MarketSchema);