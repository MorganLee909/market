let userRegistrationPage = {
    display: function(){
        if( state.userRegistrationPage.isPopulated === false ){

            let button = document.getElementById('openLandingPage');
            button.onclick = () => {controller.openPage('landingPage')};

            state.userRegistrationPage.isPopulated = true;
        }
    }
}

module.exports = userRegistrationPage;

