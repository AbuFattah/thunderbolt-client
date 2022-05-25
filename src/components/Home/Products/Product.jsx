import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const { name, details, img: image, price, quantity, minOrder, _id } = product;
  const navigate = useNavigate();
  return (
    <div className="card compact w-[300px] bg-base-100 shadow-xl m-10">
      <figure>
        <img
          className="w-full h-[200px] object-cover"
          src={image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body compact">
        <h2 className="card-title">{name}</h2>
        <ul className="text-slate-500 list-disc px-3">
          {Array.isArray(details) ? (
            details.map((detail) => (
              <li key={Math.random().toString()}>{detail}</li>
            ))
          ) : (
            <p>{details}</p>
          )}
          {}
        </ul>
        <p className="  font-semibold">Quantity: {quantity}</p>
        <p className="  font-semibold">Minimum Order: {minOrder}</p>
        <p className=" font-semibold">
          Price: <span className="text-secondary ">${price}</span>
        </p>

        <div className="card-actions justify-end">
          <button
            onClick={navigate.bind(null, `/purchase/${_id}`)}
            className="btn btn-primary w-full mt-5"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
