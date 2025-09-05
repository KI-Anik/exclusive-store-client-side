import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useAddUserMutation,
} from '../../../features/users/api/userApi';
import { setEditingUser, clearEditingUser, setDeletingUser, clearDeletingUser } from '../../../features/users/userSlice';
import EditUserModal from './EditUserModal';
import ConfirmationModal from '../../ui/ConfirmationModal';
import toast from 'react-hot-toast';

const ManageUsers = () => {
    const dispatch = useDispatch();
    const { data: usersResponse, isLoading, isError, error } = useGetUsersQuery();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const [addUser, { isLoading: isAdding }] = useAddUserMutation();

    const { editingUserId, deletingUserId } = useSelector((state) => state.users);
    const users = usersResponse?.data || [];
    const editingUser = editingUserId && editingUserId !== 'new' ? users.find(u => u.id === editingUserId) : null;
    const isEditModalOpen = !!editingUserId;
    const isDeleteModalOpen = !!deletingUserId;

    const handleDeleteClick = (id) => {
        dispatch(setDeletingUser(id));
    };

    const handleConfirmDelete = async () => {
        if (deletingUserId) {
            try {
                await deleteUser(deletingUserId).unwrap();
                toast.success('User deleted successfully');
            } catch (err) {
                toast.error(err?.data?.message || 'Failed to delete user');
            } finally {
                dispatch(clearDeletingUser());
            }
        }
    };

    const handleEdit = (user) => {
        dispatch(setEditingUser(user.id));
    };

    const handleSaveEdit = async (updatedUser) => {
        try {
            await updateUser(updatedUser).unwrap();
            toast.success('User updated successfully');
            dispatch(clearEditingUser());
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update user');
        }
    };

    const handleSaveNew = async (newUser) => {
        try {
            await addUser(newUser).unwrap();
            toast.success('User created successfully');
            dispatch(clearEditingUser());
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to create user');
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Manage Users</h1>
                <button onClick={() => dispatch(setEditingUser('new'))} className="btn btn-primary">
                    + Create User
                </button>
            </div>

            {isLoading && <div className="text-center py-4"><span className="loading loading-lg loading-spinner"></span></div>}
            {isError && <div className="text-center py-4 text-error">Error: {error?.data?.message || 'Failed to load users.'}</div>}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <th>{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td><span className={`badge ${user.role === 'Admin' ? 'badge-secondary' : 'badge-ghost'}`}>{user.role}</span></td>
                                <td>{user.joined_date}</td>
                                <td className='space-x-2'>
                                    <button onClick={() => handleEdit(user)} className="btn btn-sm btn-info" disabled={isDeleting}>Edit</button>
                                    <button onClick={() => handleDeleteClick(user.id)} className="btn btn-sm btn-error" disabled={isDeleting}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isEditModalOpen && (
                <EditUserModal
                    user={editingUser}
                    onSave={editingUser ? handleSaveEdit : handleSaveNew}
                    onClose={() => dispatch(clearEditingUser())}
                    isSaving={isUpdating || isAdding}
                />
            )}
            {isDeleteModalOpen && (
                <ConfirmationModal
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this user? This action cannot be undone."
                    onConfirm={handleConfirmDelete}
                    onClose={() => dispatch(clearDeletingUser())}
                    isConfirming={isDeleting}
                />
            )}
        </div>
    );
};

export default ManageUsers;