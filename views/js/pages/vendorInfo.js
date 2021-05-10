let vendorInfoPage = {
    display: function(){
        //Go to landing
        document.getElementById( 'vendorInfoToLanding' ).onclick = () => {
            controller.openPage( 'landingPage' );
        };

        //Back to landing or search results
        if(state.searchRes !== null){
            document.getElementById("vendorInfoToAllvendors").onclick = () => {
                controller.openPage("searchResultsPage", state.searchRes);
            };
        }else{
            document.getElementById("vendorInfoToAllvendors").onclick = () => {
                controller.openPage( "landingPage" );
            }
        };
       
        //Edit VendorBio
        document.getElementById( "vendorBioBtn" ).onclick = () => {
            controller.openModal( 'vendorBioEditModal' );
        };
        
        //Add first product
        document.getElementById("addFirstProduct").onclick = () => {
            this.addFirstProduct();
        };
        
        //Add new product
        document.getElementById( 'addNewProduct' ).onclick = () => {
            this.addNewProduct();
        };

        this.displayVendorInfo();
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
            item.setAttribute("samevendor", "true");
            goods.appendChild(item);
        }
    },

    displayVendorInfo: function(){
        document.getElementById("bioTitle").innerText = state.vendor.name;
        document.getElementById("bioEmail").innerText = state.vendor.email;

        //Check if vendor has product   
        if(state.vendor.items.length === 0){
            document.getElementById("vendorNoProduct").style.display = "flex";
            document.getElementById("vendorForm").style.display = "none"
        }else{
            document.getElementById("vendorNoProduct").style.display = "none";
            document.getElementById("vendorForm").style.display = "block";
        };
        
        //Description
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
        if(state.vendor.ownerName === ""){
            owner.innerText = '+ Add Owner Name';
            owner.classList.add("links");
            owner.onclick = () => { controller.openModal("vendorBioEditModal")};
        }else{
            owner.innerText = state.vendor.ownerName;
            owner.onclick = undefined;
            owner.classList.remove("links");
        }
        
        //Address
        let addressField = document.getElementById("bioAddress");

        if(state.vendor.address === ""){
            addressField.innerText = '+ Add Address';
            addressField.classList.add("links");
            addressField.onclick = () => { controller.openModal("vendorBioEditModal")};
        }else{
            addressField.innerText = state.vendor.address.full;
            addressField.onclick = undefined;
            addressField.classList.remove("links");
        }

        //Phone
        let phoneField = document.getElementById("bioPhone");
        if(state.vendor.phone === ""){
            phoneField.innerText = '+ Add Phone';
            phoneField.classList.add("links");
            phoneField.onclick = () => { controller.openModal("vendorBioEditModal")};
        }else{
            phoneField.innerText = state.vendor.phone;
            phoneField.onclick = undefined;
            phoneField.classList.remove("links");
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

        document.getElementById("productTableTitle").innerText = "Your Goods";
        document.getElementById("productTableSubtitle").innerText = "Type name, amount and price of your product";

        let newItem = document.createElement("vendor-item");
        let goods = document.getElementById("goods");
        newItem.setAttribute("isnew", "true");
        goods.insertBefore(newItem, goods.firstChild);
    }
}

module.exports = vendorInfoPage;