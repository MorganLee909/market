let somePage = {
    display: function(){
        if( state.somePage.isPopulated === false ){

            let button = document.getElementById('openLandingPage');
            button.onclick = () => {controller.openPage('landingPage')};

            state.somePage.isPopulated = true;
        }
    }
}

module.exports = somePage;

