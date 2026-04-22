require('dotenv').config()
const mongoose = require('mongoose')

const dbUrl = process.env.TEST_MONGODB_URI
mongoose.connect(dbUrl, { family: 4 })
mongoose.set('strictQuery', false)
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  important: Boolean,
})
const Note = mongoose.model('Note', noteSchema)

function showAll() {
  Note.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

function addNote() {
  const content = process.argv[2]
  const important = process.argv[3]
  const person = new Note({
    content, important
  })
  console.log('phonebook:')
  person.save().then(() => {
    console.log(`added ${content} important ${important} to phonebook`)
    mongoose.connection.close()
  })

}

if (process.argv.length === 2) {
  showAll()
}
else if (process.argv.length === 4) {
  addNote()
}
else {
  console.log('usage node mango.js password => to show all entries\nnode mango.js password name number => to save person')
}