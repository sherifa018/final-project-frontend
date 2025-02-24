import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = localStorage.getItem("user");
  return <>{user ? <Navigate to="/blogs" /> : <Outlet />}</>;
};

export default PublicRoute;
