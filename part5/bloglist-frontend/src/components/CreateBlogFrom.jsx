import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, InputLabel, Input, Button } from '@mui/material'

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
    <Typography variant='h3'>create new</Typography>
    <div>
      <InputLabel >title: <Input type="text" value={title} onChange={({ target }) => setTitle(target.value)} /></InputLabel>
    </div>
    <div>
      <InputLabel >author: <Input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} /></InputLabel>
    </div>
    <div>
      <InputLabel >url: <Input type="text" value={url} onChange={({ target }) => setUrl(target.value)} /></InputLabel>
    </div>
    <Button variant='contained' style={{ marginTop: '10px' }} type="submit">create</Button>
  </form>
}

export default CreateBlogForm