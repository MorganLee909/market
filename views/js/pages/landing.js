let landingPage = {
    display: function(){
        document.getElementById('openUserRegistration').addEventListener(
            'click', 
            () => {controller.openPage( 'userRegistrationPage')}
        );
    }    
}

module.exports = landingPage;

