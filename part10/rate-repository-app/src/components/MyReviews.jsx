import { FlatList } from "react-native";
import useMyReviews from "../hooks/useMyReviews";
import Text from "./Text";
import ReviewItem from "./ReviewItem";
import useDeleteReview from "../hooks/useDeleteReview";

const MyReviews = () => {
  const { data, loading, refetch } = useMyReviews();
  const [deleteReview] = useDeleteReview();
  const onDelete = async (id) => {
    await deleteReview({ deleteReviewId: id });
    await refetch();
  };
  if (loading) return <Text>Loading...</Text>;
  const reviews = data.me.reviews.edges.map(({ node }) => node);
  console.log(reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} single onDelete={() => onDelete(item.id)} />
      )}
    />
  );
};

export default MyReviews;
