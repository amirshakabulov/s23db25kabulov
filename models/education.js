const mongoose = require("mongoose")
const educationSchema = mongoose.Schema({
        Level: {
                type: String,
                enum:["High School", "University", "Grad School" ]
        },
        Type: String,
        Cost: {
                type: Number,
                min: 1,
                max: 1000000
        }
})
module.exports = mongoose.model("Education", educationSchema)

