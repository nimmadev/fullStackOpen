import {useQuery} from '@apollo/client/react'
import { allBooks } from '../queries'

const Books = (props) => {

  const result = useQuery(allBooks, {skip: !props.show})
  
  if (!props.show || result.loading) {
    return null
  }
  const books = result.data.allBooks
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
