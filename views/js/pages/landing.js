let landingPage = {
    display: function(){
        document.getElementById('openVendorRegistration').addEventListener(
            'click', 
            () => {controller.openPage( 'vendorRegistrationPage' )}
        );

        document.getElementById( 'landingToLoginBtn').addEventListener(
            'click',
            () => {controller.openPage( 'loginPage' )}
        );
    }
}

module.exports = landingPage;