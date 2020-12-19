(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Market = require("./js/models/Market.js");
const Vendor = require("./js/models/Vendor.js");
const Item = require("./js/models/Item.js");
const User = require("./js/models/User.js");

const landingPage = require("./js/pages/landing.js");

const controller = {};

landingPage.display();
},{"./js/models/Item.js":2,"./js/models/Market.js":3,"./js/models/User.js":4,"./js/models/Vendor.js":5,"./js/pages/landing.js":6}],2:[function(require,module,exports){
class Item {
    constructor( id, name, quantity, unit ){
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._unit = unit;
    }
}

},{}],3:[function(require,module,exports){
class Market{
    constructor( id, name, owner, vendors, address, description ){
        this._id = id;
        this._name = name;
        this._owner = new Vendor( 
            owner._id, 
            owner._name, 
            owner._email,
            owner._description,
            []
        );
        this._vendors = [];
        this._address = address;
        this._description = description;

        for( let i = 0; i < vendors.length; i++){
            let vendor = new Vendor(        
                vendors[i]._id,
                vendors[i]._name, 
                vendors[i]._email,
                vendors[i]._description,
                vendors[i]._items
            );
            this._vendors.push( vendor );
        }
    }
}

},{}],4:[function(require,module,exports){
class User {
    constructor( id, name, email ){
        this._id = id;
        this._name = name;
        this._email = email;
    }
}


},{}],5:[function(require,module,exports){
class Vendor {
    constructor( id, name, email, description, items ){
        this._id = id;
        this._name = name;
        this._email = email;
        this._description = description;
        this._items = [];

        for( let i = 0; i < items.length; i++ ){
            let item = new Item ( 
               items[i].id, 
               items[i].name, 
               items[i].quantity, 
               items[i].unit,  
            );
            this._items.push( item );
        }
    }
}
},{}],6:[function(require,module,exports){
let landingPage = {
    display: function(){
        document.getElementById('landingPage').style.display = 'flex';
        console.log("this is landing function");
    }
};

module.exports = landingPage;
},{}]},{},[1]);
