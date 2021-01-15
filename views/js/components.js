class homeButton extends HTMLElement{
    static get observedAttributes(){
        return ["change", "other", "something", "gofuckyourself"];
    }

    constructor(){
        super();
        this._shadow = this.attachShadow({mode: "open"});

        let button = document.createElement("button");
        button.addEventListener('click', () => {controller.openPage( 'landingPage' )});

        let button2 = `
            <button class="shadowButton>
                <svg some="properties></svg>
            </button>

            <div class="buttonBottomBorder"></div>
        `;
        
        this._shadow.appendChild(button2);
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

customElements.define("home-button", homeButton);