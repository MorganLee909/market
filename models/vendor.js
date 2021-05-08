const ItemSchema = require("./item.js").ItemSchema;

const validation = require("./validation.js");

const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    //PUBLIC: the name of the vendor (not the owner)
    name: {
        type: String,
        required: [true, "VENDOR NAME IS REQUIRED"],
        minlength: [3, "VENDOR NAME MUST CONTAIN AT LEAST 3 CHARACTERS"],
        validate: {
            validator: validation.isSanitary,
            message: "VENDOR NAME CONTAINS ILLEGAL CHARACTERS"
        }
    },

    //PUBLIC: email address of the vendor
    email: {
        type: String,
        required: [true, "VENDOR EMAIL IS REQUIRED"],
        index: true,
        validate: {
            validator: validation.validEmail,
            message: "MUST ENTER A VALID EMAIL ADDRESS"
        }
    },

    //BACKEND: hashed password of the user
    password: {
        type: String,
        required: [true, "VENDOR PASSWORD IS REQUIRED"]
    },

    //PUBLIC: string used in url to find a vendor
    url: String,

    //PUBLIC: name of the person that owns the vendor account
    ownerName: {
        type: String,
        required: false,
        minlength: [2, "OWNER NAME MUST CONTAIN AT LEAST 2 CHARACTERS"],
        validate: {
            validator: validation.isSanitary,
            message: "OWNER NAME CONTAINS ILLEGAL CHARACTERS"
        }
    },

    //PUBLIC: description of the vendor
    description: {
        type: String,
        required: false,
        validate: {
            validator: validation.isSanitary,
            message: "VENDOR DESCRIPTION CONTAINS ILLEGAL CHARACTERS"
        }
    },

    //BACKEND: list of strings to identify different statuses of the account
    //NOTE: an empty string means status is good
    status: [String],

    //PRIVATE: address of the vendor broken down into components (city is public)
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

    //PUBLIC: phone number of the vendor
    telephone: {
        type: String,
        required: false,
        minlength: 7
    },

    //PRIVATE: coordinates of the vendor
    location: {
        type: {type: String},
        coordinates: [],
        required: false
    },

    //PUBLIC: items sold by the vendor
    items: [ItemSchema],

    //PRIVATE: Used for backend checking whether the vendor is logged in
    session: {
        sessionId: {
            type: String,
            index: true
        },
        expiration: Date
    }
});

VendorSchema.index({location: "2dsphere"});

module.exports = mongoose.model("Vendor", VendorSchema);