import React, { useEffect, useState } from "react";
import { BsFillGearFill as GearIcon } from "react-icons/bs";
import { toast } from "react-toastify";
import ModalConfirm from "../../../components/ModalConfirm";
import ManageProductsRow from "./ManageProductsRow";
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [product, setProduct] = useState(null);
  const handleDeleteProduct = async (productId) => {
    const data = await fetch(
      `http://localhost:5000/products/${productId}`
    ).then((res) => res.json());
    setRefetch(!refetch);
    setProduct(null);
    toast.success("Product deleted successfully");
  };

  useEffect(() => {
    fetch(`http://localhost:5000/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [refetch]);
  return (
    <>
      <div class="overflow-x-auto">
        <h1 className="text-3xl font-semibold mb-5 uppercase p-3 border-l-2">
          Manage Products
        </h1>
        <table class="table w-full">
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
