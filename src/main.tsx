import React from "react";
import ReactDOM from "react-dom/client";

// 路由
import { BrowserRouter } from "react-router-dom";

// 仓库与持久化
import { store, persist } from "@/store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App.tsx";
import "./index.less";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
