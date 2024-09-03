import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/authContext.jsx";
import { SupabaseProvider } from "./supabase/supabaseClient.jsx";
import { BackgroundColorProvider } from "./context/BackgroundColorContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BackgroundColorProvider>
      <SupabaseProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SupabaseProvider>
    </BackgroundColorProvider>
  </React.StrictMode>
);
