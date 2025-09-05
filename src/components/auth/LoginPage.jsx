import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/api/authApi';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please enter email and password.");
            return;
        }
        try {
            const response = await login({ email, password }).unwrap();
            // Assuming the backend returns { data: { user, accessToken } }
            const { user, accessToken } = response.data;
            dispatch(setUser({ ...user, token: accessToken }));
            toast.success('Logged in successfully!');
            
            if (user.role === 'Admin' || user.role === 'SUPER_ADMIN') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to login. Please check your credentials.');
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left px-8">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Welcome back to Exclusive Store. Access your account to manage your orders and enjoy a seamless shopping experience.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
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
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? <span className="loading loading-spinner"></span> : 'Login'}
                            </button>
                        </div>
                        <label className="label">
                            <Link to="/register" className="label-text-alt link link-hover">Don't have an account? Register</Link>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;