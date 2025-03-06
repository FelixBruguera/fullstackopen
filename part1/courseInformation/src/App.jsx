const Total = (props) => {
  let total = props.parts.reduce((prev, curr) => prev + curr.exercises, 0)
  return <p>Number of exercises {total}</p>
}

const Content = (props) => {
  return (
    <>
    {props.parts.map(
      (part) => <Part name={part.name} exercises={part.exercises} key={part.name}/>
    )}
  </>
  )
}

const Part = (props) => {
  return <p> {props.name} {props.exercises} </p>
}

const Header = (props) => {
  return <h1> {props.course} </h1>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
      name: 'Using props to pass data',
      exercises: 7
      },
      {
      name: 'State of a component',
      exercises: 14
      }
    ] 
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
