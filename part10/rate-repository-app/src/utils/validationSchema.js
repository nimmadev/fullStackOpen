import * as yup from "yup";

const validationSchema = {
  signIn: yup.object().shape({
    username: yup.string().ensure().required("username is required"),
    password: yup
      .string()
      .min(4, "Invalid password.")
      .required("password is required"),
  }),
  reviewForm: yup.object().shape({
    username: yup.string().ensure().required("owner username is required"),
    repo: yup.string().ensure().required("Repository name is required"),
    rating: yup.number().min(0).max(100).required("Rating is required"),
    review: yup.string(),
  }),
  signUp: yup.object().shape({
    username: yup.string().ensure().required("username is required"),
    password: yup.string().required("Password is required"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required("Password confirm is required"),
  }),
};

export default validationSchema;
