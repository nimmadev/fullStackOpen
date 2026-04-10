const SearchFilter = ({ filter, setFilter }) => {
    return (
        <div>
            filter countries <input value={filter} onChange={e => setFilter(e.target.value)} />
        </div>
    )
}

export default SearchFilter