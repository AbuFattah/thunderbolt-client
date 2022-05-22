import React from "react";
import conferenceImg1 from "../../assets/images/conference/conf.webp";
import conferenceImg2 from "../../assets/images/conference/conf2.webp";
const Conference = () => {
  return (
    <div className="container mx-auto max-w-[1200px] my-4 mb-10">
      <h1 className="text-5xl my-10">NOW PRESENTING</h1>
      <div className="grid grid-cols-2 max-w-[800px]">
        <div className="flex flex-col gap-3 ">
          <img src={conferenceImg1} className="w-full" alt="conf1" />
          <a href="https://www.google.com" className="hover:text-blue-500">
            The Advantages of ARM: From Smartphones to Supercomputers and Beyond
          </a>
          <a className="link text-blue-500" href="https://www.google.com">
            Learn More
          </a>
        </div>
        <div className="flex flex-col gap-3 ">
          <img src={conferenceImg2} className="w-full" alt="conf1" />
          <a href="https://www.google.com" className="hover:text-blue-500">
            The Advantages of ARM: From Smartphones to Supercomputers and Beyond
          </a>
          <a className="link text-blue-500" href="https://www.google.com">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Conference;
