(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Market = require("./js/models/Market.js");
const Vendor = require("./js/models/Vendor.js");
const Item = require("./js/models/Item.js");
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
},{"./js/components.js":2,"./js/models/Item.js":3,"./js/models/Market.js":4,"./js/models/User.js":5,"./js/models/Vendor.js":6,"./js/pages/landing.js":7,"./js/pages/login.js":8,"./js/pages/vendorInfo.js":9,"./js/pages/vendorRegistration.js":10}],2:[function(require,module,exports){
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
            <h1 class="goodsTitle"> Tomato </h1>
        
            <input class="plus_button" type="submit" value="-">

            <label class="goodsInput"> Amount 
                <input id="amount" class="form-control" type="kg" placeholder="0">
            </label>

            <input class="plus_button" type="submit" value="+">

            <div class="price">
                <h3 class="priceTitle"> Price </h3>
                <h2> $15 </h2>
            </div>

            <!-- <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M14.0671 11.9995L17.7121 8.35448C17.8349 8.21101 17.8991 8.02645 17.8919 7.83769C17.8846 7.64894 17.8063 7.46988 17.6727 7.33631C17.5392 7.20274 17.3601 7.12449 17.1714 7.1172C16.9826 7.10991 16.798 7.17411 16.6546 7.29698L13.0096 10.9045L9.34207 7.23698C9.19859 7.11411 9.01404 7.04991 8.82528 7.0572C8.63652 7.06449 8.45747 7.14274 8.3239 7.27631C8.19033 7.40988 8.11208 7.58894 8.10479 7.77769C8.0975 7.96645 8.1617 8.15101 8.28457 8.29448L11.9446 11.9995L8.35957 15.5395C8.28106 15.6067 8.21729 15.6895 8.17228 15.7825C8.12726 15.8756 8.10196 15.9769 8.09797 16.0802C8.09398 16.1835 8.11139 16.2865 8.14909 16.3827C8.1868 16.479 8.24399 16.5664 8.31708 16.6395C8.39017 16.7126 8.47758 16.7698 8.57383 16.8075C8.67007 16.8452 8.77307 16.8626 8.87636 16.8586C8.97965 16.8546 9.081 16.8293 9.17405 16.7843C9.2671 16.7393 9.34983 16.6755 9.41707 16.597L12.9946 13.0195L16.5496 16.5745C16.693 16.6974 16.8776 16.7616 17.0664 16.7543C17.2551 16.747 17.4342 16.6687 17.5677 16.5352C17.7013 16.4016 17.7796 16.2225 17.7869 16.0338C17.7941 15.845 17.7299 15.6605 17.6071 15.517L14.0671 11.9995Z" fill="#BDBDBD"/>
                <path d="M12.8594 24C10.486 24 8.16593 23.2962 6.19254 21.9776C4.21915 20.6591 2.68108 18.7849 1.77283 16.5922C0.864574 14.3995 0.626934 11.9867 1.08996 9.65892C1.55298 7.33115 2.69587 5.19295 4.3741 3.51472C6.05233 1.83649 8.19052 0.693604 10.5183 0.230582C12.8461 -0.232441 15.2589 0.00519937 17.4516 0.913451C19.6443 1.8217 21.5184 3.35977 22.837 5.33316C24.1556 7.30655 24.8594 9.62663 24.8594 12C24.8594 15.1826 23.5951 18.2348 21.3447 20.4853C19.0942 22.7357 16.042 24 12.8594 24ZM12.8594 1.50001C10.7827 1.50001 8.75261 2.11582 7.02589 3.26957C5.29918 4.42333 3.95336 6.0632 3.15864 7.98183C2.36392 9.90045 2.15599 12.0117 2.56113 14.0485C2.96628 16.0853 3.96631 17.9562 5.43476 19.4246C6.90321 20.8931 8.77413 21.8931 10.8109 22.2982C12.8477 22.7034 14.9589 22.4955 16.8776 21.7007C18.7962 20.906 20.4361 19.5602 21.5898 17.8335C22.7436 16.1068 23.3594 14.0767 23.3594 12C23.3594 9.21523 22.2531 6.54451 20.284 4.57538C18.3149 2.60625 15.6442 1.50001 12.8594 1.50001Z" fill="#BDBDBD"/>
            </svg> -->

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
}

module.exports = Vendor;
},{}],7:[function(require,module,exports){
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
            });
    }
}

module.exports = loginPage;
},{}],9:[function(require,module,exports){
let vendorInfoPage = {
    display: function(){
        document.getElementById('vendorInfoToLanding').addEventListener(
            'click', 
            () => {controller.openPage( 'landingPage')}
        );

        state.vendorInfoPage.isPopulated = true;
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
