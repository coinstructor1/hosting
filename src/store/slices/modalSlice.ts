// src/store/slices/modalSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  modalType: ModalType;
  title?: string;
  message?: string;
}
export type ModalType = "NOTIFICATION" | "CONFIRMATION" | null;

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  title: undefined,
  message: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        modalType: ModalType;
        title?: string;
        message?: string;
      }>
    ) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.title = undefined;
      state.message = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;