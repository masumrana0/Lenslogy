// store/store.ts
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../rootReducer";
import { baseApi } from "../api/baseApi";
const apiMiddleware = baseApi.middleware;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

// Types for the store
// export type AppStore = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
