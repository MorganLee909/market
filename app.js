const express = require("express");
const session = require("cookie-session");
const mongoose = require("mongoose");
const compression = require("compression");

const app = express();

mongoose.connect(process.env.MARKET_DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));

let httpsServer = {};
if(process.env.NODE_ENV === "production"){
    httpsServer = https.createServer({
        key: false.readFileSync("/etc/letsencrypt/live/something.com/privkey.pem", "utf8"),
        cert: false.readFileSync("/etc/letsencrypt/live/something.com/fullchain.pem", "utf8")
    }, app);

    app.use((req, res, next)=>{
        if(req.secure === true){
            next();
        }else{
            res.redirect(`https://${req.headers.host}${req.url}`);
        }
    })
}

app.use(compression());
app.use(session({
    secret: "marketers marketing market markets",
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