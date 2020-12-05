const mongoose = require("mongoose");

const isSanitary = (str)=>{
    let disallowed = ["\\", "<", ">", "$", "{", "}", "(", ")"];

    for(let i = 0; i < str.length; i++){
        for(let j = 0; j < disallowed.length; j++){
            if(str[i] === disallowed[j]){
                return false;
            }
        }
    }

    return true;
}

const validEmail = (email)=>{
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "VENDOR NAME IS REQUIRED"],
        minlength: [3, "VENDOR NAME MUST CONTAIN AT LEAST 3 CHARACTERS"],
        validate: {
            validator: isSanitary,
            message: "VENDOR NAME CONTAINS ILLEGAL CHARACTERS"
        }
    },
    email: {
        type: String,
        required: [true, "VENDOR EMAIL IS REQUIRED"],
        validate: {
            validator: validEmail,
            message: "MUST ENTER A VALID EMAIL ADDRESS"
        }
    },
    password: {
        type: String,
        required: [true, "VENDOR PASSWORD IS REQUIRED"]
    },
    url: String,
    ownerName: {
        type: String,
        required: false,
        minlength: [2, "OWNER NAME MUST CONTAIN AT LEAST 2 CHARACTERS"],
        validate: {
            validator: isSanitary,
            message: "OWNER NAME CONTAINS ILLEGAL CHARACTERS"
        }
    },
    description: {
        type: String,
        required: false,
        validate: {
            validator: isSanitary,
            message: "VENDOR DESCRIPTION CONTAINS ILLEGAL CHARACTERS"
        }
    },
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
            required: [true, "ITEM NAME IS REQUIRED"],
            minlength: [3, "ITEM NAME MUST CONTAIN AT LEAST 3 CHARACTERS"],
            validate: {
                validator: isSanitary,
                message: "ITEM NAME CONTAINS ILLEGAL CHARACTERS"
            }
        },
        quantity: {
            type: String,
            required: [true, "ITEM QUANTITY IS REQUIRED"]
        },
        unit: {
            type: String,
            required: [true, "UNIT OF MEASUREMENT FOR THE ITEM IS REQUIRED"],
            validate: {
                validator: isSanitary,
                message: "UNIT CONTAINS ILLEGAL CHARACTERS"
            }
        }
    }]
});

VendorSchema.index({location: "2dsphere"});

module.exports = mongoose.model("Vendor", VendorSchema);