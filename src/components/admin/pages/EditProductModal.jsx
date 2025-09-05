import React, { useState, useEffect } from 'react';
import { useGetCategoriesQuery } from '../../../features/products/api/productApi';

const emptyProduct = {
  product_title: '',
  price: '',
  availability: true,
  product_image: 'https://via.placeholder.com/200',
  description: '',
  specification: '',
  rating: 0,
  category: '',
  quantityInStock: 0,
};

const EditProductModal = ({ product, onSave, onClose, isSaving }) => {
  const [formData, setFormData] = useState(product || emptyProduct);
  const isEditMode = !!product;
  const { data: categories = [] } = useGetCategoriesQuery();

  useEffect(() => {
    if (product) {
      setFormData({ ...product, specification: Array.isArray(product.specification) ? product.specification.join('\n') : '' });
    } else {
      setFormData(emptyProduct);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Convert values to correct types before saving
    onSave({
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
      quantityInStock: Number(formData.quantityInStock),
      specification: typeof formData.specification === 'string'
        ? formData.specification.split('\n').filter(s => s.trim() !== '')
        : formData.specification,
    });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        <h3 className="font-bold text-lg">
          {isEditMode ? `Edit Product: ${product.product_title}` : 'Create New Product'}
        </h3>
        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="product_title"
              value={formData.product_title}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered"
              required
            >
              <option disabled value="">Select a category</option>
              {categories?.map(cat => <option key={cat.id} value={cat.category}>{cat.category}</option>)}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              name="product_image"
              value={formData.product_image}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered"
              required
              minLength="10"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Specification (one per line)</span>
            </label>
            <textarea
              name="specification"
              value={formData.specification}
              onChange={handleChange}
              className="textarea textarea-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Stock Quantity</span>
            </label>
            <input
              type="number"
              name="quantityInStock"
              value={formData.quantityInStock}
              onChange={handleChange}
              className="input input-bordered"
              required
              min="0"
            />
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Available</span>
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
                className="checkbox checkbox-accent"
              />
            </label>
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose} disabled={isSaving}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? <span className="loading loading-spinner"></span> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;