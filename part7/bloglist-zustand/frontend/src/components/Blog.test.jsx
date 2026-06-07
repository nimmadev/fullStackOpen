import { render as ren, screen } from "@testing-library/react"
import { beforeEach, describe, expect } from "vitest"
import Blog from "./Blog"
import { MemoryRouter } from "react-router-dom"

const render = (child) => ren(<MemoryRouter>{child}</MemoryRouter>)
describe("Blog render", () => {
  const blog = {
    title: "test 1",
    author: "nimma",
    url: "test",
    likes: 2,
    user: {
      username: "rooot",
      name: "Superuser",
      id: "69f62f95728e0fb79760a766",
    },
    id: "69f63c0ea9cd5f14f5d136ea",
  }

  describe("logged in user", () => {
    test("blog information and the number of likes are displayed", () => {
      const updateLike = vi.fn()
      render(<Blog blog={blog} user={blog.user} updateLike={updateLike} />)
      screen.getByText(blog.title)
      screen.getByText(blog.url)
      screen.getByText("likes 2")
      screen.getByText(`added by ${blog.author}`)
    })
    test("like and delete buttons are displayed for creator", () => {
      const updateLike = vi.fn()
      render(<Blog blog={blog} user={blog.user} updateLike={updateLike} />)
      screen.getByRole("button", { name: "like" })
      screen.getByRole("button", { name: "delete" })
    })
    test("only like button is displayed for non creator", () => {
      const updateLike = vi.fn()
      render(
        <Blog
          blog={blog}
          user={{ ...blog.user, username: "fake" }}
          updateLike={updateLike}
        />,
      )
      expect(screen.queryByRole("button", { name: "delete" })).toBeNull()
    })
  })
  describe("logged out user", () => {
    beforeEach(() => {
      const updateLike = vi.fn()
      render(<Blog blog={blog} updateLike={updateLike} />)
    })
    test("blog information and the number of likes are displayed", () => {
      screen.getByText(blog.title)
      screen.getByText(blog.url)
      screen.getByText("likes 2")
      screen.getByText(`added by ${blog.author}`)
    })
    test("like button not displayed", () => {
      expect(screen.queryByRole("button", { name: "like" })).toBeNull()
    })
  })
})
