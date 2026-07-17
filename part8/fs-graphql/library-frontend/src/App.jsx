import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { LoginForm } from "./components/LoginForm";
import { ApolloClient } from "@apollo/client";
import { useApolloClient } from "@apollo/client/react";
import { Notification } from "./components/Notifiaction";
import Recommend from "./components/Recommend";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token-key"));
  const [page, setPage] = useState("authors");
  const client = useApolloClient();
  const Logout = () => {
    setToken("");
    localStorage.removeItem("token-key");
    client.resetStore();
  };
  return (
    <div>
      <div>
        <Notification />
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={Logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      <LoginForm show={page === "login"} setToken={setToken} />
      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
