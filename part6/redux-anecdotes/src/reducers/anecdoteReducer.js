import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    add(state, action) {
        const anecdote = action.payload
        return state.concat(anecdote)
    },
    update(state,action) {
        const id = action.payload.id
        return state.map(anecdote => anecdote.id === id ? action.payload : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initalizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.data))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.post(content)
    dispatch(add(anecdote.data))
  }
}

export const updateAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.patch({...anecdote, votes: anecdote.votes + 1})
    dispatch(update(newAnecdote.data))
  }
}

export const { add, update, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer