const Vendor = require("../models/vendor.js");

module.exports = {
    /*
    Validate vendor's name
    Parameters:
        name: String
    return: String if invalid, true if valid
    */
    name: function(name){
        const sanitary = this.isSanitary(name);
        if(sanitary !== true){
            return sanitary;
        }

        return true;
    },

    /*
    Validate vendor's email
    Parameters:
        email: String
    return: String if invalid, true if valid
    */
    email: function(email){
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return "Invalid email address";
        }

        return Vendor.findOne({email: email})
            .then((vendor)=>{
                if(vendor){
                    return "An account with this email address already exists";
                }

                return true;
            })
            .catch((err)=>{
                return "ERROR: Unable to set email";
            });
    },

    /*
    Validate a new password for a vendor
    Parameters:
        password: String,
        confirmPassword: String
    return: String if invalid, true if valid
    */
    password: function(password, confirmPassword){
        if(password !== confirmPassword){
            return "Passwords do not match";
        }

        if(password.length < 10){
            return "Password must contain at least 10 characters";
        }

        return true;
    },

    /*
    Validate the owner name for a vendor
    Parameters:
        ownerName: String
    return: String if invalid, true if valid
    */
    ownerName: function(ownerName){
        const sanitary = this.isSanitary(ownerName);
        if(sanitary !== true){
            return sanitary;
        }

        return true;
    },

    /*
    Validate vendor's business description
    Parameters:
        description: String
    return: String if invalid, true if valid
    */
    description: function(description){
        const sanitary = this.isSanitary(description);
        if(sanitary !== true){
            return sanitary;
        }

        return true;
    },


    /*
    Automatically check data for creation of new vendors
    Parameters:
        name: String,
        email: String,
        password: String,
        confirmPassword: String
    */
    new: async function(name, email, password, confirmPassword){
        const nameCheck = this.name(name);
        if(nameCheck !== true){
            return nameCheck;
        }

        const passwordCheck = this.password(password, confirmPassword);
        if(passwordCheck !== true){
            return passwordCheck;
        }

        const emailCheck = await this.email(email);
        if(emailCheck !== true){
            return emailCheck;
        }

        return true;
    },

    /*
    Checks if any illegal characters are used in the string
    string: String
    */
    isSanitary: function(string){
        let disallowed = ["\\", "<", ">", "$", "{", "}", "(", ")"];

        for(let i = 0; i < disallowed.length; i++){
            if(string.includes(disallowed[i])){
                return "Data contains illegal characters [\\,<,>,$,(,),{,}]";
            }
        }

        return true;
    }
}