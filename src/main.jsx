import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router";
import "./index.css";
import router from "./routes/routes";
import AuthProvider from "./context/AuthProvider";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
