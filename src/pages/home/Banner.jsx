import React from 'react';
import The3 from "../../assets/The3.png";

const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen gap-12 px-0 py-16 mt-0 bg-white rounded-3xl md:flex-row-reverse">

      <div className="w-full h-screen text-center md:w-1/2 md:text-left">
        <h1 className="text-4xl font-semibold leading-tight text-black md:text-5xl mb-7">HOT Releases !!!</h1>
        <p className="mb-10 text-lg leading-relaxed text-black">
          Update your reading list with some of the latest and greatest releases in the literary world.
        </p>
        <button className="px-8 py-3 font-bold text-white transition duration-300 ease-in-out transform rounded-full shadow-xl bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 hover:scale-105 hover:shadow-2xl">
          Read more
        </button>
      </div>

      <div className="flex items-center justify-center w-full h-screen overflow-hidden">
        <img
          src={The3}
          alt="Banner Image"
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform shadow-lg hover:shadow-2xl hover:scale-110 filter brightness-110 contrast-125"
        />
      </div>
    </div>






  );
};

export default Banner;