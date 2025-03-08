import { useState } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const handleNameInput = (e) => setNewName(e.target.value)
  const handleNumberInput = (e) => setNewNumber(e.target.value)
  const handleSearchInput = (e) => setSearchValue(e.target.value)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (checkName()) { return alert(`${newName} is already added to the phonebook`) }
    setPersons(persons.concat( {id: persons.length+ 1, name: newName, number: newNumber} ))
    setNewName('')
    setNewNumber('')
  }

  const checkName = () => persons.some((person) => person.name === newName)

  const inputs = [{label: "Name", value: newName, onChange: handleNameInput}, 
    {label: "Number", value: newNumber, onChange: handleNumberInput}]

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={searchValue} onChange={handleSearchInput} />
      <h3>Add new</h3>
      <Form onSubmit={handleFormSubmit} inputs={inputs} />
      <h3>Numbers</h3>
      <Persons persons={persons} searchValue={searchValue} />
    </div>
  )
}

export default App
