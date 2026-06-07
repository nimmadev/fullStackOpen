import { create } from "zustand"
import blogService from "./services/blogs"

// notifications
export const notificationStore = create((set) => ({
  Message: null,
  Success: true,
  setMessage: (data) => {
    set(data)
    setTimeout(() => set({ Message: null, Success: true }), 5000)
  },
}))

export const useNotication = notificationStore

// blogs
const sortBlogs = (blogs) => blogs.toSorted((a, b) => b.likes - a.likes)

export const blogStore = create((set) => ({
  blogs: [],
  actions: {
    init: () => {
      blogService.getAll().then((blogs) => set({ blogs }))
    },
    create: async (data) => {
      const blog = await blogService.createBlog(data)
      set((state) => ({ blogs: [...state.blogs, blog] }))
    },
    setBlogs: "",
    likeBlog: async (blog) => {
      const { id, ...data } = {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1,
      }
      const result = await blogService.updateBlog(data, id)
      console.log("result", result)
      set((state) => ({
        blogs: state.blogs.map((a) => (a.id === blog.id ? result : a)),
      }))
    },
    deleteBlog: async (id) => {
      await blogService.deleteBlog(id)
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== id),
      }))
    },
  },
}))

export const useBlog = () => {
  const blogs = blogStore((store) => store.blogs)
  return sortBlogs(blogs)
}
export const useBlogActions = () => blogStore((store) => store.actions)

export const userStore = create((set) => ({
  user: null,
  setUser: (user) => {
    window.localStorage.setItem("xyz", JSON.stringify(user))
    set({ user })
    blogService.setToken(user.token)
  },
  initUser: () => {
    const hasUser = window.localStorage.getItem("xyz")
    if (hasUser) {
      let _user = JSON.parse(hasUser)
      set({ user: _user })
      blogService.setToken(_user.token)
    }
  },
  clear: () => {
    window.localStorage.removeItem("xyz")
    set({ user: null })
  },
}))

export const useUser = () => userStore()
