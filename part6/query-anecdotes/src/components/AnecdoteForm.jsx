import { useAnecdote } from "./useAnecdotes"

const AnecdoteForm = () => {
  const { createAnecdote } = useAnecdote()
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createAnecdote.mutate({ content, votes: 0 })
    event.target.reset()
    console.log('new anecdote')
  }
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm