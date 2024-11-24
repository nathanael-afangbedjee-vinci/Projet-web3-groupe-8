/** @format */
"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const MainCard = ({ products }) => {
  console.log("CLIENT PRODUCT", products);

  const checkOut = async (priceId) => {
    try {
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          //email: "test@test.be",
        }),
      });
      const data = await response.json();
      console.log("CLIENT DATA RESPONSE", data.url);
      window.location.href = data.url;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10'>
      {products?.map((product) => (
        <div key={product?.id}>
          <Card
            key={product.index}
            className='bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-xl overflow-hidden transition-all duration-300 flex flex-col'
          >
            <CardHeader className='bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6 '>
              <CardTitle className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-center '>
                {product?.name}
              </CardTitle>
            </CardHeader>

            <CardContent className='flex flex-col items-center p-6 flex-grow'>
              <div className='w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-1 mb-6'>
                <img
                  src={product?.image}
                  alt={product?.name}
                  className='w-full h-full object-cover rounded-full'
                />
              </div>
              <p className='text-gray-400 text-center'>
                {product?.description}
              </p>
              <p className='text-blue-600 text-center font-bold text-lg'>
                Price: {product?.price} {product?.currency.toUpperCase()}
              </p>
            </CardContent>

            <CardFooter className='bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6'>
              <Button
                className='w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50'
                onClick={() => checkOut(product.priceId)}
              >
                Buy now
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default MainCard;
