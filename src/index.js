import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import {Provider} from "react-redux";
import store from './redux/configStore';
ReactDOM.render(
  <Provider store={store}>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </Provider>,
  document.getElementById("root")
);
