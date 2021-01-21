const Market = require("./js/models/Market.js");
const Vendor = require("./js/models/Vendor.js");
const Item = require("./js/models/Item.js");
const User = require("./js/models/User.js");

const vendorInfoPage = require("./js/pages/vendorInfo.js");
const landingPage = require("./js/pages/landing.js");
const userRegistrationPage = require("./js/pages/userRegistration.js");
const vendorRegistrationPage = require("./js/pages/vendorRegistration.js");
const somePage = require("./js/pages/somePage.js");

///Components Start///
require("./js/components.js");

controller = {
    openPage: function( page ) {
        let pages = document.querySelectorAll( '.page' );

        for( let i = 0; i < pages.length; i++){
            pages[i].style.display = 'none';
        }
        
        switch( page ) {

            case 'vendorInfoPage':
                vendorInfoPage.display();
                break;  

            case 'landingPage':
                landingPage.display();
                break;

            case 'userRegistrationPage':
                userRegistrationPage.display();
                break;     

            case 'vendorRegistrationPage':
                vendorRegistrationPage.display( Vendor );
                break;  

            case 'somePage':
                somePage.display();
                break;     
        }
        document.getElementById( page ).style.display = "flex";
    }
};

state = {
    vendor: null,

    vendorInfoPage: {
        isPopulated: false
    },

    landingPage: {
        isPopulated: false
    },

    userRegistrationPage: {
        isPopulated: false
    },

    vendorRegistrationPage: {
        isPopulated: false
    },

    createVendorPage: {
        isPopulated: false,
    },

    somePage: {
        isPopulated: false
    }

}

landingPage.display();

