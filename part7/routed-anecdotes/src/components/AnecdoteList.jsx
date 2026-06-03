import { useAnecdotes } from "../hooks"

const AnecdoteList = () => {
  const { anecdotes, deleteAnecdote } = useAnecdotes()

  const onClick = (id) => {
    deleteAnecdote(id)
  }
  return < div >
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}>{anecdote.content}<button onClick={() => onClick(anecdote.id)}>delete</button></li>)}

    </ul>
  </div >
}

export default AnecdoteList
