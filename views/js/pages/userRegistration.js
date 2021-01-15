let userRegistrationPage = {
    display: function(){
        if( state.userRegistrationPage.isPopulated === false ){

            console.log("user registration page load");

            let button = document.getElementById('openLandingPage');
            button.onclick = () => {controller.openPage('landingPage')};

            state.userRegistrationPage.isPopulated = true;
        }
    }
}

module.exports = userRegistrationPage;

