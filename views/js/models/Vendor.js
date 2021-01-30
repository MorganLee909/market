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