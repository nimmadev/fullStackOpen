const Languages = ({ languages }) => {
    return <div className="languages">
        <h1>Langauges</h1>
        <ul>
            {Object.entries(languages).map(([key, value]) => <li key={key}>{value}</li>)}
        </ul>
    </div>
}

export default Languages