import { useEffect, useState } from "react"
import ShowCountry from "./ShowCountry"

const FilterCountries = ({ filterCountries }) => {
    const [show, setShow] = useState(null)
    useEffect(() => setShow(null), [filterCountries])
    if (filterCountries.length > 10) return <p>too many countries, specify another filter.</p>
    if (filterCountries.length === 1) return <ShowCountry name={filterCountries[0]} />
    if (show) return < ShowCountry name={show} />
    return (
        <div className="contries">
            {filterCountries.map(con => {
                return <p key={con}>{con} <button onClick={() => setShow(con)}>show</button></p>
            })}
        </div>
    )
}

export default FilterCountries