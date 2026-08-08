import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import SignIn from "../../components/SignIn";
import SignInContainer from "../../components/SignInContainer";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();

      await render(<SignInContainer onSubmit={onSubmit} />);
      await fireEvent.changeText(
        screen.getByPlaceholderText("Username"),
        "kalle",
      );
      await fireEvent.changeText(
        screen.getByPlaceholderText("Password"),
        "password",
      );
      await fireEvent.press(screen.getByText("Sign in"));

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "kalle",
        password: "password",
      });
      // await waitFor(() => {
      //   // expect the onSubmit function to have been called once and with a correct first argument
      // });
    });
  });
});
