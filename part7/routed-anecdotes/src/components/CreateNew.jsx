import { useNavigate } from 'react-router-dom'
import { useAnecdotes, useField } from '../hooks'

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes()
  const { reset: cReset, ...content } = useField('text')
  const { reset: aReset, ...author } = useField('text')
  const { reset: iReset, ...info } = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content: content.value, author: author.value, info: info.value, votes: 0 })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type='button' onClick={() => {
          cReset()
          aReset()
          iReset()
        }}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
