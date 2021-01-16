(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Market = require("./js/models/Market.js");
const Vendor = require("./js/models/Vendor.js");
const Item = require("./js/models/Item.js");
const User = require("./js/models/User.js");

const landingPage = require("./js/pages/landing.js");
const userRegistrationPage = require("./js/pages/userRegistration.js");
const vendorRegistrationPage = require("./js/pages/vendorRegistration.js");
const createVendorPage = require("./js/pages/createVendor.js");

controller = {
    openPage: function( page ) {
        let pages = document.querySelectorAll( '.page' );

        for( let i = 0; i < pages.length; i++){
            pages[i].style.display = 'none';
        }
        console.log(page);
        
        switch( page ) {
            case 'landingPage':
                landingPage.display();
                break;

            case 'userRegistrationPage':
                userRegistrationPage.display();
                break;     

            case 'vendorRegistrationPage':
                vendorRegistrationPage.display();
                break; 
                
            case 'createVendorPage':
                createVendorPage.display();
                break;  
        }
        
        document.getElementById( page ).style.display = "flex";
    }
};

state = {
    landingPage: {
        isPopulated: false
    },

    userRegistrationPage: {
        isPopulated: false
    },

    vendorRegistrationPage: {
        isPopulated: false
    }

}

landingPage.display();


},{"./js/models/Item.js":2,"./js/models/Market.js":3,"./js/models/User.js":4,"./js/models/Vendor.js":5,"./js/pages/createVendor.js":6,"./js/pages/landing.js":7,"./js/pages/userRegistration.js":8,"./js/pages/vendorRegistration.js":9}],2:[function(require,module,exports){
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
let createVendorPage = {
    display: function(){
        document.getElementById('createVendorPage').style.display = 'flex';
        document.getElementById('openLanding').addEventListener( 'click', () => {controller.openPage( 'landingPage')});
    }
};

module.exports = createVendorPage;
},{}],7:[function(require,module,exports){
let landingPage = {
    display: function(){
        document.getElementById('openUserRegistration').addEventListener(
            'click', 
            () => {controller.openPage( 'userRegistrationPage')}
        );

        document.getElementById('openVendorRegistration').addEventListener(
            'click', 
            () => {controller.openPage( 'vendorRegistrationPage')}
        );
    }    
}

module.exports = landingPage;


},{}],8:[function(require,module,exports){
let userRegistrationPage = {
    display: function(){
        if( state.userRegistrationPage.isPopulated === false ){

            console.log("user registration page load");

            let button = document.getElementById('openLandingPage');
            button.onclick = () => {controller.openPage('landingPage')};

            state.userRegistrationPage.isPopulated = true;
        }
    }
}

module.exports = userRegistrationPage;


},{}],9:[function(require,module,exports){
let vendorRegistrationPage = {
    display: function(){
        if( state.vendorRegistrationPage.isPopulated === false ){
            let button = document.getElementById('openLandingPage');
            button.onclick = () => {controller.openPage('landingPage')};

            let form = document.getElementById('vendorRegForm');
            form.onsubmit = () => {this.submitForm()};

            state.vendorRegistrationPage.isPopulated = true;
        }
    },

    submitForm: function() {
        event.preventDefault();

        let data = {
            name: "ivan",
            email: document.getElementById('vendorRegEmail').value,
            password: document.getElementById('vendorRegPassword').value,
            confirmPassword: document.getElementById('vendorRegConfPassword').value,
        }

        let fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        }

        fetch( '/vendors', fetchOptions)
            .then(response => response.json())
            .then((response)=>{
                console.log(response);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
}

module.exports = vendorRegistrationPage;
},{}]},{},[1]);
