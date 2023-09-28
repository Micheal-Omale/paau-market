import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import productsReducer from "./features/products/productsSlice";
import authenticationReducer from "./authenticationSlice";
import categoryReducer from "./features/category/categorySlice";
import productPhoneNumberReducer from "./features/products/productPhoneNumberSlice";
import { jsonServerApi } from "./serviceAPI/jsonServerApi";

const rootPersistConfig = {
    key: "root",
    storage,
  },
  /************************************************
   *    SET TO AUTOMERGELEVEL2 TO OVERDRIVED      *
   ***********************************************/
  userPersistConfig = {
    key: "user",
    storage,
    stateReconciler: autoMergeLevel2,
  };

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoryReducer,
  productPhoneNumber: productPhoneNumberReducer,
  user: persistReducer(userPersistConfig, authenticationReducer),
  [jsonServerApi.reducerPath]: jsonServerApi.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
}).concat(jsonServerApi.middleware);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, ...middleware],

  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
