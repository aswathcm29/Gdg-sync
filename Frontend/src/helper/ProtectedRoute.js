/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  


  useEffect(()=>{
    if (token && role !== requiredRole) {
      navigate("/not-authorized");
    }  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredRole, role])

  return children;
};

export default ProtectedRoute;
