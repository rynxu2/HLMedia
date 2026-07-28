import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: 'super_admin' | 'admin';
  requireManageContent?: boolean;
}

export default function RoleGuard({ children, requiredRole, requireManageContent }: RoleGuardProps) {
  const { user, isSuperAdmin, isAdmin } = useAuth();

  if (requiredRole === 'super_admin' && !isSuperAdmin) {
    return <Navigate to="/quan-ly/dashboard" replace />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/quan-ly/dashboard" replace />;
  }

  if (requireManageContent && !isAdmin) {
    return <Navigate to="/quan-ly/dashboard" replace />;
  }

  if (!user) {
    return <Navigate to="/quan-ly" replace />;
  }

  return <>{children}</>;
}
