const renderer = require("./controllers/renderer.js");
const vendorData = require("./controllers/vendorData.js");
const userData = require("./controllers/userData.js");
const marketData = require("./controllers/marketData.js");

module.exports = function(app){
    app.get("/", renderer.home);

    //Vendors
    app.get("/vendors/search*", vendorData.getVendors);
    app.get("/vendors/:id", vendorData.getVendor);
    app.post("/vendors", vendorData.createVendor);
    app.put("/vendors", vendorData.updateVendor);
    app.delete("/vendors/:id", vendorData.removeVendor);
    
    app.get("/leeloginvendor", vendorData.logLeeIn);

    //Users
    app.post("/users", userData.createUser);
    app.put("/users", userData.updateUser);
    app.delete("/users/:id", userData.removeUser);
    app.get("/users/:id", userData.getUser);

    app.get("/leeloginuser", userData.logLeeIn);

    //Markets
    app.post("/markets", marketData.createMarket);
    app.put("/markets", marketData.updateMarket);
    app.get("/markets/:id", marketData.getMarket);
}