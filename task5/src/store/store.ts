import { configureStore } from "@reduxjs/toolkit";
import couterReduce from "./couterSlice"

export const store = configureStore({
  reducer: {
    counter: couterReduce,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;