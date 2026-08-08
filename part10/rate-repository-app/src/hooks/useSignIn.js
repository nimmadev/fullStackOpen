import { useMutation } from "@apollo/client/react";
import { Authenticate } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(Authenticate);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username, password },
    });
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
