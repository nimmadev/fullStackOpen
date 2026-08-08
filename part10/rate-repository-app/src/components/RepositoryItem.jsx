import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as Linking from "expo-linking";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: "white",
    gap: 20,
  },
  langText: {
    backgroundColor: theme.colors.primary,
    color: "white",
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 5,
  },
  Link: {
    alignSelf: "stretch",
    padding: 20,
    borderRadius: 5,
    textAlign: "center",
  },
  stats: { flexDirection: "row", justifyContent: "space-evenly" },
});

const ConvertToK = (number) => {
  let formatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  return formatter.format(number).replace("K", "k");
};
const RepositoryItemStatsItem = ({ name, stats }) => (
  <View style={{ justifyContent: "center", alignItems: "center", gap: 10 }}>
    <Text fontSize={"heading"} fontWeight={"bold"}>
      {ConvertToK(stats)}
    </Text>
    <Text fontSize={"heading"} color={"textSecondary"}>
      {name}
    </Text>
  </View>
);

const RepositoryItemStats = ({ item }) => {
  return (
    <View style={styles.stats}>
      <RepositoryItemStatsItem name="Stars" stats={item.stargazersCount} />
      <RepositoryItemStatsItem name="Forks" stats={item.forksCount} />
      <RepositoryItemStatsItem name="Reviews" stats={item.reviewCount} />
      <RepositoryItemStatsItem name="Rating" stats={item.ratingAverage} />
    </View>
  );
};

const onLinkClick = async ({ url }) => {
  await Linking.openURL(url);
};

const Repositoryitem = ({ item, github }) => {
  return (
    <Link to={`/repositorie/${item.id}`}>
      <View style={styles.conatiner} testID="repositoryItem">
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 3,
            }}
            source={item.ownerAvatarUrl}
          />
          <View style={{ flex: 1, marginTop: 10, gap: 10 }}>
            <Text fontSize={"heading"} fontWeight={"bold"}>
              {item.fullName}
            </Text>
            <Text fontSize={"heading"} color={"textSecondary"}>
              {item.description}
            </Text>
            <Text style={styles.langText}>{item.language}</Text>
          </View>
        </View>
        <RepositoryItemStats item={item} />
        {github && (
          <Pressable onPress={() => onLinkClick({ url: item.url })}>
            <Text
              style={[styles.langText, styles.Link]}
              fontSize={"heading"}
              fontWeight={"bold"}
            >
              Open in GitHub
            </Text>
          </Pressable>
        )}
      </View>
    </Link>
  );
};

export default Repositoryitem;
