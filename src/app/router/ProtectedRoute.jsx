import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const {
    user,
    loading,
    hasActiveSubscription,
  } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  const isBillingPage = location.pathname === "/billing";

  if (!hasActiveSubscription && !isBillingPage) {
    return <Navigate to="/billing" replace />;
  }

  return children;
}