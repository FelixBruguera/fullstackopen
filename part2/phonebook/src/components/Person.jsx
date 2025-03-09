const Person = ({ id, name, number, onClick}) => 
    <li>{name} {number} <button onClick={() => onClick(id)}>Delete</button></li>

export default Person