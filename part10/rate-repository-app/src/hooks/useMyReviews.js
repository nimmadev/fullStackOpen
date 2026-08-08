import { useMutation, useQuery } from "@apollo/client/react";
import { MyReviews } from "../graphql/queries";

const useMyReviews = () => {
  const { loading, error, data, refetch } = useQuery(MyReviews, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return { loading };
  return { data, loading, refetch };
};

export default useMyReviews;
