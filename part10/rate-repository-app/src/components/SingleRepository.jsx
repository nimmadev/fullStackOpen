import { useNavigate, useParams } from "react-router-native";
import useRepositorie from "../hooks/useRepositorieView";
import Repositoryitem from "./RepositoryItem";
import { FlatList, Image, StyleSheet } from "react-native";
import { View } from "react-native";
import ReviewItem from "./ReviewItem";

const SingleRepository = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { loading, repositorie } = useRepositorie({ id: params.id });

  if (loading) return null;
  if (!loading && !repositorie) return navigate("/");
  const reviews = repositorie.reviews.edges
    ? repositorie.reviews.edges.map(({ node }) => node)
    : [];
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 20,
          }}
        ></View>
      )}
      ListHeaderComponent={() => <Repositoryitem item={repositorie} github />}
    />
  );
};

export default SingleRepository;
