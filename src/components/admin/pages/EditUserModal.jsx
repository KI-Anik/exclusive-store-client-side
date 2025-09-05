import React, { useState, useEffect } from 'react';

const emptyUser = {
  name: '',
  email: '',
  password: '',
  role: 'User',
};

const EditUserModal = ({ user, onSave, onClose, isSaving }) => {
  const [formData, setFormData] = useState(user || emptyUser);
  const isEditMode = !!user;

  useEffect(() => {
    setFormData(user || emptyUser);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        <h3 className="font-bold text-lg">
          {isEditMode ? `Edit User: ${user.name}` : 'Create New User'}
        </h3>
        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          {!isEditMode && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select name="role" value={formData.role} onChange={handleChange} className="select select-bordered">
              <option>User</option>
              <option>Admin</option>
            </select>
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

export default EditUserModal;