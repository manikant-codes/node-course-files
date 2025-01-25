import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../services/apiServices";

function AuthGuard({ children }) {
  const [user, setUser] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  async function fetchUser() {
    try {
      const result = await getUser();
      if (!result.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert(result.msg);
        navigate("/");
        return;
      }

      if (location.pathname.startsWith("/admin")) {
        if (result.data.role !== "admin") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          alert("Unauthorized.");
          navigate("/");
          return;
        }
      }
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [location.key]);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default AuthGuard;
