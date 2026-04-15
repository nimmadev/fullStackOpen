const mongoose = require('mongoose')

const dbUrl = process.env.MONGODB_URI

mongoose.connect(dbUrl, { family: 4 })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })
mongoose.set('strictQuery', false)

const personSchema = mongoose.Schema({
    name: String,
    number: String
})
mongoose.set('toJSON', {
    transform: (document, returnOb) => {
        returnOb.id = returnOb._id.toString()
        delete returnOb.__v
        delete returnOb._id
    }
})

module.exports = mongoose.model('Person', personSchema)