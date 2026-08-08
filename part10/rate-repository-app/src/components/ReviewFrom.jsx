import { useFormik } from "formik";
import { FormInputField } from "./InputField";
import theme from "../theme";
import Text from "./Text";
import validationSchema from "../utils/validationSchema";
import { View, StyleSheet, Pressable } from "react-native";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

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
  repo: "",
  rating: "",
  review: "",
};

const ReviewFormConatiner = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema.reviewForm,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <FormInputField
        placeholder={"Repository owner username"}
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
        placeholder={"Repository name"}
        value={formik.values.repo}
        onChange={formik.handleChange("repo")}
        style={formik.errors.repo && { borderColor: theme.colors.error }}
      />
      {formik.touched.repo && formik.errors.repo && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.repo}</Text>
      )}
      <FormInputField
        placeholder={"Rating 0-100"}
        value={formik.values.rating}
        onChange={formik.handleChange("rating")}
        style={formik.errors.rating && { borderColor: theme.colors.error }}
        keyboadType="number-pad"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.rating}
        </Text>
      )}
      <FormInputField
        placeholder={"Review"}
        onChange={formik.handleChange("review")}
        value={formik.values.review}
        multiline
        numberOfLines={3}
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button} fontWeight={"bold"}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const review = {
      ownerName: values.username,
      rating: Number(values.rating),
      repositoryName: values.repo,
    };
    if (values.review) review.text = values.review;
    const data = await createReview({ review });
    navigate(`/repositorie/${data.repositoryId}`);
  };
  return <ReviewFormConatiner onSubmit={onSubmit} />;
};

export default ReviewForm;
