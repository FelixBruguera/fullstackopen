const List = (props) => {
  return (
    <ul
      aria-label={props.label}
      className="py-3 lg:py-6 flex list-none gap-5 flex-wrap justify-center lg:justify-start"
    >
      {props.children}
    </ul>
  )
}

export default List
