"use client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import useStore from "@/hooks/useStore";

type Props = {};

function Payment({}: Props) {
  const { toast } = useToast();
  const { paymentForFileId, paymentByUserId } = useStore();
  const stripe = useStripe();
  const elements = useElements();
  const handlePaymentSubmit = async () => {
    if (!stripe || !elements) return;
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url:
            "http://localhost:3000/your-files/" +
            paymentForFileId +
            "/?userId=" +
            paymentByUserId,
        },
      })
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          toast({
            title: "Payment Failed!",
            description:
              "Something went wrong, we couldnt detect a file. Please try again",
          });
        } else console.log("Unexpected error");
      });

    // if (error.type === "card_error" || error.type === "validation_error") {
    //   console.log(error.message);
    // } else console.log("Unexpected error");
  };
  return (
    <div className="m-2 flex flex-col items-center justify-center gap-2">
      <PaymentElement />
      <Button onClick={handlePaymentSubmit} className="w-[60%]">
        Confirm
      </Button>
    </div>
  );
}

export default Payment;
