import { gql } from "@apollo/client";

export const allBooks = gql`query {
    allBooks{
      id
      title
      author
      published
    }
  }`

export const allAuthor = gql`query {allAuthors{
    id
    name
    born
    bookCount
  }}`

export const addBookQuery = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
    }
  }
`

export const editAuthor = gql`
mutation AddBook($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
  }
}`;