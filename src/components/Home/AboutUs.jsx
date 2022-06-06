import React from "react";
import { AiOutlineHome as HomeIcon } from "react-icons/ai";
import { AiOutlineFieldTime as TimeIcon } from "react-icons/ai";
import { VscTools as ServiceIcon } from "react-icons/vsc";
const AboutUs = () => {
  return (
    <section className="bg-dark py-14 flex items-center justify-center gap-10">
      <div className="item cursor-pointer flex flex-col items-center justify-center gap-3 hover:bg-black ease-in-out duration-300 bg-lightDark w-52 h-52 text-white rounded-md  ">
        <HomeIcon className="text-6xl duration-500" />
        <p className="text-lg">About Us</p>
      </div>
      <div className="item cursor-pointer flex flex-col items-center justify-center gap-3 hover:bg-black ease-in-out duration-300 bg-lightDark w-52 h-52 text-white rounded-md ">
        <TimeIcon className="text-6xl duration-500" />
        <p className="text-lg">Future Plan</p>
      </div>
      <div className="item cursor-pointer flex flex-col items-center justify-center gap-3 hover:bg-black ease-in-out duration-300 bg-lightDark w-52 h-52 text-white rounded-md ">
        <ServiceIcon className="text-6xl duration-500" />
        <p className="text-lg">Service & Support</p>
      </div>
    </section>
  );
};

export default AboutUs;
