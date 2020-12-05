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

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "USER NAME IS REQUIRED"],
        minlength: [3, "USER NAME MUST CONTAIN AT LEAST 3 CHARACTERS"],
        validate: {
            validator: isSanitary,
            message: "USER NAME CONTAINS ILLEGAL CHARACTERS"
        }
    },
    email: {
        type: String,
        required: [true, "USER EMAIL IS REQUIRED"],
        validate: {
            validator: validEmail,
            message: "MUST ENTER A VALID EMAIL ADDRESS"
        }
    },
    password: {
        type: String,
        required: [true, "USER PASSWORD IS REQUIRED"]
    }
});

module.exports = mongoose.model("User", UserSchema);