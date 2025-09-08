import { Link, } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const RegisterPage = () => {

    const handleRegister = e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value
        const password = form.password.value

    }


    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Registration!</h1>
                    <p className="py-6">
                        Create an account to start your journey with Exclusive Store. Get access to exclusive deals, track your orders,
                        and manage your wishlist.
                    </p>

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl card-body">
                    <button className="btn "> <FaGoogle></FaGoogle> Contionue with Google</button>
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
                            <input name="photo" type="url" placeholder="Provide your profile photo link" className="input input-bordered" required />
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
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <p className="text-center pb-5 font-semibold">
                        Already have an account? <Link to={'/auth/login'} className="text-blue-600 underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;