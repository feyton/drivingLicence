import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css"; // import first
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
