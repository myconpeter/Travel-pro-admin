const mongoose = require ('mongoose')

const createPlaneSchema = mongoose.Schema({
    name:String,
    seat:String,
    gate:String,
    flightN0:String,
    planeClass:String,
    time:String,
    from:String,
    to:String,
    departure:String,
    ticketId: String,
    client:String

}, { timestamps: true })

const Plane = mongoose.model('Plane', createPlaneSchema)

module.exports = Plane;