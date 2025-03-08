const Course = ({ course }) => {

    const Total = ({ parts }) => {
        let total = parts.reduce((prev, curr) => prev + curr.exercises, 0)
        return <b>Number of exercises: {total}</b>
    }
      
    const Content = ({ parts }) => {
        return (
          <>
          {parts.map(
            (part) => <Part name={part.name} exercises={part.exercises} key={part.name}/>
          )}
        </>
        )
    }
      
    const Part = ({ name, exercises }) => <p> {name} {exercises} </p>
      
    const Header = ({ name }) => <h2> {name} </h2>

    return (
    <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
    )
}


export default Course