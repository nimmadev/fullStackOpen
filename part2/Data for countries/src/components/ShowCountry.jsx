import axios from 'axios'
import { useEffect, useState } from 'react'
import Languages from './Languages'

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
    // const [lat, lon] = country?.latlng || []
    // const weatherKey = import.meta.env.VITE_SOME_KEY
    // const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${weatherKey}`
    // console.log(weatherApiUrl)
    return country && (
        <div>
            <CountryName country={country} />
            <Languages languages={country.languages} />

            <div className="flag">
                <img src={country.flags.png} alt="flag" />
            </div>
        </div>
    )
}

export default ShowCountry