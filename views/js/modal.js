let modal = {
    
    displayRemoveConfirmation: function ( id ) {
        //cance button start
        var modalWindow = document.getElementById('modal');
        var cancelBtn = document.getElementById("confirmCancelButton");

        cancelBtn.onclick = function () {
            modalWindow.style.display = 'none';
            console.log( state.itemID );
        };

        //cancel button end

        //confirm button start
        var confirmButton = document.getElementById('confirmConfirmButton');
        confirmButton.addEventListener(
            'click',
            () => {
                let id = state.itemID;
    
                fetch( `/vendors/items/${ id }`, {
                    method: 'DELETE',
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if(typeof(response) === "string"){
                            controller.createToaster(response, "error");
                        }else{
                            state.vendor.removeItem( id );
                        }
                    })
                    .catch((err) =>{
                        controller.createToaster('Something went wrong, please refresh the page.', "error");
                    });
        
                    controller.closeModal();
            }
        )
        // confirm button end
    },
  
}

module.exports = modal;