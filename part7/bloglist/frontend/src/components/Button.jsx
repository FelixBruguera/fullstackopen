const Button = ({
  style,
  type,
  onClick,
  label,
  title,
  width = 'full',
  margin = 'auto',
  children,
}) => {
  return (
    <button
      className={`py-2 px-2 lg:px-4 text-sm lg:text-base rounded-2xl shadow-sm ${width} min-w-20 m-${margin}
                    hover:bg-black hover:text-white hover:cursor-pointer transition-all
            ${style === 'light' ? 'bg-gray-200' : 'bg-blue-900 text-white'}`}
      type={type || 'button'}
      aria-label={label}
      title={title}
      onClick={() => (onClick ? onClick() : null)}
    >
      {children}
    </button>
  )
}

export default Button
