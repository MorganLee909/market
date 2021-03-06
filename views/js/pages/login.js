const Vendor = require('../models/Vendor.js');

let loginPage ={
    display: function () {

        document.getElementById('loginToLanding').addEventListener(
            'click',
            () => {controller.openPage( 'landingPage' )}
        );

        document.getElementById('loginToVendorRegistration').addEventListener(
            'click',
            () => {controller.openPage( 'vendorRegistrationPage' )}
        );

        if( state.loginPage.isPopulated === false ){
            let form = document.getElementById('vendorLoginForm');
            form.onsubmit = () => {this.submit()};
        }
    },

    submit: function () {
        event.preventDefault();

        let data = {
            email: document.getElementById('vendorLoginEmail').value,
            password: document.getElementById('vendorLoginPassword').value
        }

        fetch( '/vendors/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((response) => {

                if( typeof(response) === 'string'){
                    controller.createToaster( response, 'error' );
                } else{
                    state.vendor = new Vendor(
                        response._id,
                        response.name,
                        response.email,
                        response.description,
                        response.items,
                        response.ownerName,
                        response.address,
                        response.telephone
                    );
                    
                    controller.openPage('vendorInfoPage');
                }
            })
            .catch((err) => {
                controller.createToaster( 'Something went wrong. Refresh the page.', 'error' );
            });
    }
}

module.exports = loginPage;