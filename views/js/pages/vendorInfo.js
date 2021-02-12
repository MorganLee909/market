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
                                throw response;
                            } else {
                                state.vendor = null;
                                controller.openPage("landingPage");
                            }
                        
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            );    
            
            let goods = document.getElementById("goods");

            for( let i = 0; i < state.vendor.items.length; i++ ){
                let item = document.createElement('vendor-item');
                goods.appendChild(item);
            }

            state.vendorInfoPage.isPopulated = true;
        }
    }    
}

module.exports = vendorInfoPage;