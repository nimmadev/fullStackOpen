const Persons = ({ setPersons, persons, deletePerson, filter, setNewMesage }) => {
    const filterPersons = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons
    console.log('filter', filterPersons)
    const onDelete = (person) => {
        const result = confirm(`delete ${person.name}`)
        if (result) {
            console.log(person)
            deletePerson(person.id)
                .then(data => {
                    setPersons(prev => prev.filter(p => p.id !== person.id))
                    setNewMesage(`Information deleted for ${person.name}`, true)
                });
        }
    }
    return <div>
        {filterPersons && filterPersons.map((person) => {
            return <div key={person.id} style={{ display: 'flex', alignItems: 'center' }}>
                <p >{person.name} {person.number}</p>
                <button onClick={() => onDelete(person)}>delete </button>
            </div>
        })}
    </div>
}

export default Persons