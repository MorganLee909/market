let landingPage = {
    display: function(){

        document.getElementById('openVendorRegistration').addEventListener(
            'click', 
            () => {controller.openPage( 'vendorRegistrationPage' )}
        );

    }    
}

module.exports = landingPage;


