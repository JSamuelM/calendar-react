import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDateModalOpen: false,
  isAlertOpen: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
    onAlertOpen: (state) => {
      state.isAlertOpen = true;
    },
    onAlertClose: (state) => {
      state.isAlertOpen = false;
    }
  }
});

export const {
  onCloseDateModal,
  onOpenDateModal,
  onAlertClose,
  onAlertOpen,
} = uiSlice.actions
