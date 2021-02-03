const renderer = require("./controllers/renderer.js");
const vendorData = require("./controllers/vendorData.js");
const itemData = require("./controllers/itemData.js");
const userData = require("./controllers/userData.js");
const marketData = require("./controllers/marketData.js");

const verifyVendor = require("./middleware.js").verifyVendor;

module.exports = function(app){
    app.get("/", renderer.home);
    app.get("/logout", renderer.logout);

    //Vendors
    app.get("/vendors/search*", vendorData.getVendors);
    app.get("/vendors/session", verifyVendor, vendorData.checkSession);
    app.get("/vendors/:id", verifyVendor, vendorData.getVendor);
    app.post("/vendors", vendorData.createVendor);
    app.post("/vendors/login", vendorData.vendorLogin);
    app.put("/vendors", verifyVendor, vendorData.updateVendor);
    app.delete("/vendors/:id", verifyVendor, vendorData.removeVendor);

    //Vendor items
    app.post("/vendors/items", verifyVendor, itemData.addItems);
    app.delete("/vendors/items/:id", verifyVendor, itemData.removeItem);
    app.put("/vendors/items", verifyVendor, itemData.updateItems);
        
    //Users
    app.post("/users", userData.createUser);
    app.put("/users", userData.updateUser);
    app.post("/users/login", userData.userLogin);
    app.delete("/users/:id", userData.removeUser);
    app.get("/users/:id", userData.getUser);

    //Markets
    app.post("/markets", verifyVendor, marketData.createMarket);
    app.put("/markets", verifyVendor, marketData.updateMarket);
    app.get("/markets/search?*", marketData.getMarkets);
    app.post("/markets/:id/vendors", verifyVendor, marketData.addVendors);
    app.get("/markets/:id", marketData.getMarket);
    app.delete("/markets/:id", verifyVendor, marketData.removeMarket); 
}