let searchResultsPage = {
    
    display: function( vendors ){

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

        //login
        document.getElementById("searchResToLoginBtn").onclick = () => {
            controller.openPage("loginPage");
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
            item.vendor = vendors[i];
            item.setAttribute('vendor', vendors[i].name);
            item.setAttribute('address', vendors[i].address);
            container.appendChild(item);
        }

    }
}

module.exports = searchResultsPage;