import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ManageOrdersRow from "./ManageOrdersRow";
import { BsFillGearFill as GearIcon } from "react-icons/bs";
import ModalConfirm from "../../../components/ModalConfirm";
import axiosFetch from "../../../vendors/axios";
const ManageOrders = () => {
  const [refetch, setRefetch] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // delete order from collection
  const handleDeleteOrder = async (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    if (order.paid) return;

    // const response = await axiosFetch.delete(
    //   `http://18.61.173.75:4000/orders/${orderId}`
    // );

    await fetch(`http://18.61.173.75:4000/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
    });

    // if (response.statusText !== "OK") {
    //   toast.error("Product deleted failed");
    //   return;
    // }
    setOrderToDelete(null);
    setRefetch(!refetch);
    toast.success("order deleted successfully");
  };
  const handleShippedStatus = async (orderId) => {
    // UPDATING STATUS TO SHIPPED
    const res = await fetch(`http://18.61.173.75:4000/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (!res.ok) {
      toast.error("Product Shipment failed");
      return;
    }
    setRefetch(!refetch);
    toast.success("Status updated");
  };

  useEffect(() => {
    console.log(
      "33333333333333333333333333333333333333333333333333333333333333333"
    );
    axiosFetch.get(`http://18.61.173.75:4000/orders`).then((res) => {
      console.log("fsdalkfjlksadjf;lsdakjflakdsfjsladkfjsdlakfjsladkjf");
      setOrders(res.data);
    });

    //   fetch(`http://18.61.173.75:4000/orders`, {
    //   headers: {
    //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((res) => setOrders(res.data));
  }, [refetch]);
  return (
    <>
      <div className="overflow-x-auto">
        <h1 className="text-3xl font-semibold mb-5 uppercase p-3 border-l-2">
          Manage Orders
        </h1>
        <table className="table w-full">
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
                handleShippedStatus={handleShippedStatus}
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
          actionName={"Cancel Order"}
          onDelete={handleDeleteOrder}
          itemId={orderToDelete._id}
        >
          <p> You want to Cancel order for</p>
          <span className="font-semibold">{orderToDelete.name}</span> ?
        </ModalConfirm>
      )}
    </>
  );
};

export default ManageOrders;
