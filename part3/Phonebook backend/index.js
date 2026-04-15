require('dotenv').config()
const express = require('express')
// const data = require('./data')
const Person = require('./models/person')
var morgan = require('morgan')
const cors = require('cors')

morgan.token('body', (req) => req.body ? JSON.stringify(req.body) : '')
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body')
const app = express()
app.use(cors())

app.use(express.static('dist'))
// let persons = data
app.use(express.json())

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// app.use(requestLogger)
app.use(logger)
// get person
app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => res.json(result))
})

// get single person
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id)
        .then(result => {
            if (result) {
                res.json(result)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            next(error)
        })
})

// update a person
app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body
    if (!name || !number) return res.status(400).json({ error: 'name or number is missing' })
    Person.findById(req.params.id).then(person => {
        if (!person) {
            res.status(400).end()
        }
        else {
            person.name = name
            person.number = number
            return person.save().then(result => res.json(result))
        }
    }).catch(error => next(error))
})

// delete a person
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findByIdAndDelete(id).then(result => res.status(204).end())
})

// create a person
const randomIdGenrator = () => Math.floor(Math.random() * 1000000000)
app.post('/api/persons', (req, res) => {
    const body = req.body
    const data = {}
    // check if both name and number is present
    if (!body.name || !body.number) return res.status(400).json({ error: 'name or number not persent' })

    // check name is unique
    Person.findOne({ name: new RegExp(`^${body.name}$`, 'i') })
        .then(result => {
            if (result) {
                res.status(400).json({ error: 'name must be unique' })
            } else {
                data.name = body.name
                data.number = body.number
                const person = new Person(data)
                person.save().then(result => res.json(result))
            }
        })



    // make safe boject for db
    // data.id = String(randomIdGenrator())


})
app.get('/info', (req, res) => {
    Person.find({}).then(result => res.send(`<p>Phonebook has info for ${result.length} people</p>
                    <p>${Date()}</p>`))

})
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

// const PORT = process.env.PORT || 3001
const PORT = process.env.PORT
console.log('app is runnig')
app.listen(PORT)