# Exclusive-store

Welcome to **Exclusive-store**, your one-stop shop for the latest gadgets! This project is a feature-rich React application that allows users to browse, add gadgets to their cart or wishlist, sort items by price, and experience a seamless purchase process.

## Live Website
[Exclusive-store](https://gadget-sto.surge.sh)

---

## Features
1. **Add to Cart & Wishlist**: Users can add gadgets to their cart or wishlist with checks to avoid duplicate entries.
2. **Price Management**: The total price dynamically updates as items are added or removed.
3. **Sort By Price**: Users can sort items in ascending or descending order by price.
4. **Purchase Functionality**: Users can simulate a purchase and see a success modal upon completion.

---

## React Fundamentals Used
- **Components**: Reusable and composable components for efficient development.
- **State Management**: `useState` for managing local states like cart and wishlist items.
- **Effect Hook**: `useEffect` for performing side effects such as fetching data and updating state on component load.
- **Routing**: `react-router-dom` for implementing multi-page routing.
- **Conditional Rendering**: Used for dynamically showing buttons and modals based on application state.

---

## Data Handling
We used **localStorage** to manage persistent data for the cart and wishlist. This ensures that user data remains available even after refreshing the page.

---

## Technologies Used
- **React**: Frontend framework
- **Tailwind CSS**: For styling and responsiveness
- **DaisyUI**: For pre-styled UI components
- **React Router**: For navigation
- **React Hot Toast**: For notifications