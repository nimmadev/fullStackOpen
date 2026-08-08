import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepoItem
        }
      }
    }
  }
`;

export const GET_REPOSITORIE = gql`
  query rep($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepoItem
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const ME_ME = gql`
  query {
    me {
      username
    }
  }
`;

export const MyReviews = gql`
  query {
    me {
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
