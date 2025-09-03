import { createSlice, current } from "@reduxjs/toolkit";
import { getStoredList } from '../../utils/localStorage';



const initialState = {
    carts: getStoredList('cart').map((item) => ({ ...item, quantity: item.quantity || 1 })),
    wishLists: getStoredList('wish-list')
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemToAdd = action.payload
            const existingItem = state.carts.find(item => item.id === itemToAdd.id)
            console.log('existingITem', existingItem);
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
        removeFromCart: (state, action) => {
            const idToRemove = action.payload
            state.carts = state.carts.filter(item => item.id !== idToRemove)
            localStorage.setItem('cart', JSON.stringify((state.carts)))
        },

        // wishList section
        addToWishlist: (state, action) => {
            const itemToAdd = action.payload
            const existingItem = state.wishLists.find(item => item.id === itemToAdd.id)
            if (!existingItem) {
                state.wishLists.push(itemToAdd)
                localStorage.setItem('wish-list', JSON.stringify(current(state.wishLists)))
            }
        },
        moveToCartFromWishList: (state, action) => {
            const itemToMove = action.payload
            console.log(itemToMove);
            // remove from wish list
            state.wishLists = state.wishLists.filter(item => item.id !== itemToMove.id)
            localStorage.setItem('wish-list', JSON.stringify((state.wishLists)))
            // add to cart if not already there
            const existingItem = state.carts.find(item => item.id === itemToMove.id)
            if (!existingItem) {
                state.carts.push({ ...itemToMove, quantity: 1 })
                localStorage.setItem('cart', JSON.stringify(current(state.carts)))
            }
        },
        removeFromWishlist: (state, action) => {
            console.log(action.payload, 'slice');
            const idToRemove = action.payload
            state.wishLists = state.wishLists.filter(item => item.id !== idToRemove)
            localStorage.setItem('wish-list', JSON.stringify((state.wishLists)))
        },

        // extra
        clearCart: (state) => {
            state.carts = [];
            localStorage.setItem('cart', JSON.stringify([]));
        },
        sortByPrice: (state) => {
            state.carts.sort((a, b) => a.price - b.price),
                state.wishLists.sort((a, b) => a.price - b.price)
        }


    }
})

export const { addToCart, updateQuantity, removeFromCart, addToWishlist, moveToCartFromWishList, removeFromWishlist, clearCart, sortByPrice } = productSlice.actions

export default productSlice.reducer
