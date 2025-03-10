const Result = ({ label, onClick }) => {
    return <li>{label} <button onClick={() => onClick(label)}>Show</button></li>
}

export default Result