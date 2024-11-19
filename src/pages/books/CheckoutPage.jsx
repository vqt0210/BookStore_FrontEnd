import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/'); // Redirect to products page
        }
    }, [cartItems, navigate]);

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
        };

        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Confirmed Order",
                text: "Your order was placed successfully!",
                icon: "success",
                confirmButtonText: "Go to Orders"
            }).then(() => navigate("/orders"));
        } catch (error) {
            console.error("Error placing order", error);
            alert("Failed to place the order");
        }
    };

    if (isLoading) return <div>Loading....</div>
    return (
        <section>
            <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
                <div className="container max-w-screen-md mx-auto bg-white rounded-lg shadow-lg">
                    <div className="p-6">
                        <h2 className="mb-4 text-3xl font-semibold text-center text-indigo-600">Cash On Delivery</h2>
                        <p className="mb-6 text-lg text-center text-gray-600">Total Price: <span className="text-green-600">${totalPrice}</span></p>
                        <p className="mb-8 text-lg text-center text-gray-600">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>

                        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm md:grid md:grid-cols-2 md:gap-x-8">
                                <div className="space-y-2">
                                    <p className="text-lg font-medium text-gray-700">Personal Details</p>
                                    <p className="text-sm text-gray-500">Please fill out all the fields.</p>
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        {...register("name", { required: true })}
                                        type="text" name="name" id="name"
                                        className="w-full h-12 px-4 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email" name="email" id="email"
                                        disabled
                                        defaultValue={currentUser?.email}
                                        className="w-full h-12 px-4 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="email@domain.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        {...register("phone", { required: true })}
                                        type="tel" name="phone" id="phone"
                                        className="w-full h-12 px-4 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="+123 456 7890"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address / Street</label>
                                    <input
                                        {...register("address", { required: true })}
                                        type="text" name="address" id="address"
                                        className="w-full h-12 px-4 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        {...register("city", { required: true })}
                                        type="text" name="city" id="city"
                                        className="w-full h-12 px-4 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country / Region</label>
                                    <input
                                        {...register("country", { required: true })}
                                        type="text" name="country" id="country"
                                        className="w-full h-12 px-4 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Country"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                                    <input
                                        {...register("state", { required: true })}
                                        type="text" name="state" id="state"
                                        className="w-full h-12 px-4 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="State"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">Zipcode</label>
                                    <input
                                        {...register("zipcode", { required: true })}
                                        type="text" name="zipcode" id="zipcode"
                                        className="w-full h-12 px-4 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div className="space-y-4 md:col-span-2">
                                    <div className="inline-flex items-center space-x-2">
                                        <input
                                            onChange={(e) => setIsChecked(e.target.checked)}
                                            type="checkbox" name="billing_same" id="billing_same"
                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <label htmlFor="billing_same" className="text-sm text-gray-700">I agree to the <Link className="text-indigo-600 underline">Terms & Conditions</Link> and <Link className="text-indigo-600 underline">Shopping Policy</Link></label>
                                    </div>
                                </div>

                                <div className="text-right md:col-span-2">
                                    <button
                                        disabled={!isChecked}
                                        className={`px-6 py-3 text-lg font-semibold text-white rounded-lg w-full ${!isChecked ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
                                    >
                                        Place an Order
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CheckoutPage
