import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51L3anPAvlhHHAVQLyL0765vZ7mTI0Fil9zE2euyMziMtLRfd6cCTJldCZugzFyZeVBeouojUYULjtw7HuhzUtIxk00NUPqIfgr"
);

const Payment = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    empty: true,
  });
  useEffect(() => {
    fetch(`http://localhost:5000/singleOrder/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);
  // const { data: product, isLoading } = useQuery(["order", id], () =>
  //   fetch(`http://localhost:5000/orders/${id}`, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //   }).then((response) => response.json())
  // );
  return (
    <div className="container mx-auto max-w-[1200px] min-h-screen p-2">
      <h1 className="text-2xl font-semibold mb-5 uppercase p-3 bproduct-l-4">
        COMPLETE PAYMENT
      </h1>

      <div class="card max-w-md shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            Please pay for {product?.name || "Thunderbolt xxReaper"}
          </h2>
          <p>Quantity: {product?.quantity || "455"}</p>
          <div class="card-actions justify-end">
            <label class="badge-primary badge text-lg p-3">
              ${product.price}
            </label>
          </div>
        </div>
      </div>

      <div class="card max-w-md shadow-xl">
        <div class="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm price={product.price} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
