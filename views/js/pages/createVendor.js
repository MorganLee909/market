let createVendorPage = {
    display: function(){
        document.getElementById('createVendorPage').style.display = 'flex';
        document.getElementById('openLanding').addEventListener( 'click', () => {controller.openPage( 'landingPage')});
    }
};

module.exports = createVendorPage;