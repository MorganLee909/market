let landingPage = {
    display: function(){
        document.getElementById('openUserRegistration').addEventListener(
            'click', 
            () => {controller.openPage( 'userRegistrationPage')}
        );

        document.getElementById('openVendorRegistration').addEventListener(
            'click', 
            () => {controller.openPage( 'vendorRegistrationPage')}
        );
    }    
}

module.exports = landingPage;

