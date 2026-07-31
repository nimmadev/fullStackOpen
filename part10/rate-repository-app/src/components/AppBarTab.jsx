import { StyleSheet } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";
const styles = StyleSheet.create({
  text: {
    color: "white",
    marginVertical: 20,
    marginHorizontal: 10,
  },
});

const AppBarTab = ({ name, to }) => {
  if (name === undefined) return;

  return (
    <Link to={to}>
      <Text fontSize="heading" fontWeight="bold" style={styles.text}>
        {name}
      </Text>
    </Link>
  );
};

export default AppBarTab;
