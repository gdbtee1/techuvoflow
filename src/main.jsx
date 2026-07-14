import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import AppProviders from "./app/providers/AppProviders";
import AppRouter from "./app/router/AppRouter";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </HashRouter>
  </React.StrictMode>
);