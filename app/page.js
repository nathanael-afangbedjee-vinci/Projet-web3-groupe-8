/** @format */

import Cards from "@/components/Cards";

import React from "react";

const Home = () => {
  return (
    <div className='min-h-screen bg-black flex flex-col items-center justify-center p-4 overflow-hidden relative'>
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black opacity-70'></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjEiIGZpbGw9IiMzNTRmNTIiLz48L3N2Zz4=')] opacity-10"></div>
      <h1 className='text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-500 to-purple-600 mb-12 text-center relative z-10'>
        Stripe
      </h1>

      <Cards />
    </div>
  );
};

export default Home;
