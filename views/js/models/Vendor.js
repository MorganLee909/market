const Item = require("./Item.js");
const vendorInfoPage = require("../pages/vendorInfo.js");

class Vendor {
    constructor( id, name, email, description, items ){
        this._id = id;
        this._name = name;
        this._email = email;
        this._description = description;
        this._items = [];

        for( let i = 0; i < items.length; i++ ){
            let item = new Item ( 
               items[i]._id, 
               items[i].name, 
               items[i].quantity, 
               items[i].unit,
               items[i].price  
            );
            this._items.push( item );
        }

        this._items.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

    get name(){
        return this._name;
    }

    get items(){
        return this._items;
    }

    addItem( item ){
        let newItem = new Item(
            item._id,
            item.name,
            item.quantity,
            item.unit,
            item.price
        );

        this._items.push( newItem );
        this._items.sort((a, b) => (a.name > b.name) ? 1 : -1);

        vendorInfoPage.displayItems();
    }

    removeItem( id ){
       
        for(let i = 0; i < this._items.length; i++){
            if(this._items[i].id === id){
                this._items.splice( i, 1 );
                break
            }
        }

        vendorInfoPage.displayItems();

    }

}

module.exports = Vendor;