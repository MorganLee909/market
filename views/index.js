const vendorInfoPage = require("./js/pages/vendorInfo.js");
const landingPage = require("./js/pages/landing.js");
const vendorRegistrationPage = require("./js/pages/vendorRegistration.js");
const loginPage = require('./js/pages/login.js');
const Vendor = require("./js/models/Vendor.js");

// Components //
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
    },

    createToaster: function ( mess, type ) {
        
        document.getElementById( "toasterText" ).innerText = mess;

        let toasterContainer = document.getElementById( "toasterContainer" );
        let toasterCanvas = document.getElementById( "toasterCanvas" );

        switch(type){
            
            case 'error':
                toasterCanvas.classList.add( 'toasterError' );
                toasterContainer.style.display = "flex";
                
                break;

            case "success":
                toasterCanvas.classList.add( 'toasterSuccess' );
                toasterContainer.style.display = "flex";

                break;
        }

        setTimeout(function () {
            toasterContainer.style.display = "none";
            toasterCanvas.classList = '';
        }, 
        4000);
        
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

fetch( '/vendors/session' )
    .then( response => response.json() )
    .then( (response) => {
        if(typeof(response) === "string"){
            controller.createBanner(response, "error");
        }
        
        if( response === null ){ 
            controller.openPage( 'landingPage' );
        } else{ 
            state.vendor = new Vendor(
                response._id,
                response.name,
                response.email,
                response.description,
                response.items
            );
            
            controller.openPage( 'vendorInfoPage' ); 
        }
    })
    .catch((err) => {
        controller.createBanner("Something went wrong. Refresh the page.", "error");
    });