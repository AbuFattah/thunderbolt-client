import React from "react";

const ManageProductsRow = ({ setProduct, product, index }) => {
  const { name, price, quantity, minOrder } = product;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{minOrder}</td>
      <td>${price}</td>
      <td class="flex gap-2 items-center">
        {
          <label
            onClick={() => {
              setProduct(product);
            }}
            for="modal-confirm"
            class="btn btn-xs modal-button btn-error m-1"
          >
            Delete
          </label>
        }
      </td>
    </tr>
  );
};

export default ManageProductsRow;
