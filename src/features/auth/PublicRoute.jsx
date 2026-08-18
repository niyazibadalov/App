import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token"); // Və ya auth state-dən yoxlayırsan

  // Əgər istifadəçi artıq daxil olubsa, loginə yox, birbaşa dashboard-a yönləndir
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}