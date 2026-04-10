import axios from 'axios'
import { useEffect, useState } from 'react'
import Languages from './Languages'
import CountryWeather from './CountryWeather'

const CountryName = ({ country }) => {
    return <div className="country">
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
    </div>
}
const ShowCountry = ({ name }) => {
    const [country, setCountry] = useState(null)
    const fetchCountry = () => {
        const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        axios
            .get(url)
            .then(data => {
                console.log(data.data)
                setCountry(data.data)
            })

    }
    useEffect(() => fetchCountry(name), [])

    return country && (
        <div>
            <CountryName country={country} />
            <Languages languages={country.languages} />

            <div className="flag">
                <img src={country.flags.png} alt="flag" />
            </div>
            <CountryWeather country={country} />
        </div>
    )
}

export default ShowCountry