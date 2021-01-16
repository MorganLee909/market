let vendorRegistrationPage = {
    display: function(){
        if( state.vendorRegistrationPage.isPopulated === false ){
            let button = document.getElementById('openLandingPage');
            button.onclick = () => {controller.openPage('landingPage')};

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
                console.log(response);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
}

module.exports = vendorRegistrationPage;