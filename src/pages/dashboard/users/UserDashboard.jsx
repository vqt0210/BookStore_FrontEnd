import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';

const UserDashboard = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error getting orders data</div>;
    const userName = currentUser?.email?.split('@')[0] || 'User';

    return (
        <div className="py-16 bg-gray-100">
            <div className="max-w-4xl p-6 mx-auto transition-transform transform bg-white rounded-lg shadow-xl hover:scale-105">
                <h1 className="mb-4 text-2xl font-semibold tracking-wide text-indigo-600">My Dashboard</h1>
                <p className="mb-6 text-lg text-gray-700">Welcome, {userName}! Here are your recent orders:</p>

                <div className="mt-6">
                    <h2 className="mb-4 text-xl font-medium text-gray-800">Your Orders</h2>
                    {orders.length > 0 ? (
                        <ul className="space-y-4">
                            {orders.map((order) => (
                                <li key={order._id} className="p-4 space-y-1 transition-shadow duration-300 border border-blue-200 rounded-lg shadow-sm bg-blue-50 hover:shadow-lg">
                                    <p className="text-gray-600">Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
                                    <p className="font-semibold text-green-600">Total: ${order.totalPrice}</p>
                                    {order.productIds.map((productId) => (
                                        <p key={productId} className="ml-1 text-gray-600">{productId}</p>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">You have no recent orders.</p>
                    )}
                </div>
            </div>
        </div>




    );
};

export default UserDashboard;
