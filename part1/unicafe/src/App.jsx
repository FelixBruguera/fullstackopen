import { useState } from 'react'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Statistic = ({title, value}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  )}

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral

  const average = (good+(bad*-1)) / total

  const positivePercentage = ((good/total) * 100) + "%"

  if (total == 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <Statistic title="Good" value={good} />
        <Statistic title="Neutral" value={neutral} />
        <Statistic title="Bad" value={bad} />
        <Statistic title="Total feedback" value={total} />
        <Statistic title="Average feedback" value={average} />
        <Statistic title="Percentage of positive feedback" value={positivePercentage} />
      </tbody>
    </table>
  )

}

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
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
