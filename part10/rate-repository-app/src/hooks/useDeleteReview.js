import { useMutation } from "@apollo/client/react";
import { DeleteReview } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DeleteReview);

  const deleteReview = async ({ deleteReviewId }) => {
    const data = await mutate({
      variables: { deleteReviewId },
    });
    return data;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
