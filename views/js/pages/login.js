const Vendor = require('../models/Vendor.js');

let loginPage ={
    display: function () {
        if( state.loginPage.isPopulated === false ){

            let form = document.getElementById('vendorLoginForm');
            form.onsubmit = () => {this.submit()};

            state.loginPage.isPopulated = true;
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
                state.vendor = new Vendor(
                    response._id,
                    response.name,
                    response.email,
                    response.description,
                    response.items
                );

                controller.openPage('vendorInfoPage');
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = loginPage;