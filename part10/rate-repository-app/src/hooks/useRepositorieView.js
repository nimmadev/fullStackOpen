import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIE } from "../graphql/queries";

const useRepositorie = ({ id }) => {
  const {
    data: repositorie,
    loading,
    refetch,
  } = useQuery(GET_REPOSITORIE, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: id },
  });

  if (loading) return { loading };
  return { repositorie: repositorie.repository, loading, refetch };
};

export default useRepositorie;
