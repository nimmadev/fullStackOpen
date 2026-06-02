const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch('http://localhost:3001/anecdotes')
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

export const create = async data => {
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

export const update = async (data) => {
  console.log(data)
  const config = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify(data)
  }
  const response = await fetch(`${baseUrl}/${data.id}`, config)
  if (!response.ok) {
    throw new Error('Failed to update anecdotes')
  }
  return await response.json()
}