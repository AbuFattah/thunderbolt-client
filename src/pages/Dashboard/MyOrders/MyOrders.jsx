import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import ModalConfirm from "../../../components/ModalConfirm";
import { app, auth } from "../../../firebase.config";
import MyOrdersRow from "./MyOrdersRow";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const [orderToDelete, setOrderToDelete] = useState(null);
  // delete order from collection
  const handleDeleteOrder = (orderId) => {
    fetch(`http://localhost:5000/orders/${orderId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderToDelete(null);
        setRefetch(!refetch);
        toast.success("order deleted successfully");
      });
  };
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
  }, [user, refetch]);
  return (
    <>
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
              <MyOrdersRow
                setOrderToDelete={setOrderToDelete}
                key={order._id}
                order={order}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
      {orderToDelete && (
        <ModalConfirm
          onCancelOrder={handleDeleteOrder}
          orderToDelete={orderToDelete}
        />
      )}
    </>
  );
};

export default MyOrders;
