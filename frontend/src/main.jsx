import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/authcontext.jsx";
import { Provider } from "./components/ui/provider.jsx";

createRoot(document.getElementById("root")).render(
  <Provider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);
