import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useRequireAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check the user's authentication status
    const isAuthenticated = true ? localStorage.getItem("token") : false;

    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);
}

export default useRequireAuth;
