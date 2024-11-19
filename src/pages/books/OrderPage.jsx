import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
    const { currentUser } = useAuth()


    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error geting orders data</div>
    return (
        <div className="container p-6 mx-auto bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-8 text-3xl font-semibold text-center text-indigo-600">Your Orders</h2>

            {orders.length === 0 ? (
                <div className="text-lg text-center text-gray-500">No orders found!</div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order, index) => (
                        <div key={order._id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <p className="w-16 p-2 font-semibold text-center text-white bg-blue-500 rounded-full">Order #{index + 1}</p>
                                <h2 className="text-xl font-bold text-gray-800">Order ID: {order._id}</h2>
                            </div>

                            <div className="mb-4 text-gray-600">
                                <p className="font-medium">Name: <span className="text-gray-800">{order.name}</span></p>
                                <p className="font-medium">Email: <span className="text-gray-800">{order.email}</span></p>
                                <p className="font-medium">Phone: <span className="text-gray-800">{order.phone}</span></p>
                                <p className="font-medium">Total Price: <span className="font-semibold text-green-500">${order.totalPrice}</span></p>
                            </div>

                            <div className="mb-4">
                                <h3 className="mb-2 text-lg font-semibold text-gray-800">Shipping Address:</h3>
                                <p className="text-gray-700">{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                            </div>

                            <div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-800">Product IDs:</h3>
                                <ul className="space-y-2 text-gray-600">
                                    {order.productIds.map((productId) => (
                                        <li key={productId} className="px-4 py-2 rounded-md bg-gray-50">{productId}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}

export default OrderPage