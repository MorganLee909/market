const Vendor = require("./Vendor");

class Market{
    constructor( id, name, owner, vendors, address, description ){
        this._id = id;
        this._name = name;
        this._owner = new Vendor( 
            owner._id, 
            owner.name, 
            owner.email,
            owner.description,
            []
        );
        this._vendors = [];
        this._address = address;
        this._description = description;

        for( let i = 0; i < vendors.length; i++){
            let vendor = new Vendor(        
                vendors[i]._id,
                vendors[i].name, 
                vendors[i].email,
                vendors[i].description,
                vendors[i].items,
                vendors[i].ownerName,
                vendors[i].address,
                vendors[i].telephone
            );
            this._vendors.push( vendor );
        }
    }
}

module.exports = Market;