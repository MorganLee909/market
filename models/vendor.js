const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    ownerName: String,
    description: String,
    status: [String],
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
        coordinates: []
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        unit: {
            type: String,
            required: true
        }
    }]
});

VendorSchema.index({location: "2dsphere"});

module.exports = mongoose.model("Vendor", VendorSchema);