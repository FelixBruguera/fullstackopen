const Input = ({ id, type = 'text', name, placeholder, labelText }) => {
  return (
    <div
      className={`w-full ${labelText ? 'w-full flex flex-col items-center' : null}`}
    >
      <label htmlFor={id} className="inline text-gray-800 w-full lg:w-3/4">
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`border-1 border-gray-400 rounded-lg h-8 px-1 ${labelText ? 'w-full lg:w-3/4' : 'w-full'}`}
      ></input>
    </div>
  )
}

export default Input
