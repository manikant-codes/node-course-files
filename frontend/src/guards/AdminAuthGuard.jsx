import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getAdmin } from "../services/apiServices";

function AdminAuthGuard({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();

  async function fetchAdmin() {
    try {
      const result = await getAdmin();
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
    fetchAdmin();
  }, [location.pathname]);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
}

export default AdminAuthGuard;
