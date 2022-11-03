import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Redux-toolkit/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
let persistor = persistStore(store);
if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
