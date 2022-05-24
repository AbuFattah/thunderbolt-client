import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundImg from "../assets/images/not-found.jpg";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex  flex-col-reverse lg:flex-row ">
      <img className="object-fill" src={notFoundImg} alt="notfound" />
      <div className="h-screen flex flex-col space-y-10 justify-center items-center w-full">
        <span className="text-secondary text-center font-bold text-8xl">
          {" "}
          O_O{" "}
        </span>
        <h1 className="text-center font-bold text-6xl">
          Looks like you are lost
        </h1>
        <h1 className="text-center font-semibold text-2xl">
          The page you are looking for does not exist.
        </h1>
        <button
          className="btn btn-secondary"
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
