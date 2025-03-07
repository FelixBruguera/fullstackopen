import { useState } from 'react'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Statistic = ({title, total}) => <p>{title}: {total}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title="Unicafe feedback" />
      <Button text="Good" onClick={() => setGood(good + 1)}/>
      <Button text="Neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="Bad" onClick={() => setBad(bad + 1)}/>
      <Header title="Statistics" />
      <Statistic title="Good" total={good} />
      <Statistic title="Neutral" total={neutral} />
      <Statistic title="Bad" total={bad} />
    </div>
  )
}

export default App
