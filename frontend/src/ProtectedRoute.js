import { useNavigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform the authentication check
    const isAuthenticated = true ? localStorage.getItem("token") : false; // Implement your authentication logic here

    if (!isAuthenticated) {
      navigate("/"); // Redirect to the login page if not authenticated
    }
  }, [navigate]);

  return (
    <Routes>
      <Route {...rest} element={<Component />} />
    </Routes>
  );
};

export default ProtectedRoute;
