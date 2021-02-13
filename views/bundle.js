(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const vendorInfoPage = require("./js/pages/vendorInfo.js");
const landingPage = require("./js/pages/landing.js");
const vendorRegistrationPage = require("./js/pages/vendorRegistration.js");
const loginPage = require('./js/pages/login.js');
const Vendor = require("./js/models/Vendor.js");

// Components //
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
                vendorRegistrationPage.display();
                break; 
            
            case 'loginPage':
                loginPage.display();
                break;

        }

        document.getElementById( page ).style.display = "flex";
    },

    createToaster: function ( mess, type ) {
        
        document.getElementById( "toasterText" ).innerText = mess;

        let toasterContainer = document.getElementById( "toasterContainer" );
        let toasterCanvas = document.getElementById( "toasterCanvas" );

        switch(type){
            
            case 'error':
                toasterCanvas.classList.add( 'toasterError' );
                toasterContainer.style.display = "flex";
                
                break;

            case "success":
                toasterCanvas.classList.add( 'toasterSuccess' );
                toasterContainer.style.display = "flex";

                break;
        }

        setTimeout(function () {
            toasterContainer.style.display = "none";
            toasterCanvas.classList = '';
        }, 
        4000);
        
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

fetch( '/vendors/session' )
    .then( response => response.json() )
    .then( (response) => {

        if(typeof(response) === "string"){
            controller.createBanner(response, "error");
        }
        
        if( response === null ){ 
            controller.openPage( 'landingPage' );
        } else{ 
            state.vendor = new Vendor(
                response._id,
                response.name,
                response.email,
                response.description,
                response.items
            );
            
            controller.openPage( 'vendorInfoPage' ); 
        }
    })
    .catch((err) => {
        controller.createBanner("Something went wrong. Refresh the page.", "error");
    });
},{"./js/components.js":2,"./js/models/Vendor.js":4,"./js/pages/landing.js":5,"./js/pages/login.js":6,"./js/pages/vendorInfo.js":7,"./js/pages/vendorRegistration.js":8}],2:[function(require,module,exports){
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
    static get observedAttributes(){
        return ["product"];
    }
    
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

    attributeChangedCallback( name, oldValue, newValue ){
        switch( name ){

            case 'product':
                this._shadow.children[1].children[0].innerText = newValue;

        }
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

    get name(){
        return this._name;
    }

}

module.exports = Item;
},{}],4:[function(require,module,exports){
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
},{"./Item.js":3}],5:[function(require,module,exports){

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
},{}],6:[function(require,module,exports){
const Vendor = require('../models/Vendor.js');

let loginPage ={
    display: function () {

        document.getElementById('loginToLanding').addEventListener(
            'click',
            () => {controller.openPage( 'landingPage' )}
        );

        document.getElementById('loginToVendorRegistration').addEventListener(
            'click',
            () => {controller.openPage( 'vendorRegistrationPage' )}
        );

        if( state.loginPage.isPopulated === false ){

            let form = document.getElementById('vendorLoginForm');
            form.onsubmit = () => {this.submit()};

            state.loginPage.isPopulated = true;
        }
    },

    submit: function () {
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
                if( typeof(response) === 'string'){
                    controller.createToaster( response, 'error' );
                } else{
                    state.vendor = new Vendor(
                        response._id,
                        response.name,
                        response.email,
                        response.description,
                        response.items
                    );
                    
                    controller.openPage('vendorInfoPage');
                }
            })
            .catch((err) => {
                controller.createToaster( 'Something went wrong. Refresh the page.', 'error' );
            });
    }
}

module.exports = loginPage;
},{"../models/Vendor.js":4}],7:[function(require,module,exports){
let vendorInfoPage = {
    display: function(){
        if(state.vendorInfoPage.isPopulated === false){
            document.getElementById('vendorInfoToLanding').addEventListener(
                'click', 
                () => {controller.openPage( 'landingPage' )}
            );

            document.getElementById('vendorInfoToSignOut').addEventListener(
                'click', 
                () => {
                    fetch('/logout')
                        .then( response => response.json() )
                        .then((response)=>{
                            if(typeof(response) === 'string'){
                                controller.createBanner(response, "error");
                            } else {
                                state.vendor = null;
                                controller.openPage("landingPage");
                            }
                        
                        })
                        .catch((err) => {
                            controller.createBanner("Something went wrong. Refresh the page.", "error");
                        });
                }
            );    
            
            let goods = document.getElementById("goods");

            for( let i = 0; i < state.vendor.items.length; i++ ){
                let item = document.createElement('vendor-item');
                item.setAttribute( 'product', state.vendor.items[i].name );
                goods.appendChild(item);
            }

            state.vendorInfoPage.isPopulated = true;
        }
    }    
}

module.exports = vendorInfoPage;
},{}],8:[function(require,module,exports){
const Vendor = require('../models/Vendor.js');

let vendorRegistrationPage = {
    display: function(){

        document.getElementById('vendorRegistrationToLanding').addEventListener(
            'click',
            () => {controller.openPage( 'landingPage' )}
        );

        document.getElementById('VendorRegistrationToLogin').addEventListener(
            'click',
            () => {controller.openPage( 'loginPage' )}
        );

        if( state.vendorRegistrationPage.isPopulated === false ){

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
                if( typeof(response) === "string" ) {
                    controller.createBanner(response, "error");
                } else{
                    let newVendor = new Vendor(
                        response._id, 
                        response.name, 
                        response.email, 
                        "", 
                        response.items
                    );

                    state.vendor = newVendor;
                    controller.openPage('vendorInfoPage');
                }
            })
            .catch((err)=>{
                controller.createBanner("Something went wrong. Refresh the page.", "error");

            });
    }
}

module.exports = vendorRegistrationPage;
},{"../models/Vendor.js":4}]},{},[1]);
