import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
  const user = useSelector((store) => {
    return store.user.user;
  });

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
}

export default AuthGuard;
