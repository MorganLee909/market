let vendorInfoPage = {
    display: function( vendor ){
        
        document.getElementById( 'vendorInfoToLanding' ).onclick = () => {
            controller.openPage( 'landingPage' );
        };

        //Edit VendorBio
        document.getElementById( "vendorBioBtn" ).onclick = () => {
            controller.openModal( 'vendorBioEditModal' );
        };

        let btn = document.getElementById( 'addNewProduct' ).onclick = () => {
            this.addNewProduct();
        };
        
        //Add first product
        document.getElementById("addFirstProduct").onclick = () => {
            this.addFirstProduct();
        };
      
        if(state.vendor.items.length === 0){
            document.getElementById("vendorNoProduct").style.display = "flex";
        }else{
            document.getElementById("vendorForm").style.display = "block";
        };
        
        if(vendor.id === state.vendor.id){
            this.displayVendorInfoLoggedIn();
        }else{
            this.displayVendorInfo();
        }
        
        this.displayItems();
    },
    
    displayItems: function(){
        let goods = document.getElementById( "goods" );

        while( goods.children.length > 0){
            goods.removeChild(goods.firstChild);
        }

        for( let i = 0; i < state.vendor.items.length; i++ ){
            let item = document.createElement( 'vendor-item' );
            item.setAttribute( "itemid", state.vendor.items[i].id );
            item.setAttribute( 'product', state.vendor.items[i].name );
            item.setAttribute( 'amount', state.vendor.items[i].quantity );
            item.setAttribute( "unit", state.vendor.items[i].unit );
            item.setAttribute( "price", state.vendor.items[i].price );
            goods.appendChild(item);
        }
    },

    displayVendorInfo: function(){
        
    },

    displayVendorInfoLoggedIn: function(){

        document.getElementById("bioTitle").innerText = state.vendor.name;
        document.getElementById("bioEmail").innerText = state.vendor.email;
        
        //Descriptioin
        let descriptionVendor = document.getElementById("bioDescription");
        if(state.vendor.description === ''){
            descriptionVendor.innerText = '+ Add Description';
            descriptionVendor.classList.add("links"); 
            descriptionVendor.onclick = () => {controller.openModal("vendorBioEditModal")};
        }else{
            descriptionVendor.innerText = state.vendor.description;
            descriptionVendor.onclick = undefined;
            descriptionVendor.classList.remove("links"); 
        }

        //Owner
        let owner = document.getElementById("bioOwnerName");
        if(state.vendor.ownerName === undefined){
            owner.innerText = '+ Add';
            owner.classList.add("links");
            owner.onclick = () => { controller.openModal("vendorBioEditModal")};
        }else{
            owner.innerText = state.vendor.ownerName;
            owner.onclick = undefined;
            owner.classList.remove("links");
        }
        
        //Address
        let addressField = document.getElementById("bioAddress");
        if(state.vendor.address === undefined){
            addressField.innerText = '+ Add';
            addressField.classList.add("links");
            addressField.onclick = () => { controller.openModal("vendorBioEditModal")};
        }else{
            addressField.innerText = state.vendor.address.full;
            addressField.onclick = undefined;
            addressField.classList.remove("links");
        }
    },

    addNewProduct: function(){
        let newItem = document.createElement( "vendor-item" );
        let goods = document.getElementById( "goods" );
        newItem.setAttribute( "isnew", "true" );
        goods.insertBefore( newItem, goods.firstChild );
    },

    addFirstProduct: function(){
        document.getElementById("vendorNoProduct").style.display = "none";
        document.getElementById("vendorForm").style.display = "block";

        document.getElementById("productTableTitle").innerText = "Add Your First Product";
        document.getElementById("productTableSubtitle").innerText = "Type name, amount and price of your product";

        let newItem = document.createElement("vendor-item");
        let goods = document.getElementById("goods");
        newItem.setAttribute("isnew", "true");
        goods.insertBefore(newItem, goods.firstChild);
    }
}

module.exports = vendorInfoPage;