import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useRegisterMutation } from "../../app/api/userApi";
import toast from "react-hot-toast";
import { useEffect } from "react";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [register, { data, isLoading, isSuccess, isError, error }] = useRegisterMutation();

    const handleRegister = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        const userInfo = { name, email, password };
        if (photo) {
            userInfo.photo = photo;
        }

        await register(userInfo);
    };

    useEffect(() => {
        if (isSuccess && data) {
            toast.success("Registered and logged in successfully!");
            navigate("/");
        }
        if (isError) {
            toast.error(error?.data?.message || "Registration failed. Please try again.");
        }
    }, [isSuccess, isError, data, error, navigate]);


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left px-8">
                    <h1 className="text-5xl font-bold">Registration!</h1>
                    <p className="py-6">
                        Create an account to start your journey with Exclusive Store. Get access to exclusive deals, track your orders,
                        and manage your wishlist.
                    </p>

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl card-body">
                    <button className="btn "> <FaGoogle></FaGoogle> Continue with Google</button>
                    <div className="text-xl font-bold text-center">
                        Or
                    </div>
                    <form onSubmit={handleRegister}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo-URL</span>
                            </label>
                            <input name="photo" type="url" placeholder="Provide your profile photo link" className="input input-bordered" />
                        </div>
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
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                    </form>
                    <p className="text-center pt-4 font-semibold">
                        Already have an account? <Link to={'/auth/login'} className="text-blue-600 underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;