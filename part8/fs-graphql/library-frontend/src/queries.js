import { gql } from "@apollo/client";

export const allBooks = gql`
  query ($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const allAuthor = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

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
`;

export const editAuthor = gql`
  mutation AddBook($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
    }
  }
`;

export const login = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const favoriteGenre = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;
