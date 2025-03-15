import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem("adminUsername"); // Check if user is logged in

  console.log("Checking authentication:", isAuthenticated); // Debugging log

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
