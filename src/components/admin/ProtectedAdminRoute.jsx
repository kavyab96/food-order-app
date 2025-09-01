import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAdmin as selectIsAdmin } from "../../features/auth/authSlice";

const ProtectedAdminRoute = () => {
  const isAdmin = useSelector(selectIsAdmin); // your helper state

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  // If admin  render children (Outlet = nested routes)
  return <Outlet />;
};

export default ProtectedAdminRoute;
