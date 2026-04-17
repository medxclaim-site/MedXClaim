import {
  getDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const USER_WORKSPACE_COLLECTION = 'userWorkspaces';

const defaultRole = 'staff';
const SUPER_ADMIN_ROLE = 'super_admin';
const forcedSuperAdminEmails = ['medxclaim@gmail.com'];

const normalizeEmail = (email) => (email || '').trim().toLowerCase();

const configuredSuperAdminEmails = (import.meta.env.VITE_SUPER_ADMIN_EMAILS || '')
  .split(',')
  .map((email) => normalizeEmail(email))
  .filter(Boolean);

const allSuperAdminEmails = Array.from(
  new Set([...forcedSuperAdminEmails, ...configuredSuperAdminEmails].map((email) => normalizeEmail(email))),
);

const defaultDashboard = {
  kpis: {
    openClaims: 24,
    pendingAuthorizations: 8,
    denialsThisWeek: 3,
    avgResolutionDays: 4.2,
  },
  claimsStatus: [
    { label: 'Submitted', value: 36, color: 'from-blue-500 to-cyan-400' },
    { label: 'In Review', value: 14, color: 'from-indigo-500 to-blue-400' },
    { label: 'Approved', value: 42, color: 'from-emerald-500 to-teal-400' },
    { label: 'Denied', value: 8, color: 'from-rose-500 to-red-400' },
  ],
  recentActivity: [
    { id: 'a1', event: 'Claim #MC-2039 submitted', time: '2h ago', priority: 'normal' },
    { id: 'a2', event: 'Authorization updated for patient group A', time: '4h ago', priority: 'normal' },
    { id: 'a3', event: 'Denial response drafted for Claim #MC-1984', time: '6h ago', priority: 'high' },
  ],
  alerts: [
    { id: 'al1', title: '3 claims require follow-up today', level: 'warning' },
    { id: 'al2', title: '1 authorization expires in 24h', level: 'critical' },
  ],
};

const basePermissions = {
  canViewDashboard: true,
  canEditProfile: true,
  canManageBillingPreferences: true,
  canManageNotifications: true,
  canManageUsers: false,
  canViewAllClaims: false,
  canAssignTasks: false,
};

export const rolePermissions = {
  [SUPER_ADMIN_ROLE]: {
    ...basePermissions,
    canManageUsers: true,
    canViewAllClaims: true,
    canAssignTasks: true,
    canManageSuperAdminControls: true,
  },
  admin: {
    ...basePermissions,
    canManageUsers: true,
    canViewAllClaims: true,
    canAssignTasks: true,
  },
  staff: {
    ...basePermissions,
  },
};

export const getPermissionsByRole = (role) => {
  return rolePermissions[role] || rolePermissions.staff;
};

export const isSuperAdminEmail = (email) => allSuperAdminEmails.includes(normalizeEmail(email));

export const isSuperAdminRole = (role) => role === SUPER_ADMIN_ROLE;

export const getEffectiveRole = (userEmail, storedRole = defaultRole) => {
  if (isSuperAdminEmail(userEmail)) {
    return SUPER_ADMIN_ROLE;
  }

  return storedRole || defaultRole;
};

const getUserWorkspaceRef = (uid) => doc(db, USER_WORKSPACE_COLLECTION, uid);

const createDefaultWorkspace = (user) => ({
  role: getEffectiveRole(user.email, defaultRole),
  profile: {
    displayName: user.displayName || '',
    email: user.email || '',
    phone: '',
    jobTitle: '',
  },
  organization: {
    name: '',
    type: 'billing-agency',
    teamSize: '1-10',
  },
  billingPreferences: {
    defaultClaimType: 'medicaid',
    autoFollowUps: true,
    timezone: 'America/New_York',
  },
  notifications: {
    emailAlerts: true,
    slaAlerts: true,
    dailyDigest: false,
  },
  auth: {
    mustResetPassword: false,
    passwordLastUpdatedAt: null,
    createdBy: null,
    tempPasswordIssuedAt: null,
  },
  dashboard: defaultDashboard,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
});

export const ensureUserWorkspace = async (user) => {
  const ref = getUserWorkspaceRef(user.uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    await setDoc(ref, createDefaultWorkspace(user), { merge: true });
    return;
  }

  const data = snapshot.data() || {};
  // Only write if something actually needs updating — never write just updatedAt
  const payload = {};

  const effectiveRole = getEffectiveRole(user.email, data.role);
  if (data.role !== effectiveRole) {
    payload.role = effectiveRole;
  }

  if (!data.profile?.email && user.email) {
    payload.profile = { ...(data.profile || {}), email: user.email };
  }

  if (!data.auth) {
    payload.auth = {
      mustResetPassword: false,
      passwordLastUpdatedAt: null,
      createdBy: null,
      tempPasswordIssuedAt: null,
    };
  }

  // Only commit a write if there's something real to update
  if (Object.keys(payload).length > 0) {
    payload.updatedAt = serverTimestamp();
    await setDoc(ref, payload, { merge: true });
  }
};

export const subscribeToUserWorkspace = (uid, onData, onError) => {
  const ref = getUserWorkspaceRef(uid);
  return onSnapshot(
    ref,
    (snapshot) => {
      onData(snapshot.exists() ? snapshot.data() : null);
    },
    onError,
  );
};

export const updateWorkspaceSettings = async (uid, payload) => {
  const ref = getUserWorkspaceRef(uid);
  await updateDoc(ref, {
    ...payload,
    updatedAt: serverTimestamp(),
  });
};

export const isSettingsComplete = (workspace) => {
  if (!workspace) {
    return false;
  }

  const profileDone = Boolean(workspace.profile?.displayName && workspace.profile?.jobTitle);
  const organizationDone = Boolean(workspace.organization?.name && workspace.organization?.type);
  const billingDone = Boolean(workspace.billingPreferences?.defaultClaimType && workspace.billingPreferences?.timezone);

  return profileDone && organizationDone && billingDone;
};
