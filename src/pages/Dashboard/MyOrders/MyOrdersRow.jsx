import React from "react";
import { Link } from "react-router-dom";

const MyOrdersRow = ({ order, index }) => {
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
          <Link to="/payment" className="btn btn-xs btn-success">
            pay
          </Link>
        )}
      </td>
    </tr>
  );
};

export default MyOrdersRow;
