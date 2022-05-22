import React from "react";
import Ratings from "./Ratings";

const Review = ({ review }) => {
  const { name, description, rating, image } = review;
  console.log(description.length);
  return (
    <div className=" shadow rounded bg-white p-3 border-t-4 border-t-secondary w-[300px] my-5 text-center h-[350px] cursor-default">
      <div className="w-[60px] mx-auto -mt-10">
        <img className="ring rounded-full " src={image} alt="Reviewer image" />
      </div>
      <p className="font-semibold my-2 text-lg">{name}</p>
      <Ratings rating={rating}></Ratings>
      <p className="text-left w-3/4 mx-auto py-3 text-gray-600 overflow-hidden">
        {description.length > 190 ? description + " ..." : description}
      </p>
    </div>
  );
};

export default Review;
