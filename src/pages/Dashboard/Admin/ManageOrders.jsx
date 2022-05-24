import React, { useEffect, useState } from "react";
import ManageOrdersRow from "./ManageOrdersRow";
import { BsFillGearFill as GearIcon } from "react-icons/bs";
const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/orders/`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  });
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
                // setOrderToDelete={setOrderToDelete}
                // key={order._id}
                order={order}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* {orderToDelete && (
        <ModalConfirm
          // onCancelOrder={handleDeleteOrder}
          // orderToDelete={orderToDelete}
        />
      )} */}
    </>
  );
};

export default ManageOrders;
