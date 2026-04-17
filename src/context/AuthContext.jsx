import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import {
  ensureUserWorkspace,
  getEffectiveRole,
  getPermissionsByRole,
  isSuperAdminRole,
  isSettingsComplete,
  subscribeToUserWorkspace,
} from '../services/workspaceService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState(null);
  const [workspaceLoading, setWorkspaceLoading] = useState(true);

  useEffect(() => {
    let workspaceUnsubscribe;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (workspaceUnsubscribe) {
        workspaceUnsubscribe();
        workspaceUnsubscribe = undefined;
      }

      if (!firebaseUser) {
        setWorkspace(null);
        setWorkspaceLoading(false);
        return;
      }

      // Only show loading spinner on FIRST load; keep existing data on re-auths
      setWorkspaceLoading((prev) => (workspace === null ? true : prev));

      const fallbackWorkspace = {
        role: getEffectiveRole(firebaseUser.email, 'staff'),
        profile: {
          displayName: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
          phone: '',
          jobTitle: '',
        },
        auth: {
          mustResetPassword: false,
        },
        dashboard: {
          kpis: { openClaims: 0, pendingAuthorizations: 0, denialsThisWeek: 0, avgResolutionDays: 0 },
          claimsStatus: [],
          recentActivity: [],
          alerts: [],
        },
      };

      try {
        workspaceUnsubscribe = subscribeToUserWorkspace(
          firebaseUser.uid,
          (workspaceData) => {
            const nextWorkspace = workspaceData || fallbackWorkspace;
            setWorkspace({
              ...nextWorkspace,
              role: getEffectiveRole(firebaseUser.email, nextWorkspace.role || 'staff'),
            });
            setWorkspaceLoading(false);
          },
          () => {
            setWorkspace(fallbackWorkspace);
            setWorkspaceLoading(false);
          },
        );

        // Non-blocking background sync — never delays the UI
        ensureUserWorkspace(firebaseUser).catch(() => {});
      } catch (error) {
        setWorkspace(fallbackWorkspace);
        setWorkspaceLoading(false);
      }
    });

    return () => {
      unsubscribe();
      if (workspaceUnsubscribe) workspaceUnsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const role = getEffectiveRole(user?.email, workspace?.role || 'staff');
  const isSuperAdmin = isSuperAdminRole(role);
  const mustResetPassword = Boolean(workspace?.auth?.mustResetPassword);
  const permissions = getPermissionsByRole(role);
  const settingsComplete = isSettingsComplete(workspace);
  const agencyId = workspace?.agencyId || null;

  const value = useMemo(
    () => ({
      user,
      loading,
      workspace,
      workspaceLoading,
      role,
      isSuperAdmin,
      mustResetPassword,
      permissions,
      settingsComplete,
      agencyId,
    }),
    [user, loading, workspace, workspaceLoading, role, isSuperAdmin, mustResetPassword, permissions, settingsComplete, agencyId],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
