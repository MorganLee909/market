let vendorInfoPage = {
    display: function(){
        if(state.vendorInfoPage.isPopulated === false){
            document.getElementById('vendorInfoToLanding').addEventListener(
                'click', 
                () => {controller.openPage( 'landingPage' )}
            );

            document.getElementById('vendorInfoToSignOut').addEventListener(
                'click', 
                () => {
                    fetch('/logout')
                        .then( response => response.json() )
                        .then((response)=>{
                            if(typeof(response) === 'string'){
                                controller.createBanner(response, "error");
                            } else {
                                state.vendor = null;
                                controller.openPage("landingPage");
                            }
                        
                        })
                        .catch((err) => {
                            controller.createBanner("Something went wrong. Refresh the page.", "error");
                        });
                }
            );    
            
            let goods = document.getElementById("goods");

            for( let i = 0; i < state.vendor.items.length; i++ ){
                let item = document.createElement('vendor-item');
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