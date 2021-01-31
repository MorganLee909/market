let vendorInfoPage = {
    display: function(){
        document.getElementById('vendorInfoToLanding').addEventListener(
            'click', 
            () => {controller.openPage( 'landingPage')}
        );

        state.vendorInfoPage.isPopulated = true;
    }    
}

module.exports = vendorInfoPage;

