import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(()=>{
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/check-session`, {withCredentials: true})
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [])

  if(isAuthenticated === null){
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />; // Redirect to login on unauthenticated access
  }

  return children; // Render the protected component if authenticated
}

export default PrivateRoute;
