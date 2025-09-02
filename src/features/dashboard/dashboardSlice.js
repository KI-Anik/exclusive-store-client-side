import { createSlice, current } from "@reduxjs/toolkit";
import { getStoredList } from "../../utils/localStorage";

const initialState = {
    carts: getStoredList('carts').map((item) => ({ ...item, quantity: item.quantity || 1 })),
    wishLists: getStoredList('wish-list')
}

const dashboradSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        addTOCart: (state, action) => {
            const itemToAdd = action.payload
            const existingItem = state.carts.find(item => item.id === itemToAdd.id)
            console.log(existingItem);
            if (!existingItem) {
                state.carts.push({ ...itemToAdd, quantity: 1 })
                localStorage.setItem('cart', JSON.stringify(current(state.carts)))
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const itemInCart = state.carts.find(item => item.id === id)
            if (itemInCart) {
                itemInCart.quantity = quantity
                localStorage.setItem('cart', JSON.stringify(current(state.carts)))
            }
        },
        removeItem: (state, action) => {
            const idToRemove = action.payload
            state.carts = state.carts.filter(item => item.id !== idToRemove)
            localStorage.setItem('cart', JSON.stringify(current(state.carts)))
        },
        moveToCartFromWishList: (state, action) => {
            const itemToMove = action.payload
            // remove from wish list
            state.wishLists = state.wishLists.filter(item => item.id !== itemToMove.id)
            localStorage('wish-list', JSON.stringify(current(state.wishLists)))
            // add to cart if not already there
            const existingItem = state.carts.find(item => item.id === itemToMove.id)
            if (!existingItem) {
                state.carts.push({ ...itemToMove, quantity: 1 })
                localStorage.setItem('cart', JSON.stringify(current(state.carts)))
            }

        }
    }
})

export const { addTOCart, updateQuantity, removeItem, moveToCartFromWishList } = dashboradSlice.actions

export default dashboradSlice.reducer

