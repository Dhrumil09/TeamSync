// store/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "./slices/userSlice";
import helperReducer from "./slices/helperSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import anotherSliceReducer from "./slices/anotherSlice";
import { loginAPI } from "../api/loginApi";
import { manageProjectsAPI } from "../api/manageProjects";
import { manageAdminLeadsProjectAPI } from "../api/manageAdminLeads";
import { manageUsersAPI } from "../api/manageUsers";
import { userProjectApi } from "../api/userProjectApi";

// Configure persist settings
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  //   whitelist: ["anotherSlice"], // Persist only this slice
  // Alternatively, you can use blacklist to exclude certain slices:
  // blacklist: ['user'], // Do NOT persist the `user` slice
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  helper: helperReducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  [manageProjectsAPI.reducerPath]: manageProjectsAPI.reducer,
  [manageAdminLeadsProjectAPI.reducerPath]: manageAdminLeadsProjectAPI.reducer,
  [manageUsersAPI.reducerPath]: manageUsersAPI.reducer,
  [userProjectApi.reducerPath]: userProjectApi.reducer,
  // This slice will NOT be persisted
  //   anotherSlice: anotherSliceReducer, // This slice WILL be persisted
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      loginAPI.middleware,
      manageProjectsAPI.middleware,
      manageAdminLeadsProjectAPI.middleware,
      manageUsersAPI.middleware,
      userProjectApi.middleware,
    ]),
});

// Persistor
export const persistor = persistStore(store);
