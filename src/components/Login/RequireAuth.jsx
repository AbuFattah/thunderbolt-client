import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, Navigate } from "react-router-dom";
import { auth } from "../../firebase.config";
const RequireAuth = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  console.log(user)
  let location = useLocation();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <Navigate
        to={"/signin"}
        replace={true}
        state={{ from: location }}
      ></Navigate>
    );
  }

  return children;
};

export default RequireAuth;
