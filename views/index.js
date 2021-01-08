const Market = require("./js/models/Market.js");
const Vendor = require("./js/models/Vendor.js");
const Item = require("./js/models/Item.js");
const User = require("./js/models/User.js");

const landingPage = require("./js/pages/landing.js");
const createVendorPage = require("./js/pages/createVendor.js"); 

controller = {
    openPage: function( page ){
        console.log( page );
        
        let pages = document.querySelectorAll('.page');

        for( let i=0; i < pages.length; i++){
            pages[i].style.display = 'none';
        }

        document.getElementById(page).style.display = 'flex';
    }
};

landingPage.display();