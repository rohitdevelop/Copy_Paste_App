import { configureStore } from '@reduxjs/toolkit';
import PasteReducer from './Redux/PasteSlice';

export const store = configureStore({
  reducer: {
    Paste: PasteReducer,   
  },
});
