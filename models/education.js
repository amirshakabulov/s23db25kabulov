const mongoose = require("mongoose")
const educationSchema = mongoose.Schema({
        Level: String,
        Type: String,
        Cost: Number
})
module.exports = mongoose.model("Education", educationSchema)

