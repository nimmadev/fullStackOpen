import { useFormik } from "formik";
import { FormInputField } from "./InputField";
import theme from "../theme";
import Text from "./Text";
import validationSchema from "../utils/validationSchema";
import { View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client/react";

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

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

const SignUpFormConatiner = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema.signUp,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <FormInputField
        placeholder={"username"}
        value={formik.values.username}
        style={formik.errors.username && { borderColor: theme.colors.error }}
        onChange={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.username}
        </Text>
      )}
      <FormInputField
        placeholder={"password"}
        value={formik.values.password}
        onChange={formik.handleChange("password")}
        style={formik.errors.password && { borderColor: theme.colors.error }}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.password}
        </Text>
      )}
      <FormInputField
        placeholder={"Confirm password"}
        value={formik.values.passwordConfirm}
        onChange={formik.handleChange("passwordConfirm")}
        style={
          formik.errors.passwordConfirm && { borderColor: theme.colors.error }
        }
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.passwordConfirm}
        </Text>
      )}

      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button} fontWeight={"bold"}>
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [createSignup] = useSignUp();
  const [signIn] = useSignIn();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const user = {
      username: values.username,
      password: values.password,
    };

    const data = await createSignup({ user });
    if (data.username) {
      const { authenticate } = await signIn(user);
      if (authenticate.accessToken) {
        await authStorage.setAccessToken(authenticate.accessToken);
        await apolloClient.resetStore();
        return navigate("/", { replace: true });
      }
    }
    navigate(`/signin`);
  };
  return <SignUpFormConatiner onSubmit={onSubmit} />;
};

export default SignUp;
