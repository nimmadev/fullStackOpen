import { useMutation } from "@apollo/client/react";
import { CreateReview } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CreateReview);

  const createReview = async ({ review }) => {
    const createReview = await mutate({ variables: { review } });
    return createReview.data.createReview;
  };

  return [createReview, result];
};

export default useCreateReview;
