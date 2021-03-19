let landingPage = {

    display: function(){
        document.getElementById("openVendorRegistration").onclick = () => {
            controller.openPage("vendorRegistrationPage");
        }

        document.getElementById("landingToLoginBtn").onclick = () => {
            controller.openPage("loginPage");
        }       

        document.getElementById("searchVendorBtn").onclick = () => {
            this.searchVendors();
        }
        
    },

    searchVendors: function(){
        let url = '/vendors/search?';
        let address = document.getElementById("vendorLocation").value;
        address = address.replace(' ', '+');
        
        url = `${url}address=${address}&distance=20`;

        fetch( url )
            .then(response => response.json() )
            .then((response) => {
                controller.openPage("searchResultsPage", response);
            })
            .catch((err) => {
                console.log(err);
            });

    }
}

module.exports = landingPage;