let landingPage = {
    display: function(){
        document.getElementById('landingPage').style.display = 'flex';
        document.getElementById('openCreateVendor').addEventListener( 'click', () => {controller.openPage( 'createVendorPage')});
    }
};

module.exports = landingPage;