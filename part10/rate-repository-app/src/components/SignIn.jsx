import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";

const onSubmit = (values) => {
  console.log(values);
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
    margin: 10,
  },
  textInput: {
    border: "1px solid black",
    borderRadius: 4,
    fontSize: 18,
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 20,
    textAlign: "center",
    borderRadius: 5,
  },
});

const FormInputField = ({ placeholder, onChange, value, style, ...props }) => {
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
const validationSchema = yup.object().shape({
  username: yup.string().ensure().required("username is required"),
  password: yup
    .string()
    .min(4, "Invalid password.")
    .required("password is required"),
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });
  return (
    <View style={styles.container}>
      <FormInputField
        value={formik.values.username}
        onChange={formik.handleChange("username")}
        placeholder="Username"
        style={formik.errors.username && { borderColor: theme.colors.error }}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.username}
        </Text>
      )}
      <FormInputField
        value={formik.values.password}
        onChange={formik.handleChange("password")}
        placeholder="Password"
        secureTextEntry
        style={formik.errors.password && { borderColor: theme.colors.error }}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button} fontWeight={"bold"}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
