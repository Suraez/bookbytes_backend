const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    },
    price: {
        type: Number,
        required: true
    },
    faculty:{
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('Book', BookSchema);