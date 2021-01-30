let loginPage ={
    display: function (Vendor) {
        if( state.loginPage.isPopulated === false ){

            let form = document.getElementById('vendorLoginForm');
            form.onsubmit = () => {this.submit(Vendor)};

            state.loginPage.isPopulated = true;
        }
   
    },

    submit: function (Vendor) {
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