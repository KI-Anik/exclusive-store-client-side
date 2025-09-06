import { createSlice } from "@reduxjs/toolkit";
import { getStoredList } from '../../utils/localStorage';
import { setUser, logOut } from '../auth/authSlice';

const initialState = {
    carts: getStoredList('cart_guest').map((item) => ({ ...item, quantity: item.quantity || 1 })),
    wishLists: getStoredList('wish-list_guest'),
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUser, (state, action) => {
                // When a user logs in, merge their guest cart with their persisted user cart.
                const userId = action.payload.user?._id;
                if (userId) {
                    const guestCart = state.carts;
                    const guestWishList = state.wishLists;

                    const userCart = getStoredList(`cart_${userId}`);
                    const userWishList = getStoredList(`wish-list_${userId}`);

                    // Merge carts using a Map to handle duplicates and combine quantities.
                    const mergedCartMap = new Map();
                    // First, add all items from the user's cart to the map.
                    userCart.forEach(item => mergedCartMap.set(item.id, { ...item, quantity: item.quantity || 1 }));

                    // Now, iterate through the guest cart.
                    guestCart.forEach(guestItem => {
                        if (mergedCartMap.has(guestItem.id)) {
                            // If item exists, update its quantity.
                            const existingItem = mergedCartMap.get(guestItem.id);
                            existingItem.quantity += guestItem.quantity || 1;
                        } else {
                            // If item doesn't exist, add it to the map.
                            mergedCartMap.set(guestItem.id, { ...guestItem, quantity: guestItem.quantity || 1 });
                        }
                    });
                    state.carts = Array.from(mergedCartMap.values());

                    // Merge wishlists with the same logic.
                    const mergedWishListMap = new Map();
                    userWishList.forEach(item => mergedWishListMap.set(item.id, item));
                    guestWishList.forEach(item => {
                        if (!mergedWishListMap.has(item.id)) {
                            mergedWishListMap.set(item.id, item);
                        }
                    });
                    state.wishLists = Array.from(mergedWishListMap.values());

                    // Clean up guest data from localStorage after merging.
                    localStorage.removeItem('cart_guest');
                    localStorage.removeItem('wish-list_guest');
                }
            })
            .addCase(logOut, (state) => {
                // When a user logs out, clear their cart and wishlist from the state.
                Object.assign(state, { ...initialState, carts: [], wishLists: [] });
                // Also clear guest storage on logout to prevent guest cart from reappearing.
                localStorage.removeItem('cart_guest');
                localStorage.removeItem('wish-list_guest');
            });
    },
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
