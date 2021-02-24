const Vendor = require('../models/Vendor.js');

let vendorRegistrationPage = {
    display: function(){

        document.getElementById('vendorRegistrationToLanding').addEventListener(
            'click',
            () => {controller.openPage( 'landingPage' )}
        );

        document.getElementById('VendorRegistrationToLogin').addEventListener(
            'click',
            () => {controller.openPage( 'loginPage' )}
        );

        if( state.vendorRegistrationPage.isPopulated === false ){

            let form = document.getElementById('vendorRegForm');
            form.onsubmit = () => {this.submitForm()};

            state.vendorRegistrationPage.isPopulated = true;
        }
    },

    submitForm: function() {
        event.preventDefault();

        let data = {
            name: "ivan",
            email: document.getElementById('vendorRegEmail').value,
            password: document.getElementById('vendorRegPassword').value,
            confirmPassword: document.getElementById('vendorRegConfPassword').value,
        }

        let fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        }

        fetch( '/vendors', fetchOptions)
            .then(response => response.json())
            .then((response)=>{
                if( typeof(response) === "string" ) {
                    controller.createToaster(response, "error");
                } else{
                    let newVendor = new Vendor(
                        response._id, 
                        response.name, 
                        response.email, 
                        "", 
                        response.items
                    );

                    state.vendor = newVendor;
                    controller.openPage('vendorInfoPage');
                }
            })
            .catch((err)=>{
                controller.createToaster("Something went wrong. Refresh the page.", "error");

            });
    }
}

module.exports = vendorRegistrationPage;