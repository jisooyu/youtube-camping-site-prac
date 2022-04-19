import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import campReducer from '../features/camps/campSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    camps: campReducer,
  },
});
