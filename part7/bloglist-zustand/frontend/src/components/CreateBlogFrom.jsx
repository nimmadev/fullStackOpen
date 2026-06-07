import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Typography, InputLabel, Input, Button } from "@mui/material"
import { useBlogActions, useNotication } from "../store"

const CreateBlogForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const { setMessage } = useNotication()
  const { create } = useBlogActions()
  const navigation = useNavigate()
  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const data = { title, author, url }
      await create(data)
      const message = `a new blog ${data.title} by ${data.author} added`
      setMessage({ Message: message, Success: true })
      navigation("/")
    } catch (e) {
      console.log(e)
      if (e.response.data.error === "token expired") {
        setMessage({ Message: e.response.data.error, Success: false })
        window.localStorage.clear("xyz")
        navigation.reload()
      }
      console.log(e)
    }
  }

  return (
    <form onSubmit={handleCreate}>
      <Typography variant="h3">create new</Typography>
      <div>
        <InputLabel>
          title:{" "}
          <Input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </InputLabel>
      </div>
      <div>
        <InputLabel>
          author:{" "}
          <Input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </InputLabel>
      </div>
      <div>
        <InputLabel>
          url:{" "}
          <Input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </InputLabel>
      </div>
      <Button variant="contained" style={{ marginTop: "10px" }} type="submit">
        create
      </Button>
    </form>
  )
}

export default CreateBlogForm
