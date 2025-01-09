import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading } = useAuth();
  if (isAdminLoading || loading) {
    return <LoadingSpinner />;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={location.state} replace />;
};

export default AdminRoute;
