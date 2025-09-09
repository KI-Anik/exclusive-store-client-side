import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useLoginMutation } from '../../app/api/authApi';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [login, { data, isLoading, isError, error, isSuccess }] = useLoginMutation();

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);

        if (!email || !password) {
            toast.error("Please enter email and password.");
            return;
        }

        await login({ email, password });
    };

    useEffect(() => {
        if (isSuccess && data) {
            toast.success('Logged in successfully!');
            const from = location.state?.from?.pathname || '/';
            const user = data?.data?.user;

            if (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') {
                navigate('/dashboard');
            } else {
                navigate(from, { replace: true });
            }
        }
        if (isError) {
            toast.error(error?.data?.message || 'Failed to login. Please check your credentials.');
        }
    }, [isSuccess, isError, data, error, navigate, location]);


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left px-8">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Welcome back to Exclusive Store. Access your account to manage your orders and enjoy a seamless shopping experience.</p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl card-body">
                    <button className="btn"> <FaGoogle></FaGoogle> Continue with Google</button>
                    <div className="text-xl font-bold text-center">
                        Or
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                    <p className="text-center pt-4 font-semibold">Don&apos;t have an account? <Link to={'/auth/register'} className="text-red-600 underline">Register</Link> Now</p>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;