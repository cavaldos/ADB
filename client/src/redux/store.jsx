import countSlice from "./features/countSlice";
import authSlice from "./features/authSlice";
import globalState from "./features/globalState";
import profileSlice from "./features/profileSlice";
import resetStateSlice from "./features/resetStateSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["count", "auth", "profile"],
};
const rootReducer = combineReducers({
  count: countSlice,
  auth: authSlice,
  resetState: resetStateSlice,
  globalState: globalState,
  profile: profileSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);

export default store;
