import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../features/users/api/userApi';
import toast from 'react-hot-toast';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [photoFile, setPhotoFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("Please fill in all required fields.");
            return;
        }
        try {
            // Prioritize file upload over URL
            if (photoFile) {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('photoURL', photoFile);

                // You cannot log FormData directly. To see its contents, you must iterate over it.
                console.log('--- FormData Contents ---');
                for (const [key, value] of formData.entries()) {
                  console.log(`${key}:`, value);
                }
                console.log('-------------------------');

                await registerUser(formData).unwrap();
            } else {
                // Construct payload and only include photoURL if it's not empty
                const payload = { name, email, password };
                if (photoURL) {
                    payload.photoURL = photoURL;
                }
                await registerUser(payload).unwrap();
            }

            toast.success('Registration successful! You are now logged in.');
            navigate('/dashboard'); // Navigate to the dashboard since the user is now logged in
        } catch (err) {
            toast.error(err?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left px-8">
                    <h1 className="text-5xl font-bold">Join Us!</h1>
                    <p className="py-6">Create an account to start your journey with Exclusive Store. Get access to exclusive deals, track your orders, and manage your wishlist.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="url" placeholder="http://example.com/photo.jpg" className="input input-bordered" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? <span className="loading loading-spinner"></span> : 'Register'}
                            </button>
                        </div>
                        <label className="label">
                            <Link to="/login" className="label-text-alt link link-hover">Already have an account? Login</Link>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;