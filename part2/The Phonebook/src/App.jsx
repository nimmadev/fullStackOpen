import { useEffect, useState } from 'react'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Person'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data))
  }, [])
  const onAdd = (e) => {
    e.preventDefault()
    console.log(newName)
    console.log(persons)
    const exists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (exists) {
      const result = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        personService.updatePerson({ ...exists, name: newName, number: newNumber })
          .then(data => setPersons(persons.map(p => p.id === data.id ? data : p)))
      }
      setNewName('')
      setNewNumber('')
      return
    }
    personService
      .creratePerson({ name: newName, number: newNumber })
      .then(data => setPersons(persons.concat([data])))

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
      <Persons setPersons={setPersons} filterPersons={filterPersons} deletePerson={personService.deletePerson} />
    </div>
  )
}

export default App