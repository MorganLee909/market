const renderer = require("./controllers/renderer.js");

module.exports = function(app){
    app.get("/", renderer.home);
}