import React, { useEffect, useState } from "react";
import ManageOrdersRow from "./ManageOrdersRow";
import { BsFillGearFill as GearIcon } from "react-icons/bs";
import ModalConfirm from "../../../components/ModalConfirm";
const ManageOrders = () => {
  const [refetch, setRefetch] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // delete order from collection
  const handleDeleteOrder = (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    if (order.paid) return;
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
    fetch(`http://localhost:5000/orders/`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  });
  return (
    <>
      <div class="overflow-x-auto">
        <h1 className="text-3xl font-semibold mb-5 uppercase p-3 border-l-2">
          Manage Orders
        </h1>
        <table class="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>User</th>
              <th>Product Name</th>
              <th>Status</th>
              <th>Price</th>
              <th>Payment</th>
              <th>
                <GearIcon className="text-xl" />
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <ManageOrdersRow
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

export default ManageOrders;
