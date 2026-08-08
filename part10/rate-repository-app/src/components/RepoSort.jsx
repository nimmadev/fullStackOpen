import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

export const sortOptions = {
  latest: {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  highest: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  lowest: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
};
const SortPicker = ({ sortMethod, setSortMethod }) => {
  return (
    <View>
      <Picker
        selectedValue={sortMethod}
        onValueChange={(value) => {
          setSortMethod(value);
        }}
        style={{
          backgroundColor: "white",
          borderColor: "#e1e4e8",
          border: "none",
          marginBottom: 10,
          padding: 10,
          borderRadius: 4,
        }}
      >
        <Picker.Item label="Select a method" enabled={false} value="" />
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export default SortPicker;
