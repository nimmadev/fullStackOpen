import { useNotify } from "../NotifiactionContext"
import { useAnecdote } from "./useAnecdotes"

const AnecdoteForm = () => {
  const { createAnecdote } = useAnecdote()
  const { updateMessage } = useNotify()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createAnecdote.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => { updateMessage(`added ${content}`) },
        onError: () => {
          updateMessage('too short anecdote, at least 5 chars or more')
        }
      }
    )
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