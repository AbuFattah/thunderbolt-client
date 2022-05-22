import React from "react";
import bannerImg from "../../assets/images/banner.jpeg";
import bannerMobileImg from "../../assets/images/banner-mobile.jpeg";
const Banner = () => {
  return (
    <div className="">
      <img
        style={{
          minHeight: "80vh",
          objectFit: "cover",
        }}
        className="hidden md:block"
        src={bannerImg}
        alt="banner"
      />
      <img
        style={{
          minHeight: "80vh",
          objectFit: "cover",
        }}
        className="md:hidden"
        src={bannerMobileImg}
        alt="banner"
      />
    </div>
  );
};

export default Banner;
