const Input = ({ label, value, onChange }) => (
    <div>
      {label}: <input value={value} onChange={onChange}></input>
    </div>
  )
export default Input