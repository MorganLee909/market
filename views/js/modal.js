const Vendor = require("./models/Vendor.js");
const vendorInfo = require("./pages/vendorInfo.js");

let modal = {
    
    displayRemoveConfirmation: function ( item, removeFunction ) {
       
        var cancelBtn = document.getElementById("confirmationCancelBtn");
        var confBtn = document.getElementById("confirmationConfirmBtn");

        let subTitle = document.getElementById("confSubtitleModal");
        subTitle.innerText = `${item.getAttribute('amount')} Kg of ${ item.getAttribute('product')} ${"will be removed"}`;

        cancelBtn.onclick = function () {
            controller.closeModal();
        };

        confBtn.onclick = () => {
            removeFunction( item );
            controller.closeModal();
        };

    },

    displayEditVendorBio: function () {
        
        document.getElementById("vendorName").value = state.vendor.name;
        document.getElementById("vendorBioEmail").value = state.vendor.email;
        document.getElementById("vendorBioOwnerName").value = state.vendor.ownerName || "";
        document.getElementById("ownerCheckbox").checked = state.vendor.sharesOwnerName;

        document.getElementById("vendorBioDescription").innerText = state.vendor.description || "";

        let addressField = document.getElementById("vendorBioAddress");
        addressField.value = "";
        console.log(addressField);
        if(state.vendor.address !== undefined) addressField.value = state.vendor.address.full;
        console.log(addressField.value, 'value');

        document.getElementById("addressCheckbox").checked = state.vendor.sharesAddress;
       
        document.getElementById("vendorBioEditForm").onsubmit = () => { this.submitBioEdit() };
        document.getElementById('vendorBioCancelBtn').onclick = () => { controller.closeModal() };
        
    },

    submitBioEdit: function() {
        event.preventDefault();

        let data = {
            id: state.vendor.id,
            name: document.getElementById("vendorName").value,
            email: document.getElementById("vendorBioEmail").value,
            ownerName: document.getElementById("vendorBioOwnerName").value,
            description: document.getElementById("vendorBioDescription").value,
            address: document.getElementById("vendorBioAddress").value,
            sharesOwnerName: document.getElementById("ownerCheckbox").checked,
            sharesAddress: document.getElementById("addressCheckbox").checked
        };
        
        console.log("something");
        fetch( "/vendors", {
            method: 'PUT',
            headers:{
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((response) => {
                if(typeof(response) === 'string') {
                    controller.createToaster(response, 'error');
                }else{
                    state.vendor = new Vendor( 
                        response._id,
                        response.name, 
                        response.email,
                        response.description,
                        response.items,
                        response.ownerName,
                        response.address,
                        response.sharesAddress,
                        response.sharesOwnerName
                    );
                    vendorInfo.displayVendorInfo();
                    controller.closeModal();
                }
            })
            .catch((err) => {
                console.log(err);
                controller.createToaster('Something went wrong, please refresh the page.', "error");
            });
    }
  
}

module.exports = modal;