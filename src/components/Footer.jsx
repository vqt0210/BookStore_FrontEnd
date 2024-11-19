import React from 'react'

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { PiYoutubeLogoBold } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="px-6 py-12 text-gray-200 bg-gray-800">
      
      <div className="container grid grid-cols-1 gap-10 mx-auto text-center md:grid-cols-3 md:text-left">

       
        <div className="md:col-span-1">
          <h2 className="mb-4 text-xl font-bold text-white">About Us</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Welcome to our bookstore! Discover a curated selection of bestsellers, new releases, and timeless classics.
          </p>
        </div>

        
        <div className="md:col-span-1">
          <h2 className="mb-4 text-xl font-bold text-white">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#home" className="transition hover:text-indigo-400">Home</a></li>
            <li><a href="#shop" className="transition hover:text-indigo-400">Shop</a></li>
            <li><a href="#about" className="transition hover:text-indigo-400">About Us</a></li>
            <li><a href="#contact" className="transition hover:text-indigo-400">Contact</a></li>
          </ul>
        </div>

        
        <div className="md:col-span-1">
          <h2 className="mb-4 text-xl font-bold text-white">Newsletter</h2>
          <p className="mb-4 text-sm text-gray-400">
            Join our newsletter for the latest updates and book recommendations!
          </p>
          <div className="flex justify-center md:justify-start">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 text-gray-900 rounded-l-lg"
            />
            <button className="px-4 py-2 text-white transition bg-indigo-500 rounded-r-lg hover:bg-indigo-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      
      <div className="container flex flex-col items-center justify-between pt-4 mx-auto mt-8 text-sm border-t border-gray-700 md:flex-row">

        
        <div className="flex flex-col gap-4 mb-4 text-gray-400 md:flex-row md:mb-0">
          <a href="#privacy" className="transition hover:text-indigo-400">Privacy Policy</a>
          <a href="#terms" className="transition hover:text-indigo-400">Terms of Service</a>
        </div>

        
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-indigo-400">
            <FaFacebook size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-indigo-400">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-indigo-400">
            <FaInstagram size={20} />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="transition hover:text-indigo-400">
            <PiYoutubeLogoBold size={20} />
          </a>
        </div>
      </div>
    </footer>

  )
}

export default Footer