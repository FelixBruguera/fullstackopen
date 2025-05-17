import { useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <label htmlFor="filter">Filter:</label>
            <input type="text" name="filter" id="filter" onChange={ (e) => dispatch(changeFilter(e.target.value)) }/>
        </div>
    )
}

export default Filter