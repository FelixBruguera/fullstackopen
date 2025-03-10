import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const base_url = "http://api.openweathermap.org/"
const geo_url = base_url + '/geo/1.0/direct?'
const weather_url = base_url + '/data/2.5/weather?'

const getCoords = (query) => 
    axios.get(geo_url + `q=${query}&appid=${api_key}`)
    .then(response => response.data[0])

const getWeather = (query) =>
    getCoords(query)
    .then(data => axios.get(weather_url + `lat=${data.lat}&lon=${data.lon}&units=metric&appid=${api_key}`)
    .then(response => response.data))

export default {getWeather}