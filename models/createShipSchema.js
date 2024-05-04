const mongoose = require ('mongoose')

const createShipSchema = mongoose.Schema({
    name:String,
    orderNumber:String,
    gate:String,
    shipmentNo:String,
    shipmentType:String,
    time:String,
    from:String,
    currentLocation:String,
    to:String,
    departure:String,
    ticketId: String,
    client:String,
    item1:String,
    item2:String,
    item3:String,
    item4:String,
    item5:String,
    item6:String,
    item7:String,
    item8:String,
    item9:String,
    item10:String,

}, { timestamps: true })

const Ship = mongoose.model('Ship', createShipSchema)

module.exports = Ship;