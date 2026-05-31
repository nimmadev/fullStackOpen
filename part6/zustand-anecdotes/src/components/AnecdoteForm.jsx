import { useAnecdoteActions } from "../store"
import { useSetMessage } from "../store"
const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions()
  const setMessage = useSetMessage()
  const create = e => {
    e.preventDefault()
    const content = e.target.content.value
    addAnecdote(content)
    const message = `new anecdote created ${content}`
    setMessage(message)
    e.target.reset()
  }
  return <>
    <h2>create new</h2>
    <form onSubmit={create}>
      <div>
        <input name='content' />
      </div>
      <button>create</button>
    </form>
  </>
}

export default AnecdoteForm