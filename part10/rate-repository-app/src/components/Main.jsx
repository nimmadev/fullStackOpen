import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import { Route, Routes, Navigate } from "react-router-native";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import Logout from "./Logout";
import SingleRepository from "./SingleRepository";
import ReviewForm from "./ReviewFrom";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: "#e1e4e8",
  },
  routeView: {
    margin: 10,
    flex: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.routeView}>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/repositorie/:id" element={<SingleRepository />} />
          <Route path="/createReview" element={<ReviewForm />} />
          <Route path="/myReview" element={<MyReviews />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </View>
  );
};

export default Main;
