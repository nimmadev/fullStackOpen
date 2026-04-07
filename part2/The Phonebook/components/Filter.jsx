const Filter = ({ setFilter }) => {
    return <div>filter shown with <input type="text" onChange={event => setFilter(event.target.value)} /></div>
}

export default Filter