const vendor = require("../../models/vendor.js");
const vendorInfoPage = require("./pages/vendorInfo.js");

class HomeButton extends HTMLElement{
    static get observedAttributes(){
        return ["change", "other", "something", ];
    }

    constructor(){
        super();
        this._shadow = this.attachShadow({mode: "open"});

        let button = document.createElement("button");
        button.onclick = () => {controller.openPage( 'landingPage' )};
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

}

//Goods Component

class VendorItem extends HTMLElement{
    static get observedAttributes(){
        return ["product", "amount", "unit", "price", "isnew"];
    }
    
    constructor(){
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        // Apply external styles to the shadow dom
        const linkElem = document.createElement( 'link' );
        linkElem.setAttribute( 'rel', 'stylesheet' );
        linkElem.setAttribute( 'href', 'index.css' );
        this.shadow.appendChild( linkElem ) ;
        
        this.container = document.createElement( "div" );
        this.container.classList.add( "vendor-item" );
        this.shadow.appendChild( this.container );

        //goods title
        this.itemTitle = document.createElement( "h1" );
        this.itemTitle.classList.add( "goodsTitle" );
        this.container.appendChild( this.itemTitle );
        
        //amount
        this.amountGoods = document.createElement( "p" );
        this.amountGoods.classList.add( "goodsInput" );
        this.container.appendChild( this.amountGoods );

        //unit
        this.unitGoods = document.createElement( "p" );
        this.unitGoods.innerText = "kg";
        this.unitGoods.classList.add( 'unit-goods' );
        this.container.appendChild( this.unitGoods );

        //price
        this.price = document.createElement( "p" );
        this.price.innerText = "$5";
        this.price.classList.add( 'goods-price' );
        this.container.appendChild( this.price );

        //remove button
        this.removeButton = document.createElement( "button" );
        this.removeButton.innerHTML = `
            <svg class="icon padding-right-23" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <rect id="remove-icon-back" y="0.105469" width="33.2835" height="33.2835" rx="16.6418" fill="none"/>
                <g clip-path="url(#clip0)">
                    <path id="remove-icon" d="M13.4772 14.2168C13.645 14.2168 13.806 14.2835 13.9247 14.4022C14.0434 14.5209 14.1101 14.6819 14.1101 14.8497V22.4449C14.1101 22.6128 14.0434 22.7737 13.9247 22.8924C13.806 23.0111 13.645 23.0778 13.4772 23.0778C13.3093 23.0778 13.1483 23.0111 13.0296 22.8924C12.9109 22.7737 12.8442 22.6128 12.8442 22.4449V14.8497C12.8442 14.6819 12.9109 14.5209 13.0296 14.4022C13.1483 14.2835 13.3093 14.2168 13.4772 14.2168V14.2168ZM16.6418 14.2168C16.8097 14.2168 16.9707 14.2835 17.0894 14.4022C17.2081 14.5209 17.2748 14.6819 17.2748 14.8497V22.4449C17.2748 22.6128 17.2081 22.7737 17.0894 22.8924C16.9707 23.0111 16.8097 23.0778 16.6418 23.0778C16.474 23.0778 16.313 23.0111 16.1943 22.8924C16.0756 22.7737 16.0089 22.6128 16.0089 22.4449V14.8497C16.0089 14.6819 16.0756 14.5209 16.1943 14.4022C16.313 14.2835 16.474 14.2168 16.6418 14.2168V14.2168ZM20.4394 14.8497C20.4394 14.6819 20.3727 14.5209 20.254 14.4022C20.1353 14.2835 19.9743 14.2168 19.8065 14.2168C19.6386 14.2168 19.4776 14.2835 19.3589 14.4022C19.2402 14.5209 19.1735 14.6819 19.1735 14.8497V22.4449C19.1735 22.6128 19.2402 22.7737 19.3589 22.8924C19.4776 23.0111 19.6386 23.0778 19.8065 23.0778C19.9743 23.0778 20.1353 23.0111 20.254 22.8924C20.3727 22.7737 20.4394 22.6128 20.4394 22.4449V14.8497Z" fill="#9D9D9D"/>
                    <path id="remove-icon" fill-rule="evenodd" clip-rule="evenodd" d="M24.8699 11.0515C24.8699 11.3872 24.7365 11.7092 24.4991 11.9466C24.2617 12.184 23.9398 12.3173 23.604 12.3173H22.9711V23.7101C22.9711 24.3815 22.7044 25.0255 22.2296 25.5003C21.7548 25.9751 21.1108 26.2418 20.4394 26.2418H12.8442C12.1728 26.2418 11.5288 25.9751 11.054 25.5003C10.5792 25.0255 10.3125 24.3815 10.3125 23.7101V12.3173H9.67956C9.34383 12.3173 9.02185 12.184 8.78446 11.9466C8.54706 11.7092 8.4137 11.3872 8.4137 11.0515V9.78563C8.4137 9.4499 8.54706 9.12792 8.78446 8.89053C9.02185 8.65313 9.34383 8.51977 9.67956 8.51977H14.1101C14.1101 8.18404 14.2434 7.86206 14.4808 7.62467C14.7182 7.38727 15.0402 7.25391 15.3759 7.25391H17.9077C18.2434 7.25391 18.5654 7.38727 18.8027 7.62467C19.0401 7.86206 19.1735 8.18404 19.1735 8.51977H23.604C23.9398 8.51977 24.2617 8.65313 24.4991 8.89053C24.7365 9.12792 24.8699 9.4499 24.8699 9.78563V11.0515ZM11.7277 12.3173L11.5783 12.392V23.7101C11.5783 24.0458 11.7117 24.3678 11.9491 24.6052C12.1865 24.8426 12.5085 24.976 12.8442 24.976H20.4394C20.7751 24.976 21.0971 24.8426 21.3345 24.6052C21.5719 24.3678 21.7052 24.0458 21.7052 23.7101V12.392L21.5559 12.3173H11.7277ZM9.67956 11.0515V9.78563H23.604V11.0515H9.67956Z" fill="#9D9D9D"/>
                </g>
                <defs>
                    <clipPath id="clip0">
                    <rect width="20.2538" height="20.2538" fill="#C55" transform="translate(6.51489 7.25391)"/>
                    </clipPath>
                </defs>
            </svg>
        `;
        this.removeButton.onclick = () => { 
            controller.openModal( "confirmationModal", 
            { item: this, func: this.removeItem } ) 
        };
        this.container.appendChild( this.removeButton );
        
        //edit button
        this.editButton = document.createElement( "button" );
        this.editButton.innerHTML = `
            <svg class="icon" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path id="edit-icon-back" d="M0 16.6418C0 7.45077 7.45077 0 16.6418 0C25.8327 0 33.2835 7.45077 33.2835 16.6418C33.2835 25.8327 25.8327 33.2835 16.6418 33.2835C7.45077 33.2835 0 25.8327 0 16.6418Z" fill="none"/>
                <path id="edit-icon" d="M9.03345 21.7073V25.1448H12.4709L22.6093 15.0065L19.1718 11.569L9.03345 21.7073ZM25.2676 12.3482C25.3526 12.2633 25.42 12.1626 25.466 12.0517C25.512 11.9408 25.5357 11.822 25.5357 11.7019C25.5357 11.5818 25.512 11.463 25.466 11.3521C25.42 11.2412 25.3526 11.1405 25.2676 11.0557L23.1226 8.91065C23.0378 8.82567 22.9371 8.75825 22.8262 8.71226C22.7153 8.66626 22.5964 8.64258 22.4764 8.64258C22.3563 8.64258 22.2374 8.66626 22.1265 8.71226C22.0156 8.75825 21.9149 8.82567 21.8301 8.91065L20.1526 10.5882L23.5901 14.0257L25.2676 12.3482Z" fill="#9D9D9D"/>
            </svg>
        `;
        
        this.editButton.onclick = () => { this.editItem() };
        this.container.appendChild( this.editButton );
    }

    attributeChangedCallback( name, oldValue, newValue ){
        switch( name ){
           
            case 'product':
                this.itemTitle.innerText = newValue;
                break;
            case "amount":
                this.amountGoods.innerText = newValue;
                break;
            case "unit":
                this.unitGoods.innerText = newValue;
                break;
            case "price":
                this.price.innerText = `$${newValue}`;
                break;
            case "isnew":
                this.editItem();
                break;
        }
    }

    editItem(){
        //change hover color
        this.container.style.backgroundColor = 'white';
       
        //Edit Goods Title
        this.nameInput = document.createElement( "input" );
        this.nameInput.classList.add( "goodsTitle" );
        this.nameInput.classList.add( "input-product" );
        this.nameInput.type = "text";
        this.nameInput.value = this.getAttribute( "product" );
        this.container.insertBefore( this.nameInput, this.itemTitle );
        this.container.removeChild( this.itemTitle );
        
        //Edit Goods Amount
        this.amountInput = document.createElement( "input" );
        this.amountInput.classList.add( "goodsInput" );
        this.amountInput.classList.add( "input-product" );
        this.amountInput.type = "number";
        this.amountInput.value = this.getAttribute( "amount" );
        this.amountInput.step = "0.01";
        this.container.insertBefore( this.amountInput, this.amountGoods );
        this.container.removeChild( this.amountGoods );

        //Edit Price
        this.priceGoods = document.createElement( "input" );
        this.priceGoods.classList.add( "goods-price" );
        this.priceGoods.classList.add( "input-product" );
        this.priceGoods.type = "number";
        this.priceGoods.value = this.getAttribute( 'price' );
        this.container.insertBefore( this.priceGoods, this.price );
        this.container.removeChild( this.price );

        //Cancel Button
        this.cancelButton = document.createElement( 'button' );
        this.cancelButton.innerHTML = `
            <svg class="icon-close" width="34" height="35" viewBox="0 0 34 35" fill="none">
                <rect id="icon-close-back" x="0.299866" y="0.896484" width="33.2835" height="33.2835" rx="16.6418" fill="white"/>
                <path id="icon-close" d="M18.4695 17.5984L23.6637 12.4042C23.8388 12.1997 23.9303 11.9367 23.9199 11.6677C23.9095 11.3987 23.798 11.1436 23.6077 10.9532C23.4173 10.7629 23.1622 10.6514 22.8932 10.641C22.6242 10.6306 22.3612 10.7221 22.1568 10.8972L16.9625 16.038L11.7362 10.8117C11.5317 10.6366 11.2687 10.5451 10.9998 10.5555C10.7308 10.5659 10.4756 10.6774 10.2853 10.8677C10.0949 11.0581 9.98342 11.3132 9.97303 11.5822C9.96264 11.8512 10.0541 12.1142 10.2292 12.3187L15.4449 17.5984L10.3361 22.643C10.2242 22.7388 10.1334 22.8567 10.0692 22.9893C10.0051 23.1219 9.96901 23.2664 9.96332 23.4135C9.95764 23.5607 9.98244 23.7075 10.0362 23.8447C10.0899 23.9818 10.1714 24.1064 10.2756 24.2105C10.3797 24.3147 10.5043 24.3962 10.6414 24.4499C10.7786 24.5037 10.9254 24.5285 11.0726 24.5228C11.2197 24.5171 11.3642 24.481 11.4968 24.4169C11.6294 24.3527 11.7473 24.2619 11.8431 24.15L16.9411 19.0519L22.0071 24.1179C22.2116 24.293 22.4746 24.3845 22.7436 24.3741C23.0126 24.3637 23.2677 24.2522 23.4581 24.0619C23.6484 23.8715 23.7599 23.6164 23.7703 23.3474C23.7807 23.0784 23.6892 22.8154 23.5141 22.611L18.4695 17.5984Z" fill="#9D9D9D"/>
            </svg>
        `;
        this.cancelButton.onclick = () => { this.cancelEdit() };

        if(this.getAttribute("isnew") === "true"){
            this.cancelButton.onclick = () => {this.parentElement.removeChild(this)};
        };

        this.container.insertBefore( this.cancelButton, this.removeButton );
        this.container.removeChild( this.removeButton );

        //Save Button
        this.submitButton = document.createElement( "button" );
        this.submitButton.innerHTML = `
            <svg class="icon" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path id="icon-save-back" d="M6.66645 27.472C9.13319 29.1203 12.0333 30 15 30C18.9783 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9783 30 15C30 12.0333 29.1203 9.13319 27.472 6.66645C25.8238 4.19972 23.4811 2.27713 20.7403 1.14181C17.9994 0.00649929 14.9834 -0.290551 12.0737 0.288227C9.16394 0.867006 6.49119 2.29562 4.3934 4.3934C2.29562 6.49119 0.867006 9.16394 0.288227 12.0737C-0.290551 14.9834 0.00649929 17.9994 1.14181 20.7403C2.27713 23.4811 4.19972 25.8238 6.66645 27.472Z" fill="#2B583D"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8619 8.73629C21.5132 9.07517 21.7665 9.87788 21.4276 10.5292L15.616 21.6987C15.4181 22.0791 15.0488 22.3407 14.6242 22.4011C14.1997 22.4616 13.772 22.3136 13.4757 22.0036L7.5734 15.8281C7.06612 15.2973 7.08515 14.4558 7.61591 13.9485C8.14667 13.4412 8.98818 13.4603 9.49546 13.991L14.1146 18.824L19.069 9.302C19.4079 8.65069 20.2106 8.39741 20.8619 8.73629Z" fill="white"/>
            </svg>
        `;
        this.submitButton.onclick = () => { this.submitEdit() };

        if(this.getAttribute( "isnew" ) === "true"){
            this.submitButton.onclick = () => { this.submitNew() };
        }
            
        this.container.insertBefore( this.submitButton, this.editButton );
        this.container.removeChild( this.editButton );
    }

    cancelEdit(){
        this.container.style.backgroundColor = '';

        this.container.insertBefore( this.itemTitle, this.nameInput  );
        this.container.removeChild( this.nameInput );

        this.container.insertBefore( this.amountGoods, this.amountInput );
        this.container.removeChild( this.amountInput );

        this.container.insertBefore( this.price, this.priceGoods );
        this.container.removeChild( this.priceGoods );

        this.container.insertBefore( this.removeButton, this.cancelButton );
        this.container.removeChild( this.cancelButton );

        this.container.insertBefore( this.editButton, this.submitButton );
        this.container.removeChild( this.submitButton );
    }

    removeItem( item ){
        let id = item.getAttribute( "itemid" );

        fetch(`/vendors/items/${id}`, {method: "delete"})
            .then(response => response.json())
            .then((response)=>{
                if(typeof(response) === "string"){
                    controller.createToaster(response, "error");
                }else{
                    state.vendor.removeItem(id);
                }
            })
            .catch((err)=>{
                controller.createToaster('Something went wrong, please refresh the page.', 'error');
            });

    }

    submitEdit(){
        let data = {
            id: this.getAttribute( "itemid" ),
            name: this.nameInput.value,
            quantity: this.amountInput.value,
            unit: this.getAttribute( "unit" ),
            price: parseInt( this.priceGoods.value * 100 ),
        };

        fetch( "/vendors/items", {
            method: 'PUT',
            headers:{
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((response) => {
                if(typeof(response) === "string") {
                    controller.createToaster(response, "error");
                }else{

                    state.vendor.removeItem(response._id);
                    state.vendor.addItem(response);                  
                }
            })
            .catch((err) => {
                controller.createToaster('Something went wrong, please refresh the page.', "error");
            });
    }

    submitNew(){
        let data = {
            name: this.nameInput.value,
            quantity: this.amountInput.value,
            unit: 'kg',
            price: parseInt( this.priceGoods.value * 100 )
        };

        fetch( "/vendors/items", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        } )
            .then( response => response.json() )
            .then( (response) => {
                if(typeof(response) === "string"){
                    controller.createToaster(response, "error");
                }else{
                    state.vendor.addItem( response );
                }
            })
            .catch((err) => {
                controller.createToaster('Something went wrong, please refresh the page.', "error");
            });
    }
}

customElements.define('vendor-item', VendorItem);
customElements.define("home-button", HomeButton);