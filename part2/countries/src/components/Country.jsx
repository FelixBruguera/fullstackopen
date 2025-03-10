import WeatherService from "../services/weather"
import { useState, useEffect } from 'react'

const Country = ({ data }) => {
    const [weather, setWeather] = useState(null)

    {useEffect(() => { 
        WeatherService.getWeather(data.capital).then(data => setWeather(data))
    }, [])}

    const icon_url = "https://openweathermap.org/img/wn/"
    const languages = Object.values(data.languages)
    return (
        <div>
            <h2>{data.name.common}</h2>
            <p>Capital: {data.capital}</p>
            <p>Area: {data.area}</p>
            <h2>Languages</h2>
            <ul>
                {languages.map((language) =>
                <li key={language}>{language}</li>)}
            </ul>
            <img src={data.flags.png} alt={data.flags.alt} style={{border: '1px solid lightgrey'}}/>
            { weather === null ? null :
                <>
                <h2>Weather in {data.capital}</h2>
                <p>Temperature: {weather.main.temp} Celsius</p>
                <img src={icon_url+`${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img>
                <p>Wind: {weather.wind.speed} m/s</p>
                </>
            }
        </div>
    )
}

export default Country