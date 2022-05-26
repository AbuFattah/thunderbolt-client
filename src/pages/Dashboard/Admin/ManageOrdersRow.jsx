import React from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical as ThreeDots } from "react-icons/bs";
const ManageOrdersRow = ({
  order,
  index,
  setOrderToDelete,
  handleShippedStatus,
}) => {
  const {
    userName,
    name: productName,
    price,
    orderQuantity,
    paid,
    _id: orderId,
    status,
  } = order;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{userName}</td>
      <td>{productName}</td>
      <td>{status ? status : " - "}</td>
      <td>${price}</td>
      <td>
        {paid ? (
          <button className="btn btn-xs btn-success">paid</button>
        ) : (
          <>
            <button className="btn btn-xs btn-success mx-1">unpaid</button>

            {/* <button className="btn btn-xs btn-error mx-1">Cancel Order</button> */}
          </>
        )}
      </td>
      <td className="flex gap-2 items-center">
        {
          <button
            disabled={status === "shipped" || !paid}
            onClick={handleShippedStatus.bind(null, orderId)}
            tabIndex="0"
            className="btn btn-xs "
          >
            set Shipped
          </button>
        }
        {!paid && (
          <label
            onClick={() => {
              setOrderToDelete(order);
            }}
            for="modal-confirm"
            className="btn btn-xs modal-button btn-error m-1"
          >
            Cancel
          </label>
        )}
      </td>
    </tr>
  );
};

export default ManageOrdersRow;
