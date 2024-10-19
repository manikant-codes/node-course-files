import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthGuardAdmin({ children }) {
  const user = useSelector((store) => {
    return store.user.user;
  });

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default AuthGuardAdmin;
