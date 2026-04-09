const Persons = ({ setPersons, filterPersons, deletePerson, setNewMesage }) => {
    const onDelete = (person) => {
        const result = confirm(`delete ${person.name}`)
        if (result) {
            console.log(person)
            deletePerson(person.id)
                .then(data => {
                    setPersons((persons) => persons.filter(p => p.id !== data.id))
                    setNewMesage(`Information deleted for ${person.name}`, true)
                });
        }
    }
    return <div>
        {filterPersons.map((person) => {
            return <div key={person.id} style={{ display: 'flex', alignItems: 'center' }}>
                <p >{person.name} {person.number}</p>
                <button onClick={() => onDelete(person)}>delete </button>
            </div>
        })}
    </div>
}

export default Persons