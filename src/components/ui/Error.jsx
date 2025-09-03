import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className='flex flex-col space-y-5 justify-center items-center min-h-screen'>
            <h2 className="text-5xl text-red-500 font-bold">Sorry, content Not Found!</h2>
            <Link className="btn btn-accent text-xl" to={'/'}>Back to Home</Link>
        </div>
    );
};

export default Error;