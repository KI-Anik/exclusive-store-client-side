/**
 * This "barrel" file is used to export all of the public-facing
 * pages, components, hooks, and API functions from the `products` feature directory.
 * This provides a single, clean entry point for other parts of the application.
 */

// Pages
export { default as AllProductsPage } from './pages/AllProductsPage';
export { default as ProductDetailsPage } from './pages/ProductDetailsPage';

// Components
export { default as ProductList } from './components/ProductList';
export { default as ProductCard } from './components/ProductCard';

// Exporting API hooks from your API slice
export { useGetProductsQuery, useGetProductQuery, useGetCategoriesQuery } from './api/productApi';
