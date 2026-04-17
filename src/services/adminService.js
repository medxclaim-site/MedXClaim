import { deleteApp, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { app, db } from '../firebase';

const USER_WORKSPACE_COLLECTION = 'userWorkspaces';
const AGENCIES_COLLECTION = 'agencies';

const buildStarterDashboard = () => ({
  kpis: {
    openClaims: 0,
    pendingAuthorizations: 0,
    denialsThisWeek: 0,
    avgResolutionDays: 0,
  },
  claimsStatus: [
    { label: 'Submitted', value: 0, color: 'from-blue-500 to-cyan-400' },
    { label: 'In Review', value: 0, color: 'from-indigo-500 to-blue-400' },
    { label: 'Approved', value: 0, color: 'from-emerald-500 to-teal-400' },
    { label: 'Denied', value: 0, color: 'from-rose-500 to-red-400' },
  ],
  recentActivity: [],
  alerts: [],
});

export const subscribeToManagedUsers = (onData, onError) => {
  const ref = collection(db, USER_WORKSPACE_COLLECTION);

  return onSnapshot(
    ref,
    (snapshot) => {
      const users = snapshot.docs.map((entry) => ({
        uid: entry.id,
        ...entry.data(),
      }));

      users.sort((a, b) => {
        const aTime = a.updatedAt?.toMillis?.() || 0;
        const bTime = b.updatedAt?.toMillis?.() || 0;
        return bTime - aTime;
      });

      onData(users);
    },
    onError,
  );
};

// Subscribe to all agency accounts — merges userWorkspaces (non-super-admin) + agencies collection
// This ensures old accounts that only have an agencies doc (no workspace yet) also appear.
export const subscribeToAdminUsers = (onData, onError) => {
  let workspaceData = null;
  let agenciesData = null;

  const merge = () => {
    if (workspaceData === null || agenciesData === null) return; // wait for both

    // Build map from workspace entries keyed by email
    const emailMap = {};

    // 1. Workspace entries (non-super-admin)
    for (const ws of workspaceData) {
      const email = (ws.profile?.email || '').toLowerCase();
      if (!email) continue;
      emailMap[email] = {
        uid: ws.uid,
        agencyId: ws.agencyId || null,
        name: ws.organization?.name || ws.profile?.displayName || email.split('@')[0] || 'Unknown',
        email,
        createdAt: ws.createdAt || null,
        source: 'workspace',
      };
    }

    // 2. Agencies collection — adds entries not already covered by workspace
    for (const ag of agenciesData) {
      const email = (ag.email || '').toLowerCase();
      if (!email) continue;
      if (!emailMap[email]) {
        emailMap[email] = {
          uid: ag.ownerUid || ag.id,
          agencyId: ag.id,
          name: ag.name || email.split('@')[0] || 'Unknown',
          email,
          createdAt: ag.createdAt || null,
          source: 'agencies',
        };
      }
    }

    const sorted = Object.values(emailMap).sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() || 0;
      const bTime = b.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });

    onData(sorted);
  };

  // Listener 1: userWorkspaces (non-super-admin)
  const unsubWS = onSnapshot(
    collection(db, USER_WORKSPACE_COLLECTION),
    (snap) => {
      workspaceData = snap.docs
        .map((d) => ({ uid: d.id, ...d.data() }))
        .filter((u) => u.role !== 'super_admin');
      merge();
    },
    (err) => { workspaceData = []; merge(); onError?.(err); },
  );

  // Listener 2: agencies collection (catches old accounts with no workspace doc)
  const unsubAg = onSnapshot(
    collection(db, AGENCIES_COLLECTION),
    (snap) => {
      agenciesData = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      merge();
    },
    () => { agenciesData = []; merge(); },
  );

  // Return combined unsubscribe
  return () => { unsubWS(); unsubAg(); };
};

// Delete agency: removes workspace doc + agencies doc (if exists)
export const deleteAgencyAccount = async (agencyId, uid) => {
  const ops = [];
  if (uid) ops.push(deleteDoc(doc(db, USER_WORKSPACE_COLLECTION, uid)).catch(() => {}));
  if (agencyId) ops.push(deleteDoc(doc(db, AGENCIES_COLLECTION, agencyId)).catch(() => {}));
  await Promise.all(ops);
};

export const createAgencyAccount = async ({
  email,
  tempPassword,
  displayName,
  organizationName,
  role,
  createdByEmail,
}) => {
  const appName = `provisioning-${Date.now()}`;
  const secondaryApp = initializeApp(app.options, appName);
  const secondaryAuth = getAuth(secondaryApp);

  try {
    const credential = await createUserWithEmailAndPassword(secondaryAuth, email, tempPassword);
    const uid = credential.user.uid;

    // Prepare data for both documents
    const agencyData = {
      name: organizationName,
      email: email.trim().toLowerCase(),
      status: 'active',
      pendingAuthorizations: 0,
      ownerUid: uid,
      createdAt: serverTimestamp(),
    };

    const workspaceData = {
      role,
      agencyId: '', // Will be set after agency creation
      profile: {
        displayName,
        email,
        phone: '',
        jobTitle: 'Agency Admin',
      },
      organization: {
        name: organizationName,
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
        mustResetPassword: true,
        passwordLastUpdatedAt: null,
        createdBy: createdByEmail,
        tempPasswordIssuedAt: serverTimestamp(),
      },
      dashboard: buildStarterDashboard(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Create agency document
    const agencyRef = await addDoc(collection(db, AGENCIES_COLLECTION), agencyData);
    const agencyId = agencyRef.id;

    // Update workspace with agency ID and create/update workspace
    workspaceData.agencyId = agencyId;
    
    // Use setDoc without merge for faster writes (creates or overwrites, no need for merge flag)
    await setDoc(doc(db, USER_WORKSPACE_COLLECTION, uid), workspaceData);

    return { uid, agencyId };
  } finally {
    await signOut(secondaryAuth).catch(() => undefined);
    await deleteApp(secondaryApp).catch(() => undefined);
  }
};

export const setManagedUserRole = async (uid, role) => {
  await updateDoc(doc(db, USER_WORKSPACE_COLLECTION, uid), {
    role,
    updatedAt: serverTimestamp(),
  });
};

export const setManagedUserResetFlag = async (uid, mustResetPassword) => {
  await updateDoc(doc(db, USER_WORKSPACE_COLLECTION, uid), {
    'auth.mustResetPassword': mustResetPassword,
    updatedAt: serverTimestamp(),
  });
};

export const updateManagedUserClaimsStatus = async (uid, statusRows) => {
  await updateDoc(doc(db, USER_WORKSPACE_COLLECTION, uid), {
    'dashboard.claimsStatus': statusRows,
    updatedAt: serverTimestamp(),
  });
};

export const addManagedUserAlert = async (uid, title, level) => {
  const ref = doc(db, USER_WORKSPACE_COLLECTION, uid);
  const snapshot = await getDoc(ref);
  const workspace = snapshot.data() || {};
  const dashboard = workspace.dashboard || {};
  const alerts = Array.isArray(dashboard.alerts) ? dashboard.alerts : [];

  const nextAlerts = [
    {
      id: `al-${Date.now()}`,
      title,
      level,
    },
    ...alerts,
  ].slice(0, 20);

  await updateDoc(ref, {
    'dashboard.alerts': nextAlerts,
    updatedAt: serverTimestamp(),
  });
};

export const addManagedUserActivity = async (uid, event, priority) => {
  const ref = doc(db, USER_WORKSPACE_COLLECTION, uid);
  const snapshot = await getDoc(ref);
  const workspace = snapshot.data() || {};
  const dashboard = workspace.dashboard || {};
  const recentActivity = Array.isArray(dashboard.recentActivity) ? dashboard.recentActivity : [];

  const nextActivity = [
    {
      id: `act-${Date.now()}`,
      event,
      time: 'just now',
      priority,
    },
    ...recentActivity,
  ].slice(0, 30);

  await updateDoc(ref, {
    'dashboard.recentActivity': nextActivity,
    updatedAt: serverTimestamp(),
  });
};
