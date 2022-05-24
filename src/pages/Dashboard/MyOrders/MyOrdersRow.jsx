import React from "react";
import { Link } from "react-router-dom";

const MyOrdersRow = ({ order, index, setOrderToDelete }) => {
  const { name, price, orderQuantity, paid, _id } = order;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{name}</td>
      <td>${price}</td>
      <td> {orderQuantity}</td>
      <td>
        {paid ? (
          <button className="btn btn-xs btn-success">paid</button>
        ) : (
          <>
            <Link to="/payment" className="btn btn-xs btn-success mx-1">
              pay
            </Link>
            <label
              onClick={() => {
                setOrderToDelete(order);
              }}
              for="modal-confirm"
              class="btn btn-xs modal-button btn-error"
            >
              Cancel
            </label>
            {/* <button className="btn btn-xs btn-error mx-1">Cancel Order</button> */}
          </>
        )}
      </td>
    </tr>
  );
};

export default MyOrdersRow;
