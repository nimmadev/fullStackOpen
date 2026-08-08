import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import { useQuery } from "@apollo/client/react";
import { ME_ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
});

const Login = () => {
  const { data, loading } = useQuery(ME_ME, {
    fetchPolicy: "no-cache",
  });

  const user = data?.me;
  console.log(user);
  if (loading) return null;

  return (
    <>
      {user ? (
        <>
          <AppBarTab name="Create a review" to={"/createReview"} />
          <AppBarTab name="My reviews" to={"/myReview"} />

          <AppBarTab name="Logout" to="/logout" />
        </>
      ) : (
        <>
          <AppBarTab name="Sign in" to="/signin" />
          <AppBarTab name="Sign Up" to="/signup" />
        </>
      )}
    </>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name="Repositories" to={"/"} />
        <Login />
      </ScrollView>
    </View>
  );
};

export default AppBar;
