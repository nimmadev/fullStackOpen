const PersonForm = ({ onAdd, newNumber, setNewNumber, newName, setNewName }) => {
    return <form onSubmit={onAdd}>
        <div>
            name: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>

        <div>
            <button type="submit" >add</button>
        </div>
    </form>
}
export default PersonForm