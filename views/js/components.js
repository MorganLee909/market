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