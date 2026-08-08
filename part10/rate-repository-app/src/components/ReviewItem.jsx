import { Alert, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  reviewConatiner: { flexDirection: "row", marginTop: 30, gap: 15 },
  rating: {
    height: 50,
    width: 50,
    border: `${theme.colors.primary} 3px solid`,
    borderRadius: 60 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    margin: 5,
    gap: 10,
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
  },
  langText: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
});
const ReviewItem = ({ review, single, onDelete }) => {
  const deleteConfirm = () =>
    Alert.alert(
      "Delete the review",
      "are you sure you want to delete this review",
      [
        {
          text: "cancel",
        },
        {
          text: "confirm",
          onPress: onDelete,
        },
      ],
    );
  return (
    <>
      <View testID="reviewItem" style={styles.reviewConatiner}>
        <View style={styles.rating}>
          <Text color={"primary"} fontWeight={"bold"} style={{ fontSize: 20 }}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.ratingText}>
          <View>
            <Text fontSize={"heading"} fontWeight={"bold"}>
              {review.user.username}
            </Text>
            <Text fontSize={"heading"}>
              {format(review.createdAt, "dd MMM yyyy")}
            </Text>
          </View>
          {review.text && <Text fontSize={"heading"}>{review.text}</Text>}
        </View>
      </View>
      {single && (
        <View
          style={[
            styles.reviewConatiner,
            { justifyContent: "center", alignItems: "stretch" },
          ]}
        >
          <Link to={`/repositorie/${review.repositoryId}`} style={{ flex: 1 }}>
            <Text
              style={[styles.langText]}
              fontSize={"heading"}
              fontWeight={"bold"}
            >
              View repository
            </Text>
          </Link>
          <Pressable onPress={deleteConfirm} style={{ flex: 1 }}>
            <Text
              style={[styles.langText, { backgroundColor: "red" }]}
              fontSize={"heading"}
              fontWeight={"bold"}
            >
              Delete Review
            </Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default ReviewItem;
