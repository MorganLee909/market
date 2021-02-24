class Item {
    constructor( id, name, quantity, unit, price ){
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._unit = unit;
        this._price = price;
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get quantity(){
        return this._quantity;
    }

    get unit(){
        return this._unit;
    }

    get price(){
        return parseFloat((this._price / 100).toFixed(2));
    }

}

module.exports = Item;