import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { login } from "../queries";
import { useNotify } from "../hooks/Notifiaction";
export const LoginForm = ({ show, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setMessage] = useNotify();
  const [loginUser] = useMutation(login, {
    onCompleted: (result) => {
      console.log(result.login.value);
      setToken(result.login.value);
      localStorage.setItem("token-key", result.login.value);
      navigation.reload();
    },
    onError: () => setMessage("login failed"),
  });

  const submit = (e) => {
    e.preventDefault();
    loginUser({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };
  if (!show || localStorage.getItem("token-key")) return null;

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
