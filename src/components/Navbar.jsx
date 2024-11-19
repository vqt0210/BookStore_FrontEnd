import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import squid from "../assets/squid.jpg"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
]

const Navbar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const cartItems = useSelector(state => state.cart.cartItems);

    const { currentUser, logout } = useAuth()

    const handleLogOut = () => {
        logout()
    }

    const token = localStorage.getItem('token');

    return (
        <header className="w-full px-6 py-6 mx-auto mb-0 text-white bg-gray-900">
            <nav className="flex items-center justify-between">

                
                <div className="flex items-center gap-6 md:gap-10">
                    <Link to="/" className="text-white hover:text-primary">
                        <HiMiniBars3CenterLeft className="text-2xl" />
                    </Link>

                    <div className="relative flex items-center space-x-4 md:space-x-6">
                        
                        <div>
                            {currentUser ? (
                                <>
                                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                        <img
                                            src={squid}
                                            alt="User Avatar"
                                            className={`w-10 h-10 rounded-full ${currentUser ? 'ring-2 ring-indigo-300' : ''}`}
                                        />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 z-40 w-48 mt-2 bg-white rounded-md shadow-lg">
                                            <ul className="py-2">
                                                {navigation.map((item) => (
                                                    <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                        <Link to={item.href} className="block px-4 py-2 text-sm text-black hover:bg-indigo-100">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                                <li>
                                                    <button
                                                        onClick={handleLogOut}
                                                        className="block w-full px-4 py-2 text-sm text-left text-black hover:bg-indigo-100">
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </>
                            ) : token ? (
                                <Link to="/dashboard" className="text-white border-b-2 border-primary hover:text-primary">Dashboard</Link>
                            ) : (
                                <Link to="/login" className="hover:text-primary">
                                    <HiOutlineUser className="text-2xl text-white" />
                                </Link>
                            )}
                        </div>

                        
                        <button className="hidden sm:block hover:text-primary">
                            <HiOutlineHeart className="text-2xl text-white" />
                        </button>

                        
                        <Link to="/cart" className="flex items-center p-2 px-3 transition-all duration-300 rounded-full bg-primary sm:px-6 hover:scale-105 hover:shadow-xl">
                            <HiOutlineShoppingCart className="text-white" />
                            <span className="ml-2 text-sm font-semibold text-white">{cartItems.length > 0 ? cartItems.length : 0}</span>
                        </Link>
                    </div>
                </div>

                
                <div className="relative w-40 ml-auto space-x-2 sm:w-72">
                    <IoSearchOutline className="absolute text-white transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                        type="text"
                        placeholder="Search here"
                        className="w-full px-6 py-2 text-white placeholder-white bg-transparent border-2 border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                
                <div className="flex items-center ml-6 mr-6 space-x-4">
                    <span className="text-2xl font-bold text-white">Teason Mike</span>
                </div>
            </nav>
        </header>









    )
}

export default Navbar;
