const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema(
 {
    userId: String,
    Address: String,
    City: String,
    Phone: String,
    Pincode: String,
    Notes: String

},{
    timestamps: true
})

const Address = mongoose.model("Address",AddressSchema)
module.exports = Address