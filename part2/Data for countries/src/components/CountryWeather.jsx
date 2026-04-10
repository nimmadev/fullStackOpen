import axios from "axios"
import { useEffect, useState } from "react"

const CountryWeather = ({ country }) => {
    const [data, setData] = useState(null)
    const [lat, lon] = country?.latlng || []
    const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_80m,wind_direction_80m&models=icon_seamless&forecast_days=1`
    const getWeather = () => {
        axios
            .get(weatherApiUrl)
            .then(data => {
                setData(data.data)
                console.log(data.data)
            })
    }
    useEffect(getWeather, [])
    return data && (
        <div className="weather">
            <h1>Weather in {country.name.common}</h1>
            <p>temprature {data.hourly.temperature_80m[0]} °C</p>
            <p>wind  {data.hourly.wind_direction_80m[0]}°</p>
        </div>
    )
}
export default CountryWeather