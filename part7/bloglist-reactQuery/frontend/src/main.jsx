import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import "./index.css"
import { NotificationProvider } from "./hooks/notificationHook"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const querClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={querClient}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </QueryClientProvider>
  </Router>,
)
