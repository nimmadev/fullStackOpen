import { gql } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";

export const fragmentRegistry = createFragmentRegistry();

const repoItem = gql`
  fragment RepoItem on Repository {
    id
    name
    ownerName
    createdAt
    fullName
    forksCount
    stargazersCount
    reviewCount
    ratingAverage
    description
    language
    ownerAvatarUrl
  }
`;

fragmentRegistry.register(repoItem);
