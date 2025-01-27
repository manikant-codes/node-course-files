import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../services/apiServices";

function UserAuthGuard({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();

  async function fetchUser() {
    try {
      const result = await getUser();
      if (!result.success) {
        navigate("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert(result.msg);
        return;
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [location.pathname]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
}

export default UserAuthGuard;
