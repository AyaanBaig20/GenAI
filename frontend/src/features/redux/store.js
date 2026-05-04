import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Slices/authSlices"
export const store = configureStore({
  reducer: {
    auth:authReducer
  },
})