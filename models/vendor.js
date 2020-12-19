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

    //PRIVATE: email address of the vendor
    email: {
        type: String,
        required: [true, "VENDOR EMAIL IS REQUIRED"],
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

    //PRIVATE: name of the person that owns the vendor account
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

    //PRIVATE: address of the vendor broken down into components
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

    //PRIVATE: coordinates of the vendor
    location: {
        type: {type: "String"},
        coordinates: [],
        required: false
    },

    //PUBLIC: items sold by the vendor
    items: [{
        //PUBLIC: the name of the item
        name: {
            type: String,
            required: [true, "ITEM NAME IS REQUIRED"],
            minlength: [3, "ITEM NAME MUST CONTAIN AT LEAST 3 CHARACTERS"],
            validate: {
                validator: validation.isSanitary,
                message: "ITEM NAME CONTAINS ILLEGAL CHARACTERS"
            }
        },

        //PUBLIC: quantity of the item available
        quantity: {
            type: String,
            required: [true, "ITEM QUANTITY IS REQUIRED"]
        },

        //PUBLIC: measurement unit of the item (lbs, each, g, etc.)
        unit: {
            type: String,
            required: [true, "UNIT OF MEASUREMENT FOR THE ITEM IS REQUIRED"],
            validate: {
                validator: validation.isSanitary,
                message: "UNIT CONTAINS ILLEGAL CHARACTERS"
            }
        }
    }]
});

VendorSchema.index({location: "2dsphere"});

module.exports = mongoose.model("Vendor", VendorSchema);