class Market{
    constructor( id, name, owner, vendors, address, description ){
        this._id = id;
        this._name = name;
        this._owner = new Vendor( 
            owner._id, 
            owner._name, 
            owner._email,
            owner._description,
            []
        );
        this._vendors = [];
        this._address = address;
        this._description = description;

        for( let i = 0; i < vendors.length; i++){
            let vendor = new Vendor(        
                vendors[i]._id,
                vendors[i]._name, 
                vendors[i]._email,
                vendors[i]._description,
                vendors[i]._items
            );
            this._vendors.push( vendor );
        }
    }
}

module.exports = Market;