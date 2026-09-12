import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { applyThemeInit } from "./core/theme.store";
import "./index.css";

applyThemeInit();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);