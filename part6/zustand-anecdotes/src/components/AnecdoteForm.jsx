import { useAnecdoteActions } from "../store"

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions()

  const create = e => {
    e.preventDefault()
    const content = e.target.content.value
    addAnecdote(content)
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