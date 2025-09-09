# Exclusive Store

Welcome to **Exclusive-store**, your one-stop shop for the latest gadgets! This project is a feature-rich React application built with modern web technologies. It allows users to browse products, add them to a cart or wishlist, sort items by price, and experience a seamless purchase process.

## Live Website

[**Exclusive-store**](https://khairul-islam-3a35f.web.app/)


## Features

-   **Dynamic Product Catalog**: Browse a wide range of available gadgets.
-   **Category Filtering**: Easily filter products by category to find what you're looking for.
-   **Cart & Wishlist**: Add items to your cart or wishlist with a single click. Duplicate entries are prevented to keep your lists clean.
-   **Dynamic Price Management**: The total price in the cart updates in real-time as items are added or removed.
-   **Sort by Price**: Users can sort products in ascending or descending order based on price.
-   **Persistent State**: Your cart and wishlist are saved in `localStorage`, so they persist across browser sessions.
-   **Simulated Purchase Process**: A smooth, multi-step simulated purchase process with a final confirmation modal.
-   **Responsive Design**: A seamless and intuitive user experience on all devices, from mobile phones to desktops.

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
-   **Icons**: React Icons

---

## Core Concepts Implemented

-   **Component-Based Architecture**: The UI is built with reusable and composable React components, promoting modularity and maintainability.
-   **Centralized State Management**: Redux Toolkit provides a predictable and centralized state container, managing the cart, wishlist, and other global application states.
-   **Efficient Data Fetching**: RTK Query handles API requests, caching, and data synchronization, simplifying data fetching logic and eliminating the need for manual loading and error state management.
-   **Client-Side Routing**: `react-router-dom` enables seamless, single-page application navigation without page reloads.
-   **React Hooks**: Extensive use of React hooks like `useState`, `useEffect`, `useMemo`, and custom hooks for logic reuse and clean component design.
-   **Conditional Rendering**: Dynamically rendering UI elements based on application state, such as showing "Add to Cart" or "Already in Cart" buttons.
-   **Local Storage Persistence**: The cart and wishlist state is persisted in the browser's `localStorage` to provide a consistent user experience across sessions.

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18.x or later)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/KI-Anik/exclusive-store-client-side.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd exclusive-store-client-side
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Firebase configuration. You can use `.env.example` as a template.
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```
    *Note: You can find these keys in your Firebase project settings.*

### Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode. Open http://localhost:5173 to view it in the browser. The page will automatically reload if you make edits.

-   `npm run build`: Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

-   `npm run lint`: Lints the project files for code quality and style issues.

-   `npm run preview`: Serves the production build locally to preview it before deployment.

---

## Project Structure

```
exclusive-store-client-side/
├── public/
├── src/
│   ├── api/              # RTK Query API slices
│   ├── app/              # Redux store configuration
│   ├── assets/           # Static assets like images, fonts
│   ├── components/       # Reusable UI components
│   ├── features/         # Redux slices for different features (cart, wishlist)
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Layout components (e.g., MainLayout)
│   ├── pages/            # Page components for different routes
│   ├── routes/           # React Router configuration
│   ├── utils/            # Utility functions
│   ├── App.jsx
│   └── main.jsx          # Application entry point
├── .env.example
├── eslint.config.js
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
