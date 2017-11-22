var mongoose = require('mongoose')
var Email = require('./schema/email.js')
var exampleData = require('./exampleData.json')

mongoose.connect('mongodb://127.0.0.1:27017/test', function() {

    Email.remove({}, function(error) {
        if (error) {
            return error
        }
    })

    Email.collection.insertMany(exampleData, function(error, result) {
        if (error) {
            return error
        }
        mongoose.connection.close()
    })

})
