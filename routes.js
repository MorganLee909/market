const renderer = require("./controllers/renderer.js");
const vendorData = require("./controllers/vendorData.js");

module.exports = function(app){
    app.get("/", renderer.home);

    app.get("/vendor", vendorData.getVendor);
    app.post("/vendor/create", vendorData.createVendor);
}