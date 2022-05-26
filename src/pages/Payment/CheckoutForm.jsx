import loadingIconBlack from "../../assets/svg/loadingIconBlack.svg";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axiosFetch from "../../vendors/axios";

const CheckoutForm = ({ order }) => {
  const [paymentError, setPaymentError] = useState("");
  const [success, setSuccess] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  console.log(order);
  useEffect(() => {
    if (!order.price) return;
    fetch(`https://quiet-sierra-02011.herokuapp.com/create-payment-intent`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price: order.price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data?.clientSecret || ""));
  }, [order]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    setPaymentError("");
    setSuccess("");
    if (error) {
      console.log("[error]", error);
      setPaymentError(error.message);
      setLoading(false);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // Confirm payment through card
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: order.userName,
            email: order.email,
          },
        },
      });
    setLoading(false);
    if (intentError) {
      setPaymentError(intentError.message);
      return;
    }

    if (paymentIntent.id) {
      setSuccess("Payment Successfull!");
      setTransactionId(paymentIntent.id);
      fetch(
        `https://quiet-sierra-02011.herokuapp.com/orders/payment/${order._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            transactionId: paymentIntent.id,
          }),
        }
      );
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
      <button
        type="submit"
        className="btn btn-success btn-sm my-3"
        disabled={!stripe || !clientSecret}
      >
        Pay ${order.price}
      </button>
      {!loading ? (
        <>
          {" "}
          {paymentError && <p className="text-error">{paymentError}</p>}
          {success && <p className="text-success">{success}</p>}
          {transactionId && (
            <p className="">
              <span className="font-semibold">TransactionID:</span>{" "}
              <span className="text-slate-700">{transactionId}</span>
            </p>
          )}
        </>
      ) : (
        <img src={loadingIconBlack}></img>
      )}
    </form>
  );
};

export default CheckoutForm;
