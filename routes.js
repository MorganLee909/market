const renderer = require("./controllers/renderer.js");
const vendorData = require("./controllers/vendorData.js");
const itemData = require("./controllers/itemData.js");
const userData = require("./controllers/userData.js");
const marketData = require("./controllers/marketData.js");

module.exports = function(app){
    app.get("/", renderer.home);
    app.get("/logout", renderer.logout);

    //Vendors
    app.get("/vendors/search*", vendorData.getVendors);
    app.get("/vendors/:id", vendorData.getVendor);
    app.post("/vendors", vendorData.createVendor);
    app.post("/vendors/login", vendorData.vendorLogin);
    app.put("/vendors", vendorData.updateVendor);
    app.delete("/vendors/:id", vendorData.removeVendor);

    //Vendor items
    app.post("/vendors/items", itemData.addItems);
    app.delete("/vendors/items/:id", itemData.removeItem);
        
    //Users
    app.post("/users", userData.createUser);
    app.put("/users", userData.updateUser);
    app.post("/users/login", userData.userLogin);
    app.delete("/users/:id", userData.removeUser);
    app.get("/users/:id", userData.getUser);

    //Markets
    app.post("/markets", marketData.createMarket);
    app.put("/markets", marketData.updateMarket);
    app.get("/markets/search?*", marketData.getMarkets);
    app.post("/markets/:id/vendors", marketData.addVendors);
    app.get("/markets/:id", marketData.getMarket);
    app.delete("/markets/:id", marketData.removeMarket); 
}