import { useState, useEffect } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import Persons from './components/Persons'
import PersonService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    PersonService.getAll()
    .then((response) => setPersons(response))
    } ,[])

  const handleNameInput = (e) => setNewName(e.target.value)
  const handleNumberInput = (e) => setNewNumber(e.target.value)
  const handleSearchInput = (e) => setSearchValue(e.target.value)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const check = checkName()
    if (check) { return updateNumber(check) }
    const newPerson = {name: newName, number: newNumber}
    PersonService.add(newPerson)
    .then((response) => setPersons(persons.concat(response)))
    setNewName('')
    setNewNumber('')
  }

  const updateNumber = (person) => {
    let confirmation = window.confirm(`${newName} is already added to the phonebook, do you want to update their number?`)
    if (confirmation) {
      const newPerson = {...person, number: newNumber}
      PersonService.update(person.id, newPerson)
      .then(setPersons(persons.map((person) => person.id === newPerson.id ? newPerson : person)))
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = (id) => {
    let confirmation = window.confirm("Are you sure?")
    if (confirmation) {
      PersonService.deletePerson(id)
      .then((response) => setPersons(persons.filter((person) => person.id != response.id)))
    }
  }

  const checkName = () => persons.find((person) => person.name === newName)

  const inputs = [{label: "Name", value: newName, onChange: handleNameInput}, 
    {label: "Number", value: newNumber, onChange: handleNumberInput}]

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={searchValue} onChange={handleSearchInput} />
      <h3>Add new</h3>
      <Form onSubmit={handleFormSubmit} inputs={inputs} />
      <h3>Numbers</h3>
      <Persons persons={persons} searchValue={searchValue} onClick={deletePerson}/>
    </div>
  )
}

export default App
