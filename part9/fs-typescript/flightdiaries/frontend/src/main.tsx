import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { UseNotificationContext } from "./hooks/Notification.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UseNotificationContext>
      <App />
    </UseNotificationContext>
  </StrictMode>,
);
