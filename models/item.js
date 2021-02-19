const validation = require("./validation.js");

const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
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
        type: Number,
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
    },

    //PUBLIC: price of the item (per unit, cents)
    price: {
        type: Number,
        required: [true, "ITEM MUST HAVE A PRICE"],
        min: 0
    }
});

module.exports = {
    ItemSchema: ItemSchema,
    Item: mongoose.model("item", ItemSchema)
};