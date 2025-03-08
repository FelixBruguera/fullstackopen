import Person from "./Person"

const Persons = ({ persons, searchValue }) => {
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(searchValue.toLowerCase()))
    return (
        <ul>
            {filteredPersons.map((person) => <Person key={person.id} name={person.name} number={person.number}/> )}
        </ul>
    )
} 

export default Persons