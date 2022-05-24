import { toast } from "react-toastify";
import loadingIcon from "../../assets/svg/loadingIcon.svg";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import useToken from "../../hooks/useToken";

const OAuth = ({ text }) => {
  const navigate = useNavigate();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const token = useToken(user?.user);
  const handleSignInWithGoogle = () => {
    signInWithGoogle();
  };

  if (user) {
    navigate("/");
  }
  if (error) {
    toast.error(error.message);
  }
  return (
    <button
      onClick={handleSignInWithGoogle}
      className="btn w-full flex justify-evenly"
    >
      {loading ? (
        <img src={loadingIcon} alt="loading" />
      ) : (
        <>
          <GoogleIcon className="text-2xl" />
          <p>{text}</p>
        </>
      )}
    </button>
  );
};

export default OAuth;
