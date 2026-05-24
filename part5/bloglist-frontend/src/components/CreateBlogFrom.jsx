import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateBlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigation = useNavigate()
  const createBlog = async (event) => {
    event.preventDefault()
    const data = { title, author, url }
    await handleCreate(data)
    navigation('/')
  }

  return <form onSubmit={createBlog}>
    <h1>create new</h1>
    <div>
      <label >title: <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} /></label>
    </div>
    <div>
      <label >author: <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} /></label>
    </div>
    <div>
      <label >url: <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} /></label>
    </div>
    <button type="submit">create</button>
  </form>
}

export default CreateBlogForm