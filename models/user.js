const validation = require("./validation.js");

const mongoose = require("mongoose");

//All user data is private
const UserSchema = new mongoose.Schema({
    //PRIVATE: name of the user
    name: {
        type: String,
        required: [true, "USER NAME IS REQUIRED"],
        minlength: [3, "USER NAME MUST CONTAIN AT LEAST 3 CHARACTERS"],
        validate: {
            validator: validation.isSanitary,
            message: "USER NAME CONTAINS ILLEGAL CHARACTERS"
        }
    },

    //PRIVATE: email address of the user
    email: {
        type: String,
        required: [true, "USER EMAIL IS REQUIRED"],
        validate: {
            validator: validation.validEmail,
            message: "MUST ENTER A VALID EMAIL ADDRESS"
        }
    },

    //BACKEND: hashed password for authentication
    password: {
        type: String,
        required: [true, "USER PASSWORD IS REQUIRED"]
    }
});

module.exports = mongoose.model("User", UserSchema);