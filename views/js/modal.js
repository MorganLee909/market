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
        document.getElementById("vendorBioOwnerName").value = state.vendor.ownerName;
        document.getElementById("vendorBioPhone").value = state.vendor.phone;

        document.getElementById("vendorBioDescription").innerText = state.vendor.description;

        document.getElementById("vendorBioAddress").value = state.vendor.address;
               
        document.getElementById("vendorBioEditForm").onsubmit = () => { this.submitBioEdit() };
        document.getElementById('vendorBioCancelBtn').onclick = () => { controller.closeModal() };
        
    },

    submitBioEdit: function() {
        event.preventDefault();
        console.log('submit')

        let data = {
            id: state.vendor.id,
            name: document.getElementById("vendorName").value,
            email: document.getElementById("vendorBioEmail").value,
            ownerName: document.getElementById("vendorBioOwnerName").value,
            description: document.getElementById("vendorBioDescription").value,
            address: document.getElementById("vendorBioAddress").value,
            telephone: document.getElementById("vendorBioPhone").value
        };
        
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
                        response.telephone
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