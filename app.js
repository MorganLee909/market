const express = require("express");
const session = require("cookie-session");
const mongoose = require("mongoose");
const compression = require("compression");

const app = express();

mongoose.connect(process.env.MARKET_DB, {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");

function requireHTTPS(req, res, next){
    if(!req.secure && req.get("x-forwarded-proto") !== "https" && process.env.NODE_ENV !== "development"){
        return res.redirect("https://" + req.get("host") + req.url);
    }
    next();
}

app.use(requireHTTPS);
app.use(compression());
app.use(session({
    secret: "marketers marketing market markets",
    cookie: {secure: false},
    saveUninitialized: true,
    resave: false
}));
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

require("./routes")(app);

app.listen(process.env.PORT, ()=>{});