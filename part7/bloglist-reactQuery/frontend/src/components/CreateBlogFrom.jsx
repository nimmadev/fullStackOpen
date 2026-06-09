import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Typography, InputLabel, Input, Button } from "@mui/material"
import { useBlog } from "./useBlog"
import { useNotify } from "../hooks/notificationHook"
import { useField } from "../hooks/useField"

const CreateBlogForm = () => {
  const title = useField("text")
  const author = useField("text")
  const url = useField("text")

  const { create } = useBlog()
  const navigation = useNavigate()
  const { updateNotification } = useNotify()
  const handleCreate = async (event) => {
    event.preventDefault()
    const data = { title: title.value, author: author.value, url: url.value }

    try {
      const message = `a new blog ${data.title} by ${data.author} added`
      create.mutate(data, {
        onSuccess: () => {
          updateNotification({
            message,
            success: true,
          })
          navigation("/")
        },
        onError: (e) =>
          updateNotification({
            message: e.response.data.error,
            success: false,
          }),
      })
    } catch (e) {
      console.log(e)
      if (e.response.data.error === "token expired") {
        updateNotification({ message: e.response.data.error, success: false })
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
          title: <Input {...title} />
        </InputLabel>
      </div>
      <div>
        <InputLabel>
          author: <Input {...author} />
        </InputLabel>
      </div>
      <div>
        <InputLabel>
          url: <Input {...url} />
        </InputLabel>
      </div>
      <Button variant="contained" style={{ marginTop: "10px" }} type="submit">
        create
      </Button>
    </form>
  )
}

export default CreateBlogForm
