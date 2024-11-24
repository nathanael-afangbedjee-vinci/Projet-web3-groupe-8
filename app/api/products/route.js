/** @format */

import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });
    console.log("---->LOG DE PRODUCTS", products);

    const productDetails = products.data.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.default_price?.unit_amount / 100, 
      priceId: product.default_price?.id,
      currency: product.default_price?.currency,
      image: product.images[0],
    }));

    return NextResponse.json(productDetails, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
