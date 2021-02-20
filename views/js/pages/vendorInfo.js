let vendorInfoPage = {
    display: function(){
        if(state.vendorInfoPage.isPopulated === false){
            document.getElementById( 'vendorInfoToLanding' ).addEventListener(
                'click', 
                () => {controller.openPage( 'landingPage' )}
            );

            document.getElementById( 'addNewProduct' ).addEventListener(
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
                                controller.createBanner( response, "error" );
                            } else {
                                state.vendor = null;
                                controller.openPage( "landingPage" );
                            }
                        
                        })
                        .catch((err) => {
                            controller.createBanner( "Something went wrong. Refresh the page.", "error" );
                        });
                }
            );    
            
            if(state.vendor.items.length === 0){
                document.getElementById("vendorNoProduct").style.display = "flex";
            }else{
                document.getElementById("vendorForm").style.display = "block";
            };

            let goods = document.getElementById( "goods" );

            for( let i = 0; i < state.vendor.items.length; i++ ){
                let item = document.createElement( 'vendor-item' );
                item.setAttribute( "_id", state.vendor.items[i].id );
                item.setAttribute( 'product', state.vendor.items[i].name );
                item.setAttribute( 'amount', state.vendor.items[i].quantity );
                item.setAttribute( "unit", state.vendor.items[i].unit );
                // item.setAttribute( "price", state.vendor.items[i].price );
                goods.appendChild(item);
            }

            state.vendorInfoPage.isPopulated = true;
        }
    }    
}

module.exports = vendorInfoPage;