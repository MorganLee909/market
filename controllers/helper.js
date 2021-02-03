const Vendor = require("../models/vendor.js");
const Market = require("../models/market.js");

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
    },


    createMarketURL: function(name){
        let url = name.replace(/\W/g, "").toLowerCase();

        const regex = new RegExp("^" + url);

        return Market.aggregate([
            {$match: {url: {$regex: regex}}},
            {$project: {
                _id: 0,
                url: 1
            }}
        ])
            .then((markets)=>{
                if(markets.length === 0){
                    return url;
                }else{
                    count = 0;

                    let max = 0;
                    for(let i = 0; i < markets.length; i++){
                        const num = parseInt(markets[i].url.replace(url, ""));

                        if(num > max){
                            max = num;
                        }
                    }

                    url += (max + 1).toString();
                    return url;
                }
            }).catch((err)=>{});
    },

    generateId: function(length){
        let result = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let i = 0; i < length; i++){
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        return result;
    }
}