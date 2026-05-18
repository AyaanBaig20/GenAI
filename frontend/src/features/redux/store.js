import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Slices/authSlices"
import aiReducer from "./Slices/aiSlices"
export const store = configureStore({
  reducer: {
    auth:authReducer,
    ai:aiReducer,
  },
})