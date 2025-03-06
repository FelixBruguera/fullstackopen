const Total = (props) => {
  let total = props.exercises.reduce((prev, curr) => prev + curr, 0)
  return <p>Number of exercises {total}</p>
}

const Content = (props) => {
  return (
    <>
    {props.parts.map(
      (part) => <Part part={part.part} exercises={part.exercises} key={part.part}/>
    )}
  </>
  )
}

const Part = (props) => {
  return <p> {props.part} {props.exercises} </p>
}

const Header = (props) => {
  return <h1> {props.course} </h1>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[ {part: part1, exercises: exercises1}, {part: part2, exercises: exercises2}, {part: part3, exercises: exercises3}]} />
      <Total exercises={ [exercises1, exercises2, exercises3] } />
    </div>
  )
}

export default App
