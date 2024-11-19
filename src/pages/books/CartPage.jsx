import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch()

    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }
    return (
        <>
            <div className="flex flex-col h-full mt-12 overflow-hidden bg-white rounded-md shadow-md">
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-800">Shopping Cart</h2>
                        <div className="flex items-center ml-3 h-7">
                            <button
                                type="button"
                                onClick={handleClearCart}
                                className="px-3 py-1 text-white bg-red-500 rounded-md"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flow-root">
                            {cartItems.length > 0 ? (
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {cartItems.map((product) => (
                                        <li key={product?._id} className="flex py-6">
                                            <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                                                <img
                                                    alt=""
                                                    src={`${getImgUrl(product?.coverImage)}`}
                                                    className="object-cover object-center w-full h-full"
                                                />
                                            </div>

                                            <div className="flex flex-col flex-1 ml-4">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-800">
                                                        <h3>
                                                            <Link to={`/books/${product?._id}`}>
                                                                {product?.title}
                                                            </Link>
                                                        </h3>
                                                        <p className="sm:ml-4">${product?.newPrice}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500"><strong>Category:</strong> {product?.category}</p>
                                                </div>
                                                <div className="flex items-end justify-between flex-1 mt-4 text-sm">
                                                    <p className="text-gray-500"><strong>Qty:</strong> 1</p>
                                                    <button
                                                        onClick={() => handleRemoveFromCart(product)}
                                                        type="button"
                                                        className="font-medium text-red-500"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-4 text-center text-gray-600">No products found in your cart.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-6 py-6 border-t border-gray-200 bg-gray-50 rounded-b-md">
                    <div className="flex justify-between text-base font-medium text-gray-800">
                        <p>Subtotal</p>
                        <p>${totalPrice ? totalPrice : 0}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                        <Link to="/" className="font-medium text-blue-600">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CartPage