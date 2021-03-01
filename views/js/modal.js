let modal = {
    
    displayRemoveConfirmation: function ( item, removeFunction ) {
       
        var cancelBtn = document.getElementById("confirmationCancelBtn");
        var confBtn = document.getElementById("confirmationConfirmBtn");

        cancelBtn.onclick = function () {
            controller.closeModal();
        };

        confBtn.onclick = () => {
            removeFunction( item );
            controller.closeModal();
        };

    },
  
}

module.exports = modal;