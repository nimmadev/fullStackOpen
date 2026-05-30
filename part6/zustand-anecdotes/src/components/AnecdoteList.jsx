import { useAnecdoteActions, useAnecdotes } from "../store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { incrementVote } = useAnecdoteActions()

  const vote = id => {
    console.log('vote', id)
    incrementVote(id)
  }
  return <>
    {anecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ))}  </>


}

export default AnecdoteList