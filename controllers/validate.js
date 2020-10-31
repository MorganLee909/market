module.exports = {
    /*
    Validates the data for a newly registered vendor
    vendor = {
        name: name of the business,
        email: email of the business,
        password: password for the vendor,
        confirmPassword: confirmation of password,
    }
    return: String if failure, true if passes
    */
    newVendor: function(vendor){
        if(!this.isSanitary([vendor.name, vendor.email])){
            return "Data contains illegal characters [\\,<,>,$,(,),{,}]";
        }

        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(vendor.email)){
            return "Invalid email address";
        }

        if(vendor.password !== vendor.confirmPassword){
            return "Your passwords do not match";
        }

        if(vendor.password.length < 10){
            return "Password must contain at least 10 characters";
        }

        return true;
    },

    /*
    Checks if any illegal characters are used in strings
    strings = [String]
    */
    isSanitary: function(strings){
        let disallowed = ["\\", "<", ">", "$", "{", "}", "(", ")"];

        for(let i = 0; i < strings.length; i++){
            for(let j = 0; j < disallowed.length; j++){
                if(strings[i].includes(disallowed[j])){
                    return false;
                }
            }
        }

        return true;
    }
}