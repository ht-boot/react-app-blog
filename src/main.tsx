import React from "react";
import ReactDOM from "react-dom/client";

// 路由
import { HashRouter } from "react-router-dom";

// 仓库与持久化
import { store, persist } from "@/store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./index.less";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate persistor={persist}>
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
