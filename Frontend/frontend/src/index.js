import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { initContract } from "./utils";
import "./polyfills";

const children = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const container = document.getElementById("root");
const root = createRoot(container);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

initContract()
  .then(() => {
    root.render(children);
  })
  .catch(console.error);

reportWebVitals();
