let searchResultsPage = {
    display: function( vendors ){

        document.getElementById("searchResultsToLanding").onclick = () => { 
            controller.openPage("landingPage");
        }

        let editLocationToLanding = document.getElementById("editLocationToLanding");
        editLocationToLanding.onclick = () => { 
            controller.openPage("landingPage");
        }

        let container = document.getElementById("listOfVendors");
        
        while(container.children.length > 0 ){
            container.removeChild(container.firstChild);
        }

        for( let i = 0; i < vendors.length; i++ ){
            
            let item = document.createElement("search-item");
            item.setAttribute('vendor', vendors[i].name);
            item.vendor = vendors[i];
            container.appendChild(item);
        }

    }
}

module.exports = searchResultsPage;