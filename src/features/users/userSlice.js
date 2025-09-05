import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editingUserId: null, // To track which user is being edited
  deletingUserId: null, // To track which user is being considered for deletion
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setEditingUser: (state, action) => {
      state.editingUserId = action.payload;
    },
    clearEditingUser: (state) => {
      state.editingUserId = null;
    },
    setDeletingUser: (state, action) => {
      state.deletingUserId = action.payload;
    },
    clearDeletingUser: (state) => {
      state.deletingUserId = null;
    },
  },
});

export const { setEditingUser, clearEditingUser, setDeletingUser, clearDeletingUser } = userSlice.actions;
export default userSlice.reducer;
