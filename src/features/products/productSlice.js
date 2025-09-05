import { createSlice } from "@reduxjs/toolkit";
import { getStoredList } from '../../utils/localStorage';

const initialState = {
    carts: getStoredList('cart').map((item) => ({ ...item, quantity: item.quantity || 1 })),
    wishLists: getStoredList('wish-list'),
    editingProductId: null, // To track which product is being edited
    deletingProductId: null, // To track which product is being considered for deletion
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemToAdd = action.payload;
            const existingItem = state.carts.find(item => item.id === itemToAdd.id);
            if (!existingItem) {
                state.carts.push({ ...itemToAdd, quantity: 1 });
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const itemInCart = state.carts.find(item => item.id === id);
            if (itemInCart) {
                itemInCart.quantity = quantity;
            }
        },
        removeFromCart: (state, action) => {
            const idToRemove = action.payload;
            state.carts = state.carts.filter(item => item.id !== idToRemove);
        },

        // wishList section
        addToWishlist: (state, action) => {
            const itemToAdd = action.payload;
            const existingItem = state.wishLists.find(item => item.id === itemToAdd.id);
            if (!existingItem) {
                state.wishLists.push(itemToAdd);
            }
        },
        moveToCartFromWishList: (state, action) => {
            const itemToMove = action.payload;
            // remove from wish list
            state.wishLists = state.wishLists.filter(item => item.id !== itemToMove.id);
            // add to cart if not already there
            const existingItem = state.carts.find(item => item.id === itemToMove.id);
            if (!existingItem) {
                state.carts.push({ ...itemToMove, quantity: 1 });
            }
        },
        removeFromWishlist: (state, action) => {
            const idToRemove = action.payload;
            state.wishLists = state.wishLists.filter(item => item.id !== idToRemove);
        },

        // extra
        clearCart: (state) => {
            state.carts = [];
        },
        sortByPrice: (state) => {
            // Use slice() or the spread operator to create a shallow copy before sorting
            state.carts = [...state.carts].sort((a, b) => a.price - b.price);
            state.wishLists = [...state.wishLists].sort((a, b) => a.price - b.price);
        },
        setEditingProduct: (state, action) => { // Edit modal state
            state.editingProductId = action.payload;
        },
        clearEditingProduct: (state) => {
            state.editingProductId = null;
        },
        setDeletingProduct: (state, action) => { // Delete modal state
            state.deletingProductId = action.payload;
        },
        clearDeletingProduct: (state) => {
            state.deletingProductId = null;
        },
    }
});

export const {
    addToCart,
    updateQuantity,
    removeFromCart,
    addToWishlist,
    moveToCartFromWishList,
    removeFromWishlist,
    clearCart,
    sortByPrice,
    setEditingProduct,
    clearEditingProduct,
    setDeletingProduct,
    clearDeletingProduct,
} = productSlice.actions;

export default productSlice.reducer;
