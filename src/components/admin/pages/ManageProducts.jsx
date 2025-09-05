import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useGetProductsQuery,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useAddProductMutation,
} from '../../../features/products/api/productApi';
import { setEditingProduct, clearEditingProduct, setDeletingProduct, clearDeletingProduct } from '../../../features/products/productSlice';
import EditProductModal from './EditProductModal';
import ConfirmationModal from '../../ui/ConfirmationModal';
import toast from 'react-hot-toast';

const ManageProducts = () => {
    const [page, setPage] = React.useState(1);
    // Fetch paginated data. Using a limit of 5 for demonstration.
    const { data, isLoading, isError, error } = useGetProductsQuery({ page, limit: 5 });
    const dispatch = useDispatch();

    // Destructure with default values to prevent errors on initial load
    const { products = [], totalPages = 1 } = data || {};

    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [addProduct, { isLoading: isAdding }] = useAddProductMutation();

    const { editingProductId, deletingProductId } = useSelector((state) => state.product);
    const editingProduct = editingProductId && editingProductId !== 'new' ? products.find(p => p.id === editingProductId) : null;
    const isEditModalOpen = !!editingProductId;
    const isDeleteModalOpen = !!deletingProductId;

    const handleDeleteClick = (id) => {
        dispatch(setDeletingProduct(id));
    };

    const handleConfirmDelete = async () => {
        if (deletingProductId) {
            try {
                await deleteProduct(deletingProductId).unwrap();
                toast.success('Product deleted successfully');
            } catch (err) {
                toast.error(err?.data?.message || 'Failed to delete product');
            } finally {
                dispatch(clearDeletingProduct());
            }
        }
    };

    const handleEdit = (product) => {
        dispatch(setEditingProduct(product.id));
    };

    const handleSaveEdit = async (updatedProduct) => {
        try {
            await updateProduct(updatedProduct).unwrap();
            toast.success('Product updated successfully');
            dispatch(clearEditingProduct());
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update product');
        }
    };

    const handleSaveNew = async (newProduct) => {
        try {
            await addProduct(newProduct).unwrap();
            toast.success('Product created successfully');
            dispatch(clearEditingProduct());
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to create product');
        }
    };

    const handlePreviousPage = () => {
        setPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        // Use totalPages from the API response to prevent going too far
        setPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Manage Products</h1>
                <button onClick={() => dispatch(setEditingProduct('new'))} className="btn btn-primary">
                    + Create Product
                </button>
            </div>

            {isLoading && <div className="text-center py-4"><span className="loading loading-lg loading-spinner"></span></div>}
            {isError && <div className="text-center py-4 text-error">
                Error: {error?.data?.message || 'Failed to load products. Please ensure the backend is running.'}
            </div>}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={product.product_image} alt={product.product_title} />
                                        </div>
                                    </div>
                                </td>
                                <td>{product.product_title}</td>
                                <td>${product.price}</td>
                                <td>{product.availability ? 'In Stock' : 'Stock Out'}</td>
                                <td className='space-x-2'>
                                    <button onClick={() => handleEdit(product)} className="btn btn-sm btn-info" disabled={isDeleting}>Edit</button>
                                    <button onClick={() => handleDeleteClick(product.id)} className="btn btn-sm btn-error" disabled={isDeleting}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1 || isLoading}
                    className="btn"
                >
                    « Previous
                </button>
                <span className="font-semibold">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages || isLoading}
                    className="btn"
                >
                    Next »
                </button>
            </div>
            {isEditModalOpen && (
                <EditProductModal
                    product={editingProduct}
                    onSave={editingProduct ? handleSaveEdit : handleSaveNew}
                    onClose={() => dispatch(clearEditingProduct())}
                    isSaving={isUpdating || isAdding}
                />
            )}
            {isDeleteModalOpen && (
                <ConfirmationModal
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this product? This action cannot be undone."
                    onConfirm={handleConfirmDelete}
                    onClose={() => dispatch(clearDeletingProduct())}
                    isConfirming={isDeleting}
                />
            )}
        </div>
    );
};

export default ManageProducts;