const Button = ({
  style,
  type,
  onClick,
  label,
  title,
  className,
  children,
}) => {
  return (
    <button
      className={`py-2 px-2 lg:px-4 text-sm lg:text-sm w-full min-w-20 m-auto
                    hover:bg-accent hover:text-white hover:cursor-pointer transition-colors rounded-xl border-1 border-border text-text-primary
            ${style === 'light' ? 'bg-transparent' : 'bg-accent hover:bg-black!'} ${className}`}
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
