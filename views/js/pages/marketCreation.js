const Market = require("../models/Market.js");

let marketCreationPage = {
    display: function(){
        let form = document.getElementById("createMarketForm");
        form.onsubmit = () => { this.submitForm() };

        this.searchMarket();
    },

    submitForm: function(){
        event.preventDefault();

        let data = {
            name: document.getElementById('marketName').value,
            address: document.getElementById('marketLocation').value
        };

        let fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        };

        fetch('/markets', fetchOptions)
            .then(response => response.json())
            .then((response) => {
                if( typeof(response) === "string"){
                    controller.createToaster(response, "error");
                } else{
                    let newMarket = new Market(
                        response._id,
                        response.name,
                        response.owner,
                        response.vendors,
                        response.address,
                        response.description
                    );
                    
                    state.vendor.addMarket(newMarket);
                    controller.openPage('vendorInfoPage');
                }
            })
            .catch((err)=>{
                controller.createToaster("Something went wrong. Refresh the page.", "error");
            });
    },

    searchMarket: function(){
        let url = '/markets/search?';
        let address = '4368 US-17 BUS, Murrells Inlet, SC';
        address = address.replaceAll(' ', '+');

        url = `${url}address=${address}&distance=20`;

        fetch( url )
        .then(response => response.json() )
            .then((response) => {
                if(typeof(response) === "string"){
                    controller.createToaster(response, "error");
                }else{
                }
            })
            .catch((err) => {
                controller.createToaster('Something went wrong, please refresh the page.', 'error');
            });
    },
}

module.exports = marketCreationPage;

// app.post("/markets", verifyVendor, marketData.createMarket);
//app.get("/markets/search?*", marketData.getMarkets);