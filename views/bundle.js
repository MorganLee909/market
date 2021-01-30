(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Market = require("./js/models/Market.js");
const Vendor = require("./js/models/Vendor.js");
const User = require("./js/models/User.js");

const vendorInfoPage = require("./js/pages/vendorInfo.js");
const landingPage = require("./js/pages/landing.js");
const vendorRegistrationPage = require("./js/pages/vendorRegistration.js");
const loginPage = require('./js/pages/login.js');

///Components Start///
require("./js/components.js");

controller = {
    openPage: function( page ) {

        let pages = document.querySelectorAll( '.page' );

        for( let i = 0; i < pages.length; i++){
            pages[i].style.display = 'none';
        }
        
        switch( page ) {

            case 'vendorInfoPage':
                vendorInfoPage.display();
                break;  

            case 'landingPage':
                landingPage.display();
                break;    

            case 'vendorRegistrationPage':
                vendorRegistrationPage.display( Vendor );
                break; 
            
            case 'loginPage':
                loginPage.display(Vendor);
                break;

        }

        document.getElementById( page ).style.display = "flex";
    }
};

state = {
    vendor: null,

    vendorInfoPage: {
        isPopulated: false
    },

    landingPage: {
        isPopulated: false
    },

    vendorRegistrationPage: {
        isPopulated: false
    },

    loginPage: {
        isPopulated: false
    }
}

landingPage.display();
},{"./js/components.js":2,"./js/models/Market.js":4,"./js/models/User.js":5,"./js/models/Vendor.js":6,"./js/pages/landing.js":7,"./js/pages/login.js":8,"./js/pages/vendorInfo.js":9,"./js/pages/vendorRegistration.js":10}],2:[function(require,module,exports){
class HomeButton extends HTMLElement{
    static get observedAttributes(){
        return ["change", "other", "something", "gofuckyourself"];
    }

    constructor(){
        super();
        this._shadow = this.attachShadow({mode: "open"});

        let button = document.createElement("button");
        button.onclick = ()=>{controller.openPage( 'landingPage' )};
        button.innerText = "Go to Home Page";
        button.classList.add('cta_button');
        
        // Apply external styles to the shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'index.css');

        this._shadow.appendChild(linkElem);

        this._shadow.appendChild(button);
    }

    attibuteChangedCallback(name, oldValue, newValue){
        switch(name){
            case "change":
                //our code
                break;
            case "other":
                this.doOther();
                break;
        }
    }

    doOther(){
        //doing other things
    }
}

//new component
class VendorItem extends HTMLElement{
    
    constructor(){
        super();
        this._shadow = this.attachShadow({mode: "open"});

        let vendorItem = document.createElement("div");
        vendorItem.classList.add( "vendor-item" );

        // Apply external styles to the shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'index.css');

        this._shadow.appendChild(linkElem);

        vendorItem.innerHTML = `
            <h1 class="goodsTitle">  </h1>
        
            <button class="plus_button"> - </button>

            <label class="goodsInput"> Amount 
                <input class="form-control" type="number" placeholder="0" min="0" step="0.1">
            </label>

            <button class="plus_button"> + </button>

            <div class="price">
                <h3 class="priceTitle"> Price </h3>
                <h2>  </h2>
            </div>

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
        `;

        this._shadow.appendChild(vendorItem);
    }
}

customElements.define('vendor-item', VendorItem);
customElements.define("home-button", HomeButton);
},{}],3:[function(require,module,exports){
class Item {
    constructor( id, name, quantity, unit ){
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._unit = unit;
    }
}

module.exports = Item;
},{}],4:[function(require,module,exports){
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

module.exports = Market;
},{}],5:[function(require,module,exports){
class User {
    constructor( id, name, email ){
        this._id = id;
        this._name = name;
        this._email = email;
    }
}

module.exports = User;
},{}],6:[function(require,module,exports){
const Item = require("./Item.js");

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

    get name(){
        return this._name;
    }

    get items(){
        return this._items;
    }
}

module.exports = Vendor;
},{"./Item.js":3}],7:[function(require,module,exports){
let landingPage = {
    display: function(){

        document.getElementById('openVendorRegistration').addEventListener(
            'click', 
            () => {controller.openPage( 'vendorRegistrationPage' )}
        );

        document.getElementById( 'landingToLoginBtn').addEventListener(
            'click',
            () => {controller.openPage( 'loginPage' )}
        );

    }    
}

module.exports = landingPage;
},{}],8:[function(require,module,exports){
let loginPage ={
    display: function (Vendor) {
        if( state.loginPage.isPopulated === false ){

            let form = document.getElementById('vendorLoginForm');
            form.onsubmit = () => {this.submit(Vendor)};

            state.loginPage.isPopulated = true;
        }
   
    },

    submit: function (Vendor) {
        event.preventDefault();

        let data = {
            email: document.getElementById('vendorLoginEmail').value,
            password: document.getElementById('vendorLoginPassword').value
        }

        fetch( '/vendors/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((response) => {
                state.vendor = new Vendor(
                    response._id,
                    response.name,
                    response.email,
                    response.description,
                    response.items
                );

                controller.openPage('vendorInfoPage');
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = loginPage;
},{}],9:[function(require,module,exports){
let vendorInfoPage = {
    display: function(){
        if(state.vendorInfoPage.isPopulated === false){
            document.getElementById('vendorInfoToLanding').addEventListener(
                'click', 
                () => {controller.openPage( 'landingPage')}
            );
            
            let goods = document.getElementById("goods");

            for( let i = 0; i < state.vendor.items.length; i++ ){
                let item = document.createElement('vendor-item');
                goods.appendChild(item);
            }

            state.vendorInfoPage.isPopulated = true;
        }
    }    
}

module.exports = vendorInfoPage;
},{}],10:[function(require,module,exports){
let vendorRegistrationPage = {
    display: function( Vendor ){

        if( state.vendorRegistrationPage.isPopulated === false ){

            let form = document.getElementById('vendorRegForm');
            form.onsubmit = () => {this.submitForm( Vendor )};

            state.vendorRegistrationPage.isPopulated = true;
        }
    },

    submitForm: function( Vendor ) {
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
                if( typeof(response) === "string" ) {
                    throw response;
                } 

                let newVendor = new Vendor(
                    response._id, 
                    response.name, 
                    response.email, 
                    "", 
                    response.items
                );
                
                state.vendor = newVendor;
                controller.openPage('vendorInfoPage');
            })
            .catch((err)=>{
            });

    }
}

module.exports = vendorRegistrationPage;


},{}]},{},[1]);
