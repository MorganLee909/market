const renderer = require("./controllers/renderer.js");
const vendorData = require("./controllers/vendorData.js");
const userData = require("./controllers/userData.js");

module.exports = function(app){
    app.get("/", renderer.home);

    app.get("/vendors/search*", vendorData.getVendors);
    app.get("/vendors/:id", vendorData.getVendor);
    app.post("/vendors", vendorData.createVendor);
    app.put("/vendors/:id", vendorData.updateVendor);
    app.delete("/vendors/:id", vendorData.removeVendor);
    
    app.get("/leelogin", vendorData.logLeeIn);

    app.post("/users", userData.createUser);
    app.put("/users", userData.updateUser);
    app.delete("/users/:id", userData.removeUser);
    app.get("/users/:id", userData.getUser);

    app.get("/leelogin2", userData.logLeeIn);
}