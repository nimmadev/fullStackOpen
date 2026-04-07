import { useState } from 'react'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const onAdd = (e) => {
    e.preventDefault()
    const exists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (exists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat([{ name: newName, number: newNumber, id: persons.length + 1 }]))
    setNewName('')
    setNewNumber('')
  }
  const filterPersons = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm onAdd={onAdd} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} />
    </div>
  )
}

export default App