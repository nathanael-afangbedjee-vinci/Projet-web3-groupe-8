/** @format */

import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await req.json();
    const { priceId, email } = data;
    console.log("API POST DATA: ", data);

    let customerId;

    if (email) {
      console.log("Recherche de l'email : ", email);
      const customers = await stripe.customers.search({
        query: `email:"${email}"`,
      });
      console.log("Résultat de recherche Stripe : ", customers);

      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        console.log("existing stripe customer : ", customerId);
      } else {
        const customer = await stripe.customers.create({
          email,
        });
        customerId = customer.id;
        console.log("NEW  stripe CUSTOMER : ", customerId);
      }
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal", "bancontact"],
      customer: customerId,
      mode: "payment",
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "DE", "ES", "IT", "NL"],
      },
    });
    console.log("API ROUTE URL", checkoutSession.url);

    return NextResponse.json(
      { msg: checkoutSession, url: checkoutSession.url },
      { status: 200 }
    );
  } catch (e) {
    console.log("Erreur", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};
