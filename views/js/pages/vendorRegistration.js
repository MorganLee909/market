let vendorRegistrationPage = {
    display: function( Vendor ){
        console.log(state.vendorRegistrationPage.isPopulated);
        if( state.vendorRegistrationPage.isPopulated === false ){

            let form = document.getElementById('vendorRegForm');
            form.onsubmit = () => {this.submitForm( Vendor )};

            state.vendorRegistrationPage.isPopulated = true;
        }
    },

    submitForm: function( Vendor ) {
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
                    throw response;
                } 

                let newVendor = new Vendor(
                    response._id, 
                    response.name, 
                    response.email, 
                    "", 
                    response.items
                );
                
                state.vendor = newVendor;
                controller.openPage('vendorInfoPage');
            })
            .catch((err)=>{
                console.log(err);
            });

    }
}

module.exports = vendorRegistrationPage;

