const validation = require("./validation.js");

const mongoose = require("mongoose");

const MarketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "MARKET NAME IS REQUIRED"],
        minlength: [3, "MARKET NAME MUST CONTAIN AT LEAST 3 CHARACTERS"],
        validate: {
            validator: validation.isSanitary,
            message: "MARKET NAME CONTAINS ILLEGAL CHARACTERS"
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: [true, "MARKET MUST HAVE AN OWNER"]
    },
    vendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: false
    }],
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
    location: {
        type: {type: "String"},
        coordinates: [],
        required: false
    },
    description: {
        type: String,
        required: false,
        minlength: [10, "MARKET DESCRIPTION MUST CONTAIN AT LEAST 10 CHARACTERS"],
        validate: {
            validator: validation.isSanitary,
            message: "MARKET DESCRIPTION CONTAINS ILLEGAL CHARACTERS"
        }
    }
});

MarketSchema.index({location: "2dsphere"});

module.exports = mongoose.model("Market", MarketSchema);