import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { Provider } from 'react-redux';
import store from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    </React.StrictMode>
)
