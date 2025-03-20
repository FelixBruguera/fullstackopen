import Person from "./Person"

const Persons = ({ persons, searchValue, onClick}) => {
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(searchValue.toLowerCase()))
    return (
        <ul>
            {filteredPersons.map((person) => 
            <Person key={person.id} id={person.id} name={person.name} number={person.number} onClick={onClick}/> 
            )}
        </ul>
    )
} 

export default Persons