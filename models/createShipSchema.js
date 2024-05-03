const mongoose = require ('mongoose')

const createShipSchema = mongoose.Schema({
    name:String,
    orderNumber:String,
    gate:String,
    shipmentNo:String,
    shipmentType:String,
    time:String,
    from:String,
    to:String,
    departure:String,
    ticketId: String,
    client:String

}, { timestamps: true })

const Ship = mongoose.model('Ship', createShipSchema)

module.exports = Ship;