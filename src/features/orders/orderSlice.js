import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isPurchaseModalOpen: false,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        openPurchaseModal: (state) => {
            state.isPurchaseModalOpen = true;
        },
        closePurchaseModal: (state) => {
            state.isPurchaseModalOpen = false;
        },
    },
});

export const { openPurchaseModal, closePurchaseModal } = orderSlice.actions;
export default orderSlice.reducer;