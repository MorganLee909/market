const validation = require("./validation.js");

const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "FEEDBACK MUST HAVE A DATE/TIME"]
    },
    title: {
        type: String,
        required: [true, "FEEDBACK MUST HAVE A TITLE"],
        validate: {
            validator: validation.isSanitary,
            message: "TITLE CONTAINS ILLEGAL CHARACTERS"
        }
    },
    content: {
        type: String,
        required: [true, "MUST PROVIDE FEEDBACK"],
        minlength: 25,
        validate: {
            validator: validation.isSanitary,
            message: "MESSAGE CONTAINS ILLEGAL CHARACTERS"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: false
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);