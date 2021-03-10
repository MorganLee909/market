const Item = require("./Item.js");
const vendorInfoPage = require("../pages/vendorInfo.js");

class Vendor {
    constructor( id, name, email, description, items, ownerName, address, sharesOwnerName, sharesAddress ){
        this._id = id;
        this._name = name;
        this._email = email;
        this._ownerName = ownerName;
        this._description = description;
        this._items = [];
        this._address = address;
        this._sharesOwnerName = sharesOwnerName;
        this._sharesAddress = sharesAddress;

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

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get email(){
        return this._email;
    }

    get ownerName(){
        return this._ownerName;
    }

    get description(){
        return this._description;
    }

    get address(){
        return this._address;
    }

    get items(){
        return this._items;
    }

    get sharesOwnerName(){
        return this._sharesOwnerName
    }

    get sharesAddress(){
        return this._sharesAddress;
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