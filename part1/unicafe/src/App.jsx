import { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100
  if (total === 0) return <p>No feedback given</p>
  return <table>
    <tbody>
      <StatisticLine text={'good'} value={good} />
      <StatisticLine text={'neutral'} value={neutral} />
      <StatisticLine text={'bad'} value={bad} />
      <StatisticLine text={'all'} value={total} />
      <StatisticLine text={'average'} value={average} />
      <StatisticLine text={'positive'} value={positive + ' %'} />
    </tbody>

  </table>
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const onGoodFeedback = () => setGood(good + 1)
  const onNeutralFeedback = () => setNeutral(neutral + 1)
  const onBadFeedback = () => setBad(bad + 1)

  return (
    <div>
      <Heading text={'give feedback'} />
      <Button text={'good'} onClick={onGoodFeedback} />
      <Button text={'neutral'} onClick={onNeutralFeedback} />
      <Button text={'bad'} onClick={onBadFeedback} />
      <Heading text={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App