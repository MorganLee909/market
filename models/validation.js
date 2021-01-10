module.exports = {
    isSanitary: function(str){
        let disallowed = ["\\", "<", ">", "$", "{", "}", "(", ")"];
    
        for(let i = 0; i < str.length; i++){
            for(let j = 0; j < disallowed.length; j++){
                if(str[i] === disallowed[j]){
                    return false;
                }
            }
        }
    
        return true;
    },

    validEmail: function(email){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
}