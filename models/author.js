const mongoose = require('mongoose')

// Define the properties of the model
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('author', authorSchema)