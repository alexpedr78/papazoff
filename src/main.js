import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Pas de JSX → on utilise React.createElement
ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(React.StrictMode, null, React.createElement(App))
);
