import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, Navigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import useIsAdmin from "../../hooks/useIsAdmin";
const RequireAdmin = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, adminLoading] = useIsAdmin(user?.email);
  let location = useLocation();

  if (loading || adminLoading) {
    return <p>Loading...</p>;
  }

  if (!isAdmin) {
    return (
      <Navigate
        to={"/not-found"}
        replace={true}
        state={{ from: location }}
      ></Navigate>
    );
  }

  return children;
};

export default RequireAdmin;
