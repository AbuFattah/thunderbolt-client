import React, { useEffect, useState } from "react";
import Product from "./Product";
const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/featuredProducts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);
  return (
    <div className="container mx-auto max-w-[1200px]">
      <h1 className="text-center text-3xl font-semibold my-16">
        PRODUCTS WE MANUFACTURE
      </h1>
      <div className="flex justify-center flex-wrap">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
