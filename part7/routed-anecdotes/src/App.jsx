import { useState } from 'react'
import { Routes, Route, useMatch } from "react-router";
import About from './components/About';
import AnecdoteList from "./components/AnecdoteList"
import CreateNew from './components/CreateNew';
import Anecdote from "./components/Anecdote"
import Notification from "./components/Notification"
import Menu from "./components/Menu"
import Footer from './components/Footer';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecdote => anecdote.id === parseInt(match.params.id)) : null
  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`new anecdote ${anecdote.content} added!`)
    setTimeout(() => setNotification(null), 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification ? <Notification notification={notification}/> : null}
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}/>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/create' element={<CreateNew addNew={addNew}/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
