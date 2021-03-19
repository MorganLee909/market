let searchResultsPage = {
    display: function( vendors ){

        document.getElementById("searchResultsToLanding").onclick = () => { 
            controller.openPage("landingPage");
        }

        let editLocationToLanding = document.getElementById("editLocationToLanding");
        editLocationToLanding.onclick = () => { 
            vendors = '';
            console.log(vendors);
            controller.openPage("landingPage");
        }

        let container = document.getElementById("listOfVendors");
        
        for( let i = 0; i < vendors.length; i++ ){
            
            let item = document.createElement("search-item");
            item.setAttribute('vendor', vendors[i].name);
            
            container.appendChild(item);
        }

        let vendorLocationTitle = document.getElementById("vendorLocationTitle");
        vendorLocationTitle.innerText = state.vendor.address.city;

    }
}

module.exports = searchResultsPage;