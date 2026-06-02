
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdote } from './components/useAnecdotes'
import { NotificationProvider } from './NotifiactionContext'

const App = () => {
  const { data, isPending, isError, updateVote } = useAnecdote()
  const handleVote = (anecdote) => {
    console.log('vote')
    updateVote.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }



  if (isPending) {
    return <div>Loading ....</div>
  }
  if (isError) {
    return <div>anecdotes service not avilable</div>
  }
  const anecdotes = data

  return (
    <NotificationProvider>

      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </NotificationProvider>
  )
}

export default App