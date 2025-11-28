const Input = ({ id, type = 'text', name, placeholder, labelText, inputClass }) => {
  return (
    <div
      className={`w-full ${labelText ? 'w-full flex flex-col items-center gap-1' : null}`}
    >
      <label htmlFor={id} className="inline text-text-secondary w-full lg:w-3/4">
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`border-1 border-slate-700 rounded-lg text-text-primary h-8 px-1 ${labelText ? 'w-full lg:w-3/4' : 'w-full'} ${inputClass}`}
      ></input>
    </div>
  )
}

export default Input
