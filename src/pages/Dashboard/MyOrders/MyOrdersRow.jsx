import React from "react";
import { Link } from "react-router-dom";

const MyOrdersRow = ({ order, index, setOrderToDelete }) => {
  const { name, price, orderQuantity, paid, _id, transactionId } = order;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{name}</td>
      <td>${price}</td>
      <td> {orderQuantity}</td>
      <td>
        {paid ? (
          <>
            <label className="badge  badge-success">paid</label>
            <p>TransactionID: {transactionId}</p>
          </>
        ) : (
          <>
            <Link
              to={`/payment/${_id}`}
              className="btn btn-xs btn-success mx-1"
            >
              pay
            </Link>
            {!paid && (
              <label
                onClick={() => {
                  setOrderToDelete(order);
                }}
                for="modal-confirm"
                className="btn btn-xs modal-button btn-error"
              >
                Cancel
              </label>
            )}
            {/* <button className="btn btn-xs btn-error mx-1">Cancel Order</button> */}
          </>
        )}
      </td>
    </tr>
  );
};

export default MyOrdersRow;
