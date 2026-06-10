import { Button, Input } from "@mui/material"
import { useField } from "../hooks/useField"
import { useBlog } from "./useBlog"

export const Comments = ({ comments, blogId }) => {
  const commentField = useField("text")
  const { comment } = useBlog()
  const handleSubmit = (e) => {
    e.preventDefault()
    comment.mutate({ comment: commentField.value, id: blogId })
  }
  return (
    <>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <Input {...commentField} placeholder="comment here" />
        <Button type="submit">create</Button>
      </form>
      <ul>
        {comments.map((comm) => (
          <li key={comm.id}>{comm.comment}</li>
        ))}
      </ul>
    </>
  )
}
