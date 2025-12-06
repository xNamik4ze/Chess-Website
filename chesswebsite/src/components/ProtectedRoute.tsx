import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  console.log("ProtectedRoute check token:", token); // <--- LOG

  if (!token) {
    console.log("No token → Redirect to /login");    // <--- LOG
    return <Navigate to="/login" replace />;
  }

  console.log("Token OK → Allow page");
  return <>{children}</>;
}
