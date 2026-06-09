import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import blogService from "../services/blogs"

export const useBlog = () => {
  const queryClient = useQueryClient()

  const toSorted = (blogs) => blogs.toSorted((a, b) => b.likes - a.likes)
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      blogService.getAll().then((blogs) => {
        blogs.sort((a, b) => b.likes - a.likes)
        return blogs
      }),
  })
  const create = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.concat(blog))
    },
  })
  const deleteB = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  })
  const like = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(
        ["blogs"],
        toSorted(blogs.map((b) => (b.id === blog.id ? blog : b))),
      )
    },
  })

  return {
    data: result.data,
    isPending: result.isPending,
    isError: result.error,
    create,
    deleteB,
    like,
  }
}
