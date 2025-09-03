/**
 * This "barrel" file is used to export all of the public-facing
 * components, hooks, and API functions from the `products` feature directory.
 * This provides a single, clean entry point for other parts of the application.
 */
export { default as ProductDetails } from './ProductDetailsPage';
export { default as ProductList } from './components/ProductList';

// Exporting API hooks from your API slice
// export { useGetProductsQuery, useGetProductByIdQuery } from './api/productApi';

// Exporting custom hooks
// export { default as useProductPricing } from './hooks/useProductPricing';

