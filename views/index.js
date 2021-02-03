const vendorInfoPage = require("./js/pages/vendorInfo.js");
const landingPage = require("./js/pages/landing.js");
const vendorRegistrationPage = require("./js/pages/vendorRegistration.js");
const loginPage = require('./js/pages/login.js');

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

            case 'vendorRegistrationPage':
                vendorRegistrationPage.display();
                break; 
            
            case 'loginPage':
                loginPage.display();
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

    vendorRegistrationPage: {
        isPopulated: false
    },

    loginPage: {
        isPopulated: false
    }
}

landingPage.display();