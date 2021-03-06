import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ProductsContextProvider } from "./Context-Api/Products/Context";
import { AutoBidsContextProvider } from "./Context-Api/Autobids/Context";
import { ProductContextProvider } from "./Context-Api/SingleProduct/Context";

ReactDOM.render(
  <React.StrictMode>
    <ProductsContextProvider>
      <AutoBidsContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </AutoBidsContextProvider>
    </ProductsContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
