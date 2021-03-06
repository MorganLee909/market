let vendorInfoPage = {
    display: function(){
        if(state.vendorInfoPage.isPopulated === false){
            document.getElementById( 'vendorInfoToLanding' ).addEventListener(
                'click', 
                () => {controller.openPage( 'landingPage' )}
            );

            //Edit VendorBio
            document.getElementById( "vendorBioBtn" ).onclick = () => {
                controller.openModal( 'vendorBioEditModal' );
            }

            let btn = document.getElementById( 'addNewProduct' ).addEventListener(
                'click',
                () => { 
                    let newItem = document.createElement( "vendor-item" );
                    let goods = document.getElementById( "goods" );
                    newItem.setAttribute( "isnew", "true" );
                    goods.insertBefore( newItem, goods.firstChild );
                }
            );

            //Add first product
            document.getElementById("addFirstProduct").addEventListener(
                "click",
                () => {
                    document.getElementById("vendorNoProduct").style.display = "none";
                    document.getElementById("vendorForm").style.display = "block";

                    document.getElementById("productTableTitle").innerText = "Add Your First Product";
                    document.getElementById("productTableSubtitle").innerText = "Type name, amount and price of your product";

                    let newItem =document.createElement("vendor-item");
                    let goods = document.getElementById("goods");
                    newItem.setAttribute("isnew", "true");
                    goods.insertBefore(newItem, goods.firstChild);
                }
            );

            document.getElementById( 'vendorInfoToSignOut' ).addEventListener(
                'click', 
                () => {
                    fetch('/logout')
                        .then( response => response.json() )
                        .then((response)=>{
                            if( typeof(response) === 'string' ){
                                controller.createToaster( response, "error" );
                            } else {
                                state.vendor = null;
                                controller.openPage( "landingPage" );
                            }
                        
                        })
                        .catch((err) => {
                            controller.createToaster( "Something went wrong. Refresh the page.", "error" );
                        });
                }
            ); 
                        
            if(state.vendor.items.length === 0){
                document.getElementById("vendorNoProduct").style.display = "flex";
            }else{
                document.getElementById("vendorForm").style.display = "block";
            };

            this.displayItems();

            state.vendorInfoPage.isPopulated = true;
        }
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
        console.log("vendorBio");
    }
}

module.exports = vendorInfoPage;