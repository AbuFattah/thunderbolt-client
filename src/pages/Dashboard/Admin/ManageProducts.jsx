import React, { useEffect, useState } from "react";
import { BsFillGearFill as GearIcon } from "react-icons/bs";
import { toast } from "react-toastify";
import ModalConfirm from "../../../components/ModalConfirm";
import axiosFetch from "../../../vendors/axios";
import ManageProductsRow from "./ManageProductsRow";
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [product, setProduct] = useState(null);
  const handleDeleteProduct = async (productId) => {
    const response = await fetch(
      `https://thunderbolt-server.onrender.com/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const data = await fetch(
      `https://thunderbolt-server.onrender.com/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((response) => response.json());

    if (response.status !== 200) {
      toast.error("Product deleted failed");
      return;
    }
    setRefetch(!refetch);
    setProduct(null);
    toast.success("Product deleted successfully");
  };

  useEffect(() => {
    fetch(`https://thunderbolt-server.onrender.com/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [refetch]);
  return (
    <>
      <div className="overflow-x-auto">
        <h1 className="text-3xl font-semibold mb-5 uppercase p-3 border-l-2">
          Manage Products
        </h1>
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Minimum Order</th>
              <th>Price</th>
              <th>
                <GearIcon className="text-xl" />
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ManageProductsRow
                setProduct={setProduct}
                key={product._id}
                product={product}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
      {product && (
        <ModalConfirm
          actionName={"Delete Product"}
          onDelete={handleDeleteProduct}
          itemId={product._id}
        ></ModalConfirm>
      )}
    </>
  );
};

export default ManageProducts;
