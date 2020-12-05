const renderer = require("./controllers/renderer.js");
const vendorData = require("./controllers/vendorData.js");

module.exports = function(app){
    app.get("/", renderer.home);

    app.get("/vendors/search*", vendorData.getVendors);
    app.get("/vendors/:id", vendorData.getVendor);
    app.post("/vendors", vendorData.createVendor);
    app.put("/vendors", vendorData.updateVendor);
    app.delete("/vendors/:id", vendorData.removeVendor);
    
    app.get("/leelogin", vendorData.logLeeIn);
}