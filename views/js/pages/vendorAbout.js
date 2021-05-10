let vendorAboutPage = {
    display: function( vendor ){

        //go to landing
        document.getElementById( 'vendorAboutToLanding' ).onclick = () => {
            controller.openPage( 'landingPage' );
        };

        //login
        document.getElementById("vendorAboutToLogin").onclick = () => {
            controller.openPage("loginPage");
        };

        //footer
        let footer = document.getElementById("vendorAboutFooter");

        //Back to search results
        document.getElementById("vendorAboutToAllvendors").onclick = () => {
            controller.openPage("searchResultsPage", state.searchRes);
        };

        let logOut = document.getElementById("vendorAboutLogOut");
        let logIn = document.getElementById("vendorAboutToLogin");
        let signUp = document.getElementById("searchResFooter");
        
        if(state.vendor === null){
            logIn.style.display = "flex";
            logOut.style.display = "none";
            signUp.style.display = "flex";
            footer.style.display = "flex";
        }else{
            logIn.style.display = "none";
            logOut.style.display = "flex";
            signUp.style.display = "none";
            footer.style.display = "none";
        }
      
        this.displayVendorInfo(vendor);
        this.displayItems(vendor);
    },
    
    displayItems: function(vendor){
        let goods = document.getElementById( "vendorAboutGoods" );

        while( goods.children.length > 0){
            goods.removeChild(goods.firstChild);
        }

        for( let i = 0; i < vendor.items.length; i++ ){
            let item = document.createElement( 'vendor-item' );
            item.setAttribute( "itemid", vendor.items[i].id );
            item.setAttribute( 'product', vendor.items[i].name );
            item.setAttribute( 'amount', vendor.items[i].quantity );
            item.setAttribute( "unit", vendor.items[i].unit );
            item.setAttribute( "price", vendor.items[i].price );
            goods.appendChild(item);
        }
        
    },

    displayVendorInfo: function(vendor){        
        document.getElementById("bioAboutTitle").innerText = vendor.name;
        document.getElementById("bioAboutEmail").innerText = vendor.email;
        document.getElementById("bioAboutOwnerName").innerText = vendor.ownerName;

        //Check if vendor has product
        if(vendor.items.length === 0){
            document.getElementById("vendorNoProduct").style.display = "flex";
            document.getElementById("vendorAboutForm").style.display = "none";
        }else{
            document.getElementById("vendorNoProduct").style.display = "none";
            document.getElementById("vendorAboutForm").style.display = "block";
        };
        
        //Descriptioin
        let descriptionVendor = document.getElementById("bioAboutDescription");
        descriptionVendor.innerText = vendor.description;

        //Address
        let addressField = document.getElementById("bioAboutAddress");
        addressField.innerText = vendor.address;

        //Phone
        let phoneField = document.getElementById("bioAboutPhone");
        phoneField.innerText = vendor.phone;
    },

}

module.exports = vendorAboutPage;