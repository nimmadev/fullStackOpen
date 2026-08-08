import { StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  textInput: {
    border: "1px solid black",
    borderRadius: 4,
    fontSize: 18,
    padding: 10,
  },
});

export const FormInputField = ({
  placeholder,
  onChange,
  value,
  style,
  ...props
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
      style={[styles.textInput, style]}
      {...props}
    />
  );
};
