var mongoose = require('mongoose')

var emailSchema = mongoose.Schema({
    emailId: {
        type: String,
        unique: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Email', emailSchema);
