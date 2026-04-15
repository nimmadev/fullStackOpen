const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
const password = process.argv[2]
const dbUrl = `mongodb+srv://nimma8571_db_user:${password}@cluster0.0gknu0u.mongodb.net/?appName=Cluster0`
mongoose.connect(dbUrl, { family: 4 })
mongoose.set('strictQuery', false)
const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

function showAll() {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}

function addPerson() {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        name, number
    })
    console.log('phonebook:')
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })

}

if (process.argv.length === 3) {
    showAll()
}
else if (process.argv.length === 5) {
    addPerson()
}
else {
    console.log('usage node mango.js password => to show all entries\nnode mango.js password name number => to save person')
}