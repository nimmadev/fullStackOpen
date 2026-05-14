import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => { token = `Bearer ${newToken}` }

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async data => {
  const config = { headers: { Authorization: token } }

  const request = await axios.post(baseUrl, data, config)
  console.log(request.data)
  return request.data
}

const updateBlog = async (data, id) => {
  const config = { headers: { Authorization: token } }
  const request = await axios.put(`${baseUrl}/${id}`, data, config)
  return request.data
}

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}
export default { getAll, createBlog, setToken, updateBlog, deleteBlog }