import { useQuery } from "@apollo/client/react";
import { allBooks } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState();
  const result = useQuery(allBooks, { skip: !props.show });
  const filterResult = useQuery(allBooks, {
    skip: genre === undefined,
    variables: { genre },
    fetchPolicy: "network-only",
  });

  if (!props.show || result.loading || filterResult.loading) {
    return null;
  }
  console.log(filterResult);
  let books =
    genre === undefined ? result.data.allBooks : filterResult.data.allBooks;
  const genres = new Set(books.flatMap((book) => book.genres));
  // const filtered = () => {
  //   return books.filter((book) => book.genres.includes(genre));
  // };

  // const filteredBook = genre == "all" ? books : filtered();

  return (
    <div>
      <h2>books</h2>
      <a>
        in genre <strong>{genre === undefined ? "All" : genre}</strong>
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
      <div style={{ display: "flex" }}>
        <button onClick={() => setGenre(undefined)}>all genres</button>
        {[...genres].map((genre) => (
          <button onClick={() => setGenre(genre)} key={genre}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
