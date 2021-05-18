const Item = require("./Item.js");
const vendorInfoPage = require("../pages/vendorInfo.js");
const Market = require("../models/Market.js");

class Vendor {
    constructor( id, name, email, description, items, ownerName, address, phone, distance, markets ){
        this._id = id;
        this._name = name;
        this._email = email;
        this._ownerName = (ownerName === undefined) ? "" : ownerName;
        this._description = (description === undefined) ? "" : description;
        this._items = [];
        this._address = (address === undefined) ? "" : address;
        this._phone = (phone === undefined) ? "" : phone;
        this._distance = distance;
        this._markets = markets;

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

    get phone(){
        return this._phone;
    }

    get items(){
        return this._items;
    }

    get distance(){
        return this._distance;
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

    addMarket( market ){
        console.log(market, market._id,
            market.name,
            market.owner,
            market.vendors,
            market.address,
            market.description, 'market');

        let newMarket = new Market(
            market._id,
            market.name,
            market.owner,
            market.vendors,
            market.address,
            market.description
        );

        this._markets.push( newMarket );

        vendorInfoPage.displayItems();
    }

}

module.exports = Vendor;