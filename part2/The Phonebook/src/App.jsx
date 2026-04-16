import { useEffect, useState } from 'react'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Person'
import personService from './services/persons'
import Notification from '../components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({ message: null, success: true })

  const setNewMesage = (message, success) => {
    setMessage({ message, success })
    setTimeout(() => setMessage({ message: null, success: true }), 3000)

  }
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
          .then(data => {
            setPersons(persons.map(p => p.id === data.id ? data : p))
            setNewMesage(`updated number for ${exists.name}`, true)
          })
          .catch(error => setNewMesage(error.response?.data?.error || `Information for ${exists.name} has already been removed from server `, false))
      }
      setNewName('')
      setNewNumber('')
      return
    }
    personService
      .creratePerson({ name: newName, number: newNumber })
      .then(data => {
        setPersons(persons.concat([data]))
        setNewMesage(`created number for ${newName}`, true)
      })
      .catch(error => {
        console.log(error.response?.data?.error)
        setNewMesage(error.response?.data?.error || 'something went wrong', false)
      })

    setNewName('')
    setNewNumber('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification Message={message.message} Success={message.success} />

      <Filter setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm onAdd={onAdd} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons setPersons={setPersons} filter={filter} persons={persons} deletePerson={personService.deletePerson} setNewMesage={setNewMesage} />
    </div>
  )
}

export default App