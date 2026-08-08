import { useMutation } from "@apollo/client/react";
import { CreateUser } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(CreateUser);

  const createUser = async ({ user }) => {
    const { data } = await mutate({ variables: { user } });
    return data.createUser;
  };

  return [createUser, result];
};

export default useSignUp;
