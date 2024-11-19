import React, { useState } from 'react'
import { useForm } from "react-hook-form"


import Swal from 'sweetalert2'
import axios from "axios"
import getBaseUrl from '../utils/baseURL'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [message, setMessage] = useState("")
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        // console.log(data)
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const auth = response.data;
            //    console.log(auth)
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert('Token has been expired!, Please login again.');
                    navigate("/")
                }, 3600 * 1000)
            }

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login Success!!",
                showConfirmButton: false,
                timer: 1500
              });
            navigate("/dashboard")

        } catch (error) {
            setMessage("Please provide a valid email and password")
            console.error(error)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-200 via-teal-400 to-emerald-600">
            <div className="flex w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg bg-opacity-90 backdrop-blur-sm">

               
                <div className="flex items-center justify-center w-2/5 p-10 rounded-l-lg md:w-1/3 bg-gradient-to-b from-emerald-600 to-teal-500">
                    <img src="https://i.pinimg.com/564x/2c/39/1d/2c391deb1ec46ece5f923ce4519fed3f.jpg" alt="Logo"
                        className="object-contain w-64 h-64 transform scale-125 drop-shadow-xl" />
                </div>

               
                <div className="w-full px-12 py-10 md:w-3/5">
                    <h2 className="mb-8 text-3xl font-semibold text-center text-emerald-800">Admin Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative mb-6">
                            <label className="block mb-2 text-sm font-medium text-emerald-700" htmlFor="username">Username</label>
                            <div className="relative">
                                <input
                                    {...register("username", { required: true })}
                                    type="text" name="username" id="username" placeholder="Username"
                                    className="w-full px-10 py-3 text-gray-800 border rounded-full shadow-sm border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                                <span className="absolute inset-y-0 flex items-center left-3 text-emerald-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2-9a2 2 0 114 0 2 2 0 01-4 0zm-3 6a3 3 0 016 0H5z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="relative mb-6">
                            <label className="block mb-2 text-sm font-medium text-emerald-700" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    {...register("password", { required: true })}
                                    type="password" name="password" id="password" placeholder="Password"
                                    className="w-full px-10 py-3 text-gray-800 border rounded-full shadow-sm border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                                <span className="absolute inset-y-0 flex items-center left-3 text-emerald-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6v2H3a1 1 0 000 2h2v5a2 2 0 002 2h6a2 2 0 002-2v-5h2a1 1 0 100-2h-1V8a6 6 0 00-6-6z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        {message && <p className="mb-4 text-sm italic text-red-600">{message}</p>}
                        <div className="flex justify-center">
                            <button className="w-full px-10 py-3 font-semibold text-white transition duration-200 rounded-full shadow-md sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-xs text-center text-gray-500">©2024 Book Store. All rights reserved.</p>
                </div>
            </div>
        </div>

    )
}

export default AdminLogin