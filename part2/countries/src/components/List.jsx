import Result from "./Result"
import Country from "./Country"

const List = ({ results, onClick}) => {
    if (results.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    if (results.length === 1) {
        return <Country data={results[0]}/>
    }
    return results.map((result) => <Result key={result.name.common} label={result.name.common} onClick={onClick}/> )
}

export default List