import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBox, FaMapMarkerAlt } from 'react-icons/fa';

const MyOrderPage = () => {
    return (
       <div className="container mx-auto p-4 md:p-8">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-4 border-b border-base-300">
                        <div>
                            <h1 className="text-2xl font-bold">Order Details</h1>
                            <p className="text-sm text-gray-500">Order ID: <span className="font-mono">123</span></p>
                            <p className="text-sm text-gray-500">Placed on: {new Date().toLocaleString()}</p>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-sm">Total Amount</p>
                            <p className="font-bold text-2xl text-primary">$500</p>
                        </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Order Status</h2>
                        pending
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Shipping Details */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FaMapMarkerAlt /> Shipping Address</h2>
                            <div className="p-4 bg-base-200 rounded-lg">
                                <p className="font-semibold">Khairul Islam</p>
                                <p>khairul@mail.com</p>
                                <p className="mt-2">Faridpur</p>
                            </div>
                        </div>

                        {/* Items Ordered */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FaBox /> Items Ordered 5</h2>
                            <div className="space-y-3">
                                    
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="card-actions justify-end mt-8 pt-4 border-t border-base-300">
                        <Link to="/order" className="btn btn-ghost">Back to My Orders</Link>
                        <button className="btn btn-primary">Contact Support</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrderPage;