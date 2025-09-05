import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, // No user logged in initially
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logOut: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
