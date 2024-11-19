import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2'

const Register = () => {
    const [message, setMessage] = useState("");
    const { registerUser, signInWithGoogle } = useAuth();
    // console.log(registerUser)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    //   register user

    const onSubmit = async (data) => {
        // console.log(data)
        try {
            await registerUser(data.email, data.password);
            alert("User registered successfully!")
        } catch (error) {
            setMessage("Please provide a valid email and password")
            console.error(error)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login Success!!",
                showConfirmButton: false,
                timer: 1500
              });
            navigate("/")
        } catch (error) {
            alert("Google sign in failed!")
            console.error(error)
        }
    }
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-indigo-100 to-purple-200">
            <div className="flex w-full max-w-4xl px-8 pt-10 pb-8 mx-auto bg-white border border-purple-300 rounded-lg shadow-lg">
                
                <div className="w-full max-w-lg px-8 pt-10 pb-8">
                    <h2 className="mb-4 text-3xl font-bold text-center text-purple-800">First Time?</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="email">Email</label>
                            <input
                                {...register("email", { required: true })}
                                type="email" name="email" id="email" placeholder="Email Address"
                                className="w-full px-4 py-3 text-gray-800 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="password">Password</label>
                            <input
                                {...register("password", { required: true })}
                                type="password" name="password" id="password" placeholder="Password"
                                className="w-full px-4 py-3 text-gray-800 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {message && <p className="mb-4 text-sm italic text-red-600">{message}</p>}

                        <div className="flex justify-center mt-6">
                            <button className="w-full px-8 py-3 font-bold text-white rounded-lg shadow-md bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 focus:outline-none">
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-sm font-medium text-center text-gray-700">
                        Already have an account?
                        <Link to="/login" className="ml-1 text-purple-600 hover:text-purple-800">
                            Login
                        </Link>
                    </p>

                    {/* Google Sign-In Button */}
                    <div className="mt-6">
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex items-center justify-center w-full gap-2 px-4 py-3 font-bold text-purple-800 transition-colors bg-white border border-purple-300 rounded-lg shadow hover:bg-purple-100 focus:outline-none"
                        >
                            <FaGoogle className="text-purple-500" />
                            Sign up with Google
                        </button>
                    </div>

                    <p className="mt-6 text-xs text-center text-gray-500">©2024 Book Store. All rights reserved.</p>
                </div>

                
                <div className="flex items-center justify-center w-full max-w-lg">
                    <img
                        src="https://quaggapedia.afrikaburn.com/images/4/46/First-time-james-franco-hanging-meme.jpg" 
                        alt="Welcome"
                        className="object-cover w-full h-auto rounded-lg"
                    />
                </div>
            </div>
        </div>


    )
}

export default Register