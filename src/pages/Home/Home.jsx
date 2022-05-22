import React from "react";
import Banner from "../../components/Home/Banner";
import Products from "../../components/Home/Products/Products";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Products />
    </div>
  );
};

export default Home;
