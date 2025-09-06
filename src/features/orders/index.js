/**
 * This "barrel" file is used to export all of the public-facing
 * pages, components, and API functions from the `orders` feature directory.
 */

export { default as OrderPage } from './OrderPage';
export { default as SingleOrderPage } from '../products/pages/SingleOrderPage';
export * from './api/orderApi';