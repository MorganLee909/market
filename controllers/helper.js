const Vendor = require("../models/vendor.js");

module.exports = {
    createURL: function(name){
        let url = name.replace(/\W/g, "").toLowerCase();

        const regex = new RegExp("^" + url);

        return Vendor.aggregate([
            {$match: {url: {$regex: regex}}},
            {$project: {
                _id: 0,
                url: 1
            }}
        ])
            .then((vendors)=>{
                if(vendors.length === 0){
                    return url;
                }else{
                    count = 0;

                    let max = 0;
                    for(let i = 0; i < vendors.length; i++){
                        const num = parseInt(vendors[i].url.replace(url, ""));

                        if(num > max){
                            max = num;
                        }
                    }

                    url += (max + 1).toString();
                    return url;
                }
            }).catch((err)=>{});
    }
}