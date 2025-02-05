import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCarts from "../hooks/useCarts";
import { ContextApi } from "../AuthProvider/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
    const {user} = useContext(ContextApi)
    const [error, setError] = useState('')
    const [clientsecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart,refetch] = useCarts();
    const navigate = useNavigate();
    
    const totalprice = cart.reduce((total,item) =>total + item.price ,0)

    useEffect(() => {
       if(totalprice > 0) {
        axiosSecure.post('/create-payment-intent', {price: totalprice})
        .then(res => {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
       }
    } ,[])


  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!stripe || !elements) {
        return
    }
    const card = elements.getElement(CardElement)

    if (card == null) {
        return;
      }
    
    const {error,paymentMethod} = await stripe.createPaymentMethod({
        type:'card',
        card
    }) 

    if(error){
        console.log('payment error ', error)
        setError(error.message)
    }
    else{
        console.log('payment method', paymentMethod)
        setError('')
    }

    // confirmPayment
    const {paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientsecret,{
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })

    if(confirmError){
        console.log('confirm error')
    }
    else{
        console.log('payment intent', paymentIntent)
        if(paymentIntent.status === 'succeeded'){
            setTransactionId(paymentIntent.id)

            // now save the payment in the database

            const payment = {
              email: user.email,
              price: totalprice,
              transactionId: paymentIntent.id,
              date: new Date(),
              cartIds: cart.map(item => item._id),
              menuItemIds: cart.map(item => item.menuId),
              status: 'pending'
            }

            const res = await axiosSecure.post('/payment', payment);
            console.log('payment saved',res.data)
            refetch();

            if(res.data?.paymentResult?.insertedId){
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Payment has been Successfull",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/dashboard/paymentHistory')
            }
        }
    }
  
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="btn btn-primary btn-md my-3" type="submit" disabled={!stripe || !clientsecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600">Your Transaction Id: {transactionId}</p>}
      
    </form>
  );
};

export default CheckOutForm;
