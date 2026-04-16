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
    name: {
        type: String,
        minLength: 3
    },
    number: {
        type: String,
        minLength: 8,
        validate: {

            validator: function (value) {
                return /\d{2,3}-\d+/gm.test(value);
            },
            message: 'number format xx-xxxxxx'
        }
    }
})
mongoose.set('toJSON', {
    transform: (document, returnOb) => {
        returnOb.id = returnOb._id.toString()
        delete returnOb.__v
        delete returnOb._id
    }
})

module.exports = mongoose.model('Person', personSchema)