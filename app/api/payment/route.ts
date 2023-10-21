import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    const { amount } = await req.json();
    if (!amount)
      return new NextResponse("Amount Not Specified", { status: 400 });
    const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
      apiVersion: "2023-08-16",
      typescript: true,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "INR",
    });
    return NextResponse.json({
      message: "Payment Intent Created",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("PAYMENT", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
