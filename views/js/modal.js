let modal = {
    
    displayRemoveConfirmation: function ( item, removeFunction ) {
        //cance button start
        var modalWindow = document.getElementById('modal');
        var cancelBtn = document.getElementById("confirmationCancelBtn");
        var confBtn = document.getElementById("confirmaitonConfirmBtn");

        cancelBtn.onclick = function () {
            controller.closeModal();
        };

        confBtn.onclick = () => {
            removeFunction(item)
            controller.closeModal();
        };

        //cancel button end
    },
  
}

module.exports = modal;