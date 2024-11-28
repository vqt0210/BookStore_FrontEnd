import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Swal from'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
        };

        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Confirmed Order",
                text: "Your order placed successfully!",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Redirect to your orders"
            });
            navigate("/orders");
        } catch (error) {
            console.error("Error placing order", error);
            Swal.fire({
                title: "Error",
                text: "Failed to place an order. Please try again.",
                icon: "error",
                confirmButtonColor: "#d33"
            });
        }
    };

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    if (isLoading) return <div>Loading...</div>;

    return (
        <section>
            <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <h2 className="mb-2 text-xl font-semibold text-gray-600">Cash On Delivery</h2>
                        <p className="mb-2 text-gray-500">Total Price: ${totalPrice}</p>
                        <p className="mb-6 text-gray-500">Items: {cartItems.length}</p>

                        <div className="p-4 px-4 mb-6 bg-white rounded shadow-lg md:p-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 my-8 text-sm gap-y-2 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="text-lg font-medium">Personal Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>
                                <div className="lg:col-span-2">
                                    <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name">Full Name</label>
                                            <input
                                                {...register("name", { required: "Full name is required" })}
                                                type="text" name="name" id="name" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" />
                                            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="text" name="email" id="email" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                                                disabled
                                                defaultValue={currentUser?.email}
                                                placeholder="email@domain.com" />
                                        </div>
                                        {/* More form fields with validation error messages */}
                                    </div>
                                </div>
                                <div className="text-right md:col-span-5">
                                    <button
                                        disabled={!isChecked}
                                        type="submit"
                                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Place an Order</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
