import { configureStore } from "@reduxjs/toolkit";

// Reducers
import DisplayReducer from "./Slices/DisplaySlice";
import UserReducer from "./Slices/UserSlice";

export const store = configureStore({
  reducer: {
    display: DisplayReducer,
    user: UserReducer,
  },
});