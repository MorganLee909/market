let vendorAboutPage = {
    display: function( vendor ){
        
        document.getElementById( 'vendorAboutToLanding' ).onclick = () => {
            controller.openPage( 'landingPage' );
        };

        document.getElementById("vendorAboutToLoginBtn").onclick = () => {
            controller.openPage("loginPage");
        };

         //Go to all vendors
         document.getElementById("vendorAboutToAllvendors").onclick = () => {
            controller.openPage("landingPage");
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
        }else{
            document.getElementById("vendorAboutForm").style.display = "block";
        };
        
        //Descriptioin
        let descriptionVendor = document.getElementById("bioAboutDescription");
        descriptionVendor.innerText = vendor.description;

        
        //Address
        let addressField = document.getElementById("bioAboutAddress");
        addressField.innerText = vendor.address;
    },

}

module.exports = vendorAboutPage;