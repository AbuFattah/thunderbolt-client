import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.config";
import MyOrdersRow from "./MyOrdersRow";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:5000/orders?email=${user?.email}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  }, [user]);
  return (
    <div class="overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-5 uppercase p-3 border-l-2">
        My Orders
      </h1>
      <table class="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <MyOrdersRow key={order._id} order={order} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
