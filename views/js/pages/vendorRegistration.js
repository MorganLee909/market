let vendorRegistrationPage = {
    display: function(){
        if( state.vendorRegistrationPage.isPopulated === false ){
            console.log("vendor reg page load");
            let button = document.getElementById('openLandingPage');
            button.onclick = () => {controller.openPage('landingPage')};

            state.vendorRegistrationPage.isPopulated = true;
        }
    }
}

module.exports = vendorRegistrationPage;