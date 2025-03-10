import { useState, useEffect } from 'react'
import Input from './components/Input'
import List from "./components/List"
import axios from 'axios'

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [displayedCountries, setDisplayedCountries] = useState([])


  useEffect(() => {
    console.log("get countries")
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => setCountries(response.data))
  }, [])

  const updateCountries = (query) => 
    setDisplayedCountries(countries.filter((country) => country.name.common.toLowerCase().includes(query.toLowerCase())))

  const handleInput = (input) => {
    setSearchValue(input)
    updateCountries(input)}

  return (
    <>
    {console.log("render")}
      <Input label="Search countries" value={searchValue} onChange={(e) => handleInput(e.target.value)} />
      <List results={displayedCountries} onClick={handleInput}/>
    </>
  )
}

export default App
