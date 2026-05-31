const baseUrl = '/api'
const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

const create = async data => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify(data)
  }
  const response = await fetch(baseUrl, config)
  if (!response.ok) {
    throw new Error('Failed to create anecdotes')
  }
  return await response.json()
}
const update = async (id, data) => {
  const config = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify(data)
  }
  const response = await fetch(`${baseUrl}/${id}`, config)
  if (!response.ok) {
    throw new Error('Failed to update anecdotes')
  }
  return await response.json()
}
const deleteAnecsdote = async (id) => {
  const config = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await fetch(`${baseUrl}/${id}`, config)
  if (!response.ok) {
    throw new Error('Failed to delete anecdotes')
  }
  return await response.json()
}

export default { getAll, create, update, deleteAnecsdote }