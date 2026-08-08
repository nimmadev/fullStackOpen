import { StyleSheet, View, FlatList } from "react-native";
import Repositoryitem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 50,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories, Header }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={Header()}
      // keyExtractor={({ id }) => id}
      renderItem={({ item }) => <Repositoryitem item={item} />}
    />
  );
};

export default RepositoryListContainer;
