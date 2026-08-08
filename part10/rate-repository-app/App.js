import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client/react";

import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const apploClient = createApolloClient(authStorage);
const App = () => {
  console.log("env check:", process.env.EXPO_PUBLIC_ENV);

  return (
    <>
      <StatusBar style="light" />
      <NativeRouter>
        <ApolloProvider client={apploClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
