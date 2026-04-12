const express = require('express')
const data = require('./data')
var morgan = require('morgan')

morgan.token('body', (req) => req.body ? JSON.stringify(req.body) : '' )
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body')
const app = express()

let persons = data
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
    res.json(persons)
})

// get single person
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (person){
        res.json(person)
    }
    else{
        res.status(404).json({error: 'person not found for id '+id})
    }
})

// delete a person
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

// create a person
const randomIdGenrator = () => Math.floor(Math.random() * 1000000000)
app.post('/api/persons', (req, res) => {
    const body = req.body
    const data = {}
    // check if both name and number is present
    if (!body.name || !body.number) return res.status(400).json({error: 'name or number not persent'})
    
    // check name is unique
    if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) return res.status(400).json({error: 'name must be unique'})

    // make safe boject for db
    data.id = String(randomIdGenrator())
    data.name = body.name
    data.number = body.number
    persons = persons.concat(data)
    res.json(data)

})
app.get('/info', (req, res) => {
    const html = `<p>Phonebook has info for ${persons.length} people</p>
                    <p>${Date()}</p>`
    res.send(html)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
console.log('app is runnig')
app.listen(3001)