import { gql } from "@apollo/client";

export const Authenticate = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CreateReview = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

export const CreateUser = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;

export const DeleteReview = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
