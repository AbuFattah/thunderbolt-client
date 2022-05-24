import React from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical as ThreeDots } from "react-icons/bs";
const ManageOrdersRow = ({ order, index }) => {
  const {
    userName,
    name: productName,
    price,
    orderQuantity,
    paid,
    _id,
  } = order;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{userName}</td>
      <td>{productName}</td>
      <td>pending</td>
      <td>${price}</td>
      <td>
        {paid ? (
          <button className="btn btn-xs btn-success">paid</button>
        ) : (
          <>
            <Link to="/payment" className="btn btn-xs btn-success mx-1">
              unpaid
            </Link>
            {!paid && (
              <label
                onClick={() => {
                  setOrderToDelete(order);
                }}
                for="modal-confirm"
                class="btn btn-xs modal-button btn-error"
              >
                Cancel
              </label>
            )}
            {/* <button className="btn btn-xs btn-error mx-1">Cancel Order</button> */}
          </>
        )}
      </td>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-xs mt-4">
          set Shipped
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </tr>
  );
};

export default ManageOrdersRow;
