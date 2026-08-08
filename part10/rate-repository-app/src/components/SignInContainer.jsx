import { StyleSheet, View, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useFormik } from "formik";
import { FormInputField } from "./InputField";
import validationSchema from "../utils/validationSchema";

const styles = StyleSheet.create({
  container: {
    gap: 6,
    margin: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 20,
    textAlign: "center",
    borderRadius: 5,
  },
});

const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
    validationSchema: validationSchema.signIn,
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

export default SignInContainer;
