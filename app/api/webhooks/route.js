/** @format */
//------https://docs.stripe.com/api/events/types////

import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const POST = async (req) => {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  let data;
  let event;
  let eventType;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webHookSecret);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed":
        console.log("Traitement de checkout.session.completed");

        const session = await stripe.checkout.sessions.retrieve(
          data.object.id,
          {
            expand: ["line_items"],
          }
        );
        console.log("Session récupérée :", session);

        const customerEmail = session?.customer_details?.email;
        let customerId = session?.customer;

        if (!customerEmail) {
          throw new Error("no email passed during checkout");
        }

        if (!customerId) {
          console.log("---->GUEST USER");
          console.log("-------> customer Email details :", customerEmail);

          const customers = await stripe.customers.search({
            query: `email:"${customerEmail}"`,
          });
          console.log("--------> Log de customers : ", customers);

          if (customers.data.length > 0) {
            customerId = customers.data[0].id;
            console.log(
              "----------> Client guest trouvé dans stripe.  CustomerID : ",
              customerId
            );
          } else {
            const newCustomer = await stripe.customers.create({
              email: customerEmail,
            });
            customerId = newCustomer.id;
            console.log("--------> NEW Customer Created : ", newCustomer);
          }
          console.log("----> FIN DE GUEST USER");
        }

        console.log(
          "-----------> fin des check récupé customerId : ",
          customerId
        );

        break;

      case "customer.subscription.deleted":
        break;
      case "checkout.session.expired":
        break;
      case "customer.subscription.created":
        break;
      default:
        console.log("Événement non géré :", eventType);
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
