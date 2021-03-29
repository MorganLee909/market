const Vendor = require("../models/Vendor");

let landingPage = {

    display: function(){

        let logOut = document.getElementById("landingLogOut");
        let logIn = document.getElementById("landingToLoginBtn");
        let signUp = document.getElementById("landingFooter");

        if(state.vendor === null){
            logIn.style.display = "flex";
            logOut.style.display = "none";
            signUp.style.display = "flex"
        }else{
            logIn.style.display = "none";
            logOut.style.display = "flex";
            signUp.style.display = "none"
        }
        
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
                    let vendors = [];
                    for( let i = 0; i < response.length; i++){
        
                        let vendor = new Vendor(
                            response[i]._id,
                            response[i].name,
                            response[i].email,
                            response[i].description,
                            response[i].items,
                            response[i].ownerName,
                            response[i].address,
                            response[i].telephone
                        );
                        
                        vendors.push(vendor);
                    }

                    controller.openPage("searchResultsPage", vendors);
                }
            })
            .catch((err) => {
                controller.createToaster('Something went wrong, please refresh the page.', 'error');
            });

    }
}

module.exports = landingPage;