import useSignIn from "../hooks/useSignIn";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client/react";
import { useNavigate } from "react-router-native";
import SignInContainer from "./SignInContainer";

const SignIn = (props) => {
  const [signIn] = useSignIn();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { authenticate } = await signIn({ username, password });
      if (authenticate.accessToken) {
        await authStorage.setAccessToken(authenticate.accessToken);
        await apolloClient.resetStore();
        navigate("/", { replace: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
