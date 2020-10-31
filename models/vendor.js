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
    ownerName: String,
    address: String,
    geoLocation: "Point",
    url: String,
    description: String,
    status: [String],
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

module.exports = mongoose.model("Vendor", VendorSchema);