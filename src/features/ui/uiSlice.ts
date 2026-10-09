import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface UiState {
  activeModal: string | null;
  quickDonationAmount: number;
}

const initialState: UiState = {
  activeModal: null,
  quickDonationAmount: 1000,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
    setQuickDonationAmount: (state, action: PayloadAction<number>) => {
      state.quickDonationAmount = action.payload;
    },
  },
});

export const { setActiveModal, setQuickDonationAmount } = uiSlice.actions;

export const selectActiveModal = (state: RootState) => state.ui.activeModal;
export const selectQuickDonationAmount = (state: RootState) => state.ui.quickDonationAmount;

export default uiSlice.reducer;
