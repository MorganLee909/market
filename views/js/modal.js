let modal = {
    
    displayRemoveConfirmation: function ( item, removeFunction ) {
       
        var cancelBtn = document.getElementById("confirmationCancelBtn");
        var confBtn = document.getElementById("confirmationConfirmBtn");

        let subTitle = document.getElementById("confSubtitleModal");
        subTitle.innerText = `${ item.getAttribute('amount')} Kg of ${ item.getAttribute('product')} ${"will be removed"}`;

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