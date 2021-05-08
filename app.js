const express = require("express");
const session = require("cookie-session");
const mongoose = require("mongoose");
const compression = require("compression");
const cssmerger = require("cssmerger");
const esbuild = require("esbuild");
const https = require("https");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));

let cssOptions = {
    recursive: true,
    minimize: false
};

let esbuildOptions = {
    entryPoints: ["./views/index.js"],
    bundle: true,
    minify: false,
    outfile: "./views/bundle.js"
};

let mongooseURL = "mongodb://localhost:27017/market";
let httpsServer = {};
if(process.env.NODE_ENV === "production"){
    httpsServer = https.createServer({
        key: fs.readFileSync("/etc/letsencrypt/live/markket.xyz/privkey.pem", "utf8"),
        cert: fs.readFileSync("/etc/letsencrypt/live/markket.xyz/fullchain.pem", "utf8")
    }, app);

    app.use((req, res, next)=>{
        if(req.secure === true){
            next();
        }else{
            res.redirect(`https://${req.headers.host}${req.url}`);
        }
    });

    mongooseURL = `mongodb://website:${process.env.MARKET_DB_PASS}@127.0.0.1/market`;
    cssOptions.minimize = true;
    esbuildOptions.minify = true;
}

mongoose.connect(mongooseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
cssmerger(["./views/css"], "./views/bundle.css", cssOptions);
esbuild.buildSync(esbuildOptions);

app.use(compression());
app.use(session({
    secret: "marketers marketing market markets with markers",
    cookie: {secure: false},
    saveUninitialized: true,
    resave: false
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

require("./routes")(app);

if(process.env.NODE_ENV === "production"){
    httpsServer.listen(process.env.HTTPS_PORT);
}
app.listen(process.env.PORT);