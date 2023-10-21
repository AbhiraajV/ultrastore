"use client";
import useStore from "@/hooks/useStore";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import axios from "axios";

import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "../Payment";
import { STRIPE_APIKEY } from "@/hooks/types/type";
type Props = {};

function PaymentFormModalDialogue({}: Props) {
  const { togglePaymentModalOpen, isPaymentModalOpen } = useStore(
    (state) => state
  );
  const [clientPaymentSecret, setClientPaymentSecret] = useState<
    undefined | string
  >(undefined);
  useEffect(() => {
    if (clientPaymentSecret || !isPaymentModalOpen) return;
    axios
      .post("/api/payment", {
        amount: 10,
      })
      .then((response) => {
        console.log(response);
        setClientPaymentSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clientPaymentSecret, isPaymentModalOpen]);
  const stripePromise = loadStripe(STRIPE_APIKEY);
  if (!isPaymentModalOpen || !clientPaymentSecret) return <></>;
  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: clientPaymentSecret }}
    >
      <Dialog open={isPaymentModalOpen} onOpenChange={togglePaymentModalOpen}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Prioritize This File
            </DialogTitle>
            <DialogDescription className="w-full text-center">
              Get Prioritized Decode for your Files within minutes/seconds.{" "}
              <br />
              <span className="text-xs font-bold">
                {" "}
                we pass your request to specialized servers for faster decode
                and download
              </span>
            </DialogDescription>
          </DialogHeader>
          <Payment />{" "}
        </DialogContent>
      </Dialog>
    </Elements>
  );
}

export default PaymentFormModalDialogue;
