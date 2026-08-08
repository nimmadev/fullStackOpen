import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-native";

const Logout = () => {
  const auth = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  useEffect(() => {
    const log = async () => {
      await auth.removeAccessToken();
      try {
        await apolloClient.resetStore();
      } catch {}
      navigate("/", { flushSync: true, replace: true });
    };
    log();
  }, [apolloClient, auth, navigate]);
  return null;
};

export default Logout;
