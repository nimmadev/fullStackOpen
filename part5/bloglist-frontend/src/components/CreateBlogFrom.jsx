import { useState } from "react"
import blogsService from "../services/blogs"

const CreateBlogForm = ({ setMessage, setBlogs, createRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {

      const blog = await blogsService.createBlog({
        title, author, url
      })
      const message = `a new blog ${title} by ${author} added`
      setMessage(message, true)
      console.log(blog)
      setBlogs(blogs => blogs.concat(blog))
      createRef.current.toggleVisibility()
    } catch (e) {
      if (e.response.data.error === 'token expired') {
        window.localStorage.clear('xyz')
        navigation.reload()
      }
      setMessage(e.response.data.error, false)

    }
  }
  return <form onSubmit={handleCreate}>
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