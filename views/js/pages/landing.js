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
                if(typeof(response) === "string"){
                    controller.createToaster(response, "error");
                }else{
                    controller.openPage("searchResultsPage", response);
                }
            })
            .catch((err) => {
                controller.createToaster('Something went wrong, please refresh the page.', 'error');
            });

    }
}

module.exports = landingPage;