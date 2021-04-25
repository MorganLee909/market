class VSearchResults extends HTMLElement{

    static get observedAttributes(){
        return ["vendor", "address"];
    }
    
    constructor(){
        super();
        this.shadow = this.attachShadow({ mode:"open" });

        // Apply external styles to the shadow dom
        const linkElem = document.createElement( 'link' );
        linkElem.setAttribute( 'rel', 'stylesheet' );
        linkElem.setAttribute( 'href', 'index.css' );
        this.shadow.appendChild( linkElem );

        this.container = document.createElement('div');
        this.container.classList.add("search-results-item");
        
        //location
        this.container.innerHTML = `
            <div class="location-icon"> 
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path d="M9.11755 8.54808C10.3764 8.54808 11.397 7.52755 11.397 6.26867C11.397 5.00979 10.3764 3.98926 9.11755 3.98926C7.85866 3.98926 6.83813 5.00979 6.83813 6.26867C6.83813 7.52755 7.85866 8.54808 9.11755 8.54808Z" stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.6764 8.54774C11.9668 12.5367 9.11756 17.0955 9.11756 17.0955C9.11756 17.0955 6.26829 12.5367 4.55873 8.54774C2.84917 4.55877 5.69844 1.13965 9.11756 1.13965C12.5367 1.13965 15.3859 4.55877 13.6764 8.54774Z" stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p> 0.2 km </p>
            </div>
            <div class="titlePlusAddress">
                <p class="search-results-item-title"></p>
                <p class="search-vendor-address"></p>
            </div>
        `;
        // this.container.innerHTML = `
        //     <div class="titlePlusAddress">
        //         <p class="search-results-item-title"></p>
        //         <p class="search-vendor-address"></p>
        //     </div>
        // `;

        this.shadow.appendChild( this.container );

        //icon-accordion
        this.accordion = document.createElement("button");
        this.accordion.classList.add("accordion-button");

        this.accordion.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9.31002 6.70978C9.21732 6.80229 9.14377 6.91218 9.09359 7.03315C9.04341 7.15413 9.01758 7.28381 9.01758 7.41478C9.01758 7.54575 9.04341 7.67543 9.09359 7.7964C9.14377 7.91738 9.21732 8.02726 9.31002 8.11978L13.19 11.9998L9.31002 15.8798C9.12304 16.0668 9.018 16.3204 9.018 16.5848C9.018 16.8492 9.12304 17.1028 9.31002 17.2898C9.497 17.4768 9.7506 17.5818 10.015 17.5818C10.2794 17.5818 10.533 17.4768 10.72 17.2898L15.31 12.6998C15.4027 12.6073 15.4763 12.4974 15.5265 12.3764C15.5766 12.2554 15.6025 12.1257 15.6025 11.9948C15.6025 11.8638 15.5766 11.7341 15.5265 11.6132C15.4763 11.4922 15.4027 11.3823 15.31 11.2898L10.72 6.69978C10.34 6.31978 9.70002 6.31978 9.31002 6.70978Z" fill="#BDBDBD"/>
            </svg>
        `;

        this.onclick = () => { 
            if( state.vendor !== null && this.vendor.id === state.vendor.id ){
                controller.openPage("vendorInfoPage", this.vendor); 
            }else{
                controller.openPage("vendorAboutPage", this.vendor); 
            };
        };

        this.container.appendChild( this.accordion );
    }
    
    attributeChangedCallback( name, oldValue, newValue){
        switch( name ){
            
            case "vendor":
                // console.log(this.container.childNodes);
                this.container.childNodes[3].firstElementChild.innerText = newValue;
                break;

            case "address":
                this.container.childNodes[3].lastElementChild.innerText = newValue;
                break;

        }
    }

} 

customElements.define('search-item', VSearchResults);