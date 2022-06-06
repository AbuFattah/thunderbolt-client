import React from "react";
import Footer from "../../components/Footer";
import Banner from "../../components/Home/Banner";
import BusinessSummary from "../../components/Home/BusinessSummary";
import Conference from "../../components/Home/Conference";
import Products from "../../components/Home/Products/Products";
import Navbar from "../../components/Navbar";
import Reviews from "../../components/Home/Reviews/Reviews";
import Perks from "../../components/Perks";
import AboutUs from "../../components/Home/AboutUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <BusinessSummary />
      <Products />
      <Conference />
      <AboutUs />
      <Perks />
      <Reviews />
    </div>
  );
};

export default Home;
