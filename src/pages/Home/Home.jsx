import React from "react";
import Footer from "../../components/Footer";
import Banner from "../../components/Home/Banner";
import BusinessSummary from "../../components/Home/BusinessSummary";
import Conference from "../../components/Home/Conference";
import Products from "../../components/Home/Products/Products";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <BusinessSummary />
      <Products />
      <Conference />
      <Footer />
    </div>
  );
};

export default Home;
