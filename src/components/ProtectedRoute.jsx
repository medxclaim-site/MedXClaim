import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleRank = {
  staff: 1,
  admin: 2,
  super_admin: 3,
};

const hasRequiredRole = (currentRole, requiredRole) => {
  if (!requiredRole) {
    return true;
  }

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(currentRole);
  }

  return (roleRank[currentRole] || 0) >= (roleRank[requiredRole] || 0);
};

const ProtectedRoute = ({ children, requiredRole, allowWhenPasswordResetRequired = false }) => {
  const { user, loading, workspaceLoading, role, mustResetPassword } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950">
        <div className="w-10 h-10 border-2 border-white/20 border-t-blue-400 rounded-full animate-spin" />
      </div>
    );
  }

  // Only wait for workspace if we need to check a specific role
  if (requiredRole && workspaceLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950">
        <div className="w-10 h-10 border-2 border-white/20 border-t-blue-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/register" replace state={{ from: location }} />;
  }

  if (mustResetPassword && !allowWhenPasswordResetRequired && location.pathname !== '/portal/set-password') {
    return <Navigate to="/portal/set-password" replace />;
  }

  if (!hasRequiredRole(role, requiredRole)) {
    return <Navigate to="/portal" replace />;
  }

  return children;
};

export default ProtectedRoute;
