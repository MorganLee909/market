class Item {
    constructor( id, name, quantity, unit ){
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._unit = unit;
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

}

module.exports = Item;