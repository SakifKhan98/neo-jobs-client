import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import "./Payment.css";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51Ha3ceAy4PpNhtf5jOGnj7v8bIhPlbdw8zW2TkGN5ibkYf7fXr3nr5lHi5cM0iikGoX109EiRwnkHmxsiqMOKUf100V2e1Yfdx"
);

const Payment = () => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
      </Elements>
    </>
  );
};

export default Payment;
