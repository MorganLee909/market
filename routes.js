const renderer = require("./controllers/renderer.js");
const vendorData = require("./controllers/vendorData.js");

module.exports = function(app){
    app.get("/", renderer.home);

    app.get("/vendors", vendorData.getVendor);
    app.post("/vendors/create", vendorData.createVendor);
    app.put("/vendors/update", vendorData.updateVendor);
    
    app.get("/leelogin", vendorData.logLeeIn);
}