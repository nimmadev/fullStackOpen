import { useMutation, useQuery } from "@apollo/client/react"
import { allAuthor, editAuthor } from "../queries"
import { useState } from "react"

const AuthorForm = ({authors}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  
  const [updateAuthor] = useMutation(editAuthor, {
    refetchQueries:[{query: allAuthor}]
  })
  
  const handleForm = (e) => {
    e.preventDefault()
    updateAuthor({variables: {name, setBornTo: Number(born)}})
    setName('')
    setBorn('')
  }
  return <form onSubmit={handleForm}>
    <div>
      <label>name
      <select value={name} onChange={(e) => setName(e.target.value)}>
        {authors.map(author => <option key={author.id} value={author.name}>{author.name}</option>)}
        </select></label></div>
    <div><label >born<input type="number" value={born} onChange={(e) => setBorn(e.target.value)} /></label></div>
    <button type="submit">update year</button>
  </form>
}

const Authors = (props) => {

  const authors =   useQuery(allAuthor, {
    skip: !props.show
  })
  if (!props.show  || authors.loading) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <AuthorForm authors={authors.data.allAuthors} />
    </div>
  )
}

export default Authors
