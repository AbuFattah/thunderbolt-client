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
      <h1 className="text-center text-4xl  my-16">PRODUCTS WE MANUFACTURE</h1>
      <div className="w-[40px] h-px bg-slate-500 mx-auto"></div>
      <div className="flex justify-between flex-wrap">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
