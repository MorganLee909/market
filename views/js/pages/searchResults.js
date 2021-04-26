let searchResultsPage = {
    vendors: null,
    
    display: function( vendors ){
        
        this.vendors = vendors;

        let logOut = document.getElementById("searchResLogOut");
        let logIn = document.getElementById("searchResToLoginBtn");
        let signUp = document.getElementById("searchResFooter");
        
        if(state.vendor === null){
            logIn.style.display = "flex";
            logOut.style.display = "none";
            signUp.style.display = "flex"
        }else{
            logIn.style.display = "none";
            logOut.style.display = "flex";
            signUp.style.display = "none"
        }
        
        //go to landing
        document.getElementById("searchResToLanding").onclick = () => { 
            controller.openPage("landingPage");
        }

        //go to My Profile
        document.getElementById("searchResToProfile").onclick = () => {
            controller.openPage("vendorInfoPage");
        }

        //show btn My Profile
        if( state.vendor !== null ){
            document.getElementById("searchResToProfile").style.display = "flex"; 
        }else{
            document.getElementById("searchResToProfile").style.display = "none";
        };
        
        //login
        document.getElementById("searchResToLoginBtn").onclick = () => {
            controller.openPage("loginPage");
        }

        //resultsToRegistration
        document.getElementById("resultsToRegistration").onclick = () => {
            controller.openPage("vendorRegistrationPage");
        }

        //searchbox
        let searchbox = document.getElementById("search-results-input");
        searchbox.onchange = () => {
            this.search( searchbox.value );
        }

        let editLocationToLanding = document.getElementById("editLocationToLanding");
        editLocationToLanding.onclick = () => { 
            controller.openPage("landingPage");
        }

        this.populateSearchItems( vendors );

    },

    populateSearchItems: function( vendors ){
        let container = document.getElementById("listOfVendors");
        
        while(container.children.length > 0 ){
            container.removeChild(container.firstChild);
        }

        for( let i = 0; i < vendors.length; i++ ){
            let item = document.createElement("search-item");
            item.vendor = vendors[i];
            item.setAttribute('vendor', vendors[i].name);
            item.setAttribute('address', vendors[i].address);
            item.setAttribute('distance', vendors[i].distance);
            container.appendChild(item);
        }
    },

    search: function( searchvalue ){
        let result = [];

        for( let i = 0; i < this.vendors.length; i++ ){

            if(this.vendors[i].name.toLowerCase().includes(searchvalue.toLowerCase())){
                result.push(this.vendors[i]);
                continue;
            }
            
            for( let x = 0; x < this.vendors[i].items.length; x++ ){                
                if(this.vendors[i].items[x].name.toLowerCase().includes(searchvalue.toLowerCase())){
                    result.push(this.vendors[i]);
                    break;
                }
            }
        }
        this.populateSearchItems( result );
    }

}

module.exports = searchResultsPage;