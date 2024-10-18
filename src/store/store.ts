// src/store/store.ts

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { modalReducer } from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    // Weitere Reducer hier hinzufügen
  },
});

// Typen für RootState und AppDispatch ableiten
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Eigene Hooks verwenden
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
