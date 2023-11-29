import { configureStore } from "@reduxjs/toolkit";

// 仓库碎片（模块）
import musicReducer from "./musicSlice/index";

// 合并碎片（模块）
import { combineReducers } from "redux";

// 数据持久化
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";

/**
 * @description 缓存数据配置
 * @param key  标识存储在本地存储中的数据
 * @param storage 持久化存储引擎，默认是localStorage
 * @param blacklist  黑名单，不持久化指定reducer的状态
 *
 */
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["musicReducer"], // 写在这块的数据不会存在storage
};

// 仓库碎片合并
const reducers = combineReducers({
  musicReducer,
});

// 数据持久化
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //关闭序列化状态检测中间件
      serializableCheck: false,
    }),
});

// 数据持久化存储
export const persist = persistStore(store);

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
