# Exclusive-store

Welcome to **Exclusive-store**, your one-stop shop for the latest gadgets! This project is a feature-rich React application built with modern web technologies. It allows users to browse products, add them to a cart or wishlist, sort items by price, and experience a seamless purchase process.

## Live Website

[**Exclusive-store**](https://exclusive-store-client-side.vercel.app/)

---

## Features

-   **Dynamic Product Catalog**: Browse a wide range of available gadgets.
-   **Category Filtering**: Filter products by category.
-   **Add to Cart & Wishlist**: Easily add items to your cart or wishlist. Duplicate entries are prevented.
-   **Price Management**: The total price dynamically updates as items are added or removed from the cart.
-   **Sort By Price**: Users can sort items in ascending or descending order by price.
-   **Persistent State**: Your cart and wishlist are saved in `localStorage`, so they persist across browser sessions.
-   **Purchase Simulation**: A smooth, simulated purchase process with a confirmation modal.
-   **Responsive Design**: A great user experience on all devices, from mobile phones to desktops.

---

## Technologies Used

This project is built with a modern, robust stack:

-   **Framework**: React
-   **Build Tool**: Vite
-   **State Management**: Redux Toolkit
-   **Data Fetching**: RTK Query
-   **Routing**: React Router
-   **Styling**: Tailwind CSS
-   **UI Components**: DaisyUI
-   **Notifications**: React Hot Toast
-   **Linting**: ESLint

---

## Core Concepts Implemented

-   **Component-Based Architecture**: The UI is built with reusable and composable React components.
-   **Centralized State Management**: Redux Toolkit is used for a predictable and centralized state container, managing the cart, wishlist, and other global states.
-   **Efficient Data Fetching**: RTK Query handles API requests, caching, and synchronization, simplifying data fetching logic and eliminating the need for manual loading/error state management.
-   **Client-Side Routing**: `react-router-dom` provides seamless, single-page application navigation.
-   **Hooks**: Extensive use of React hooks like `useState`, `useMemo`, and custom hooks for logic reuse.
-   **Conditional Rendering**: Dynamically rendering UI elements based on application state, such as showing "Add to Cart" or "Already in Cart" buttons.
-   **Local Storage Persistence**: The cart and wishlist state is persisted in the browser's `localStorage` to provide a consistent user experience across sessions.

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18.x or later)
-   npm or yarn

### Installation & Setup

1.  Clone the repository:
    ```sh
    git clone https://github.com/KI-Anik/exclusive-store-client-side
    ```
2.  Navigate to the project directory:
    ```sh
    cd exclusive-store-client-side
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

### Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode. Open http://localhost:5173 to view it in the browser. The page will reload if you make edits.

-   `npm run build`: Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

-   `npm run lint`: Lints the project files for code quality and style issues.

-   `npm run preview`: Serves the production build locally to preview it before deployment.

