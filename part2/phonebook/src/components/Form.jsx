import Input from "./Input"

const Form = ({ inputs, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            {inputs.map(input => <Input key={input.label} label={input.label} value={input.value} onChange={input.onChange}/>)}
            <button type="submit">add</button>
        </form>
    )
}

export default Form