import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// Style
import "./Styles/App.css";
import "./Styles/Style2.css";
import "./Styles/Authentification.css";

// Store
import { store } from "./Redux/Store";

// Components
import App from "./Views/App";

document.querySelector("html").className = "light";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
