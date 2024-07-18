import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isSuccess = useSelector((state) => state.SignIn.success);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuccess) {
      navigate("/", { replace: true });
    }
  }, [isSuccess, navigate]);

  return children;
};

export default ProtectedRoute;
