import React from "react";
import SectionTitle from "../Components/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

// TODO
const sttipePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
  return (
    <div>
      <SectionTitle
        subtitle={"Payment!"}
        title={"PLEASE PAY NOW !"}
      ></SectionTitle>
      <div>
        <Elements stripe={sttipePromise}>
            <CheckOutForm></CheckOutForm>
        </Elements>

      </div>
    </div>
  );
};

export default Payment;
