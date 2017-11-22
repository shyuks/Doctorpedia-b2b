const mongoose = require('mongoose')

const mongoURI = 'mongodb://127.0.0.1:27017/test'
mongoose.connect(mongoURI)

const db = mongoose.connection

db.on('connected', () => {
  console.log('Mongodb Connection Open')
})
db.on('error', console.error.bind(console, 'Connection Error'))

module.exports = db
