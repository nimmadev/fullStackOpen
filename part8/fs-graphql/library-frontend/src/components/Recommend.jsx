import { useQuery } from "@apollo/client/react";
import { allBooks, favoriteGenre } from "../queries";

const Recommend = (props) => {
  const result = useQuery(favoriteGenre, { skip: !props.show });

  const genre = result.data?.me.favoriteGenre;

  const filterResult = useQuery(allBooks, {
    skip: !genre,
    variables: { genre },
  });
  if (!props.show || result.loading || filterResult.loading) {
    return null;
  }
  let books = filterResult.data.allBooks;

  return (
    <div>
      <h2>Recommendations</h2>
      <a>
        Books in your favorite genre <strong>{genre}</strong>
      </a>
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
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
