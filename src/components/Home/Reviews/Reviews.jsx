import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Review from "./Review";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://thunderbolt-server.onrender.com/reviews")
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 150,
        mass: 2,
        damping: 10,
      }}
    >
      <div className="text-center">
        <h1 className="text-4xl uppercase font-bold my-10 text-gray-500">
          Customer Reviews
        </h1>
        <div className="flex flex-wrap gap-5 container mx-auto justify-center items-center">
          {reviews.map((review) => (
            <Review key={review.id} review={review}></Review>
          ))}
        </div>
        {/* <button className="p-4 shadow my-4 text-primary">
          See all reviews
        </button> */}
      </div>
    </motion.div>
  );
};

export default Reviews;
<h1>This is REVIEWS PAGE</h1>;
