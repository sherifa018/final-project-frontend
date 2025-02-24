import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = localStorage.getItem("user");
  return <div>{user ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default PrivateRoute;
