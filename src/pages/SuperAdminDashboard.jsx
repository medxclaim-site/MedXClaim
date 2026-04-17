import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Bell, PlusCircle, Save, Shield, UserPlus, Users } from 'lucide-react';
import {
  addManagedUserActivity,
  addManagedUserAlert,
  createAgencyAccount,
  setManagedUserResetFlag,
  setManagedUserRole,
  subscribeToManagedUsers,
  updateManagedUserClaimsStatus,
} from '../services/adminService';
import { useAuth } from '../context/AuthContext';

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [managedUsers, setManagedUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [createForm, setCreateForm] = useState({
    displayName: '',
    email: '',
    organizationName: '',
    role: 'admin',
    tempPassword: '',
  });

  const [claimsStatusInput, setClaimsStatusInput] = useState([
    { label: 'Submitted', value: 0, color: 'from-blue-500 to-cyan-400' },
    { label: 'In Review', value: 0, color: 'from-indigo-500 to-blue-400' },
    { label: 'Approved', value: 0, color: 'from-emerald-500 to-teal-400' },
    { label: 'Denied', value: 0, color: 'from-rose-500 to-red-400' },
  ]);

  const [alertInput, setAlertInput] = useState({ title: '', level: 'warning' });
  const [activityInput, setActivityInput] = useState({ event: '', priority: 'normal' });

  useEffect(() => {
    const unsubscribe = subscribeToManagedUsers(
      (users) => {
        setManagedUsers(users);
        setSelectedUserId((current) => (current || users[0]?.uid || ''));
      },
      () => {
        setError('Unable to load managed users right now.');
      },
    );

    return () => unsubscribe();
  }, []);

  const selectedUser = useMemo(
    () => managedUsers.find((entry) => entry.uid === selectedUserId),
    [managedUsers, selectedUserId],
  );

  useEffect(() => {
    if (!selectedUser?.dashboard?.claimsStatus) {
      return;
    }

    const normalized = selectedUser.dashboard.claimsStatus.map((entry) => ({
      label: entry.label,
      value: Number(entry.value) || 0,
      color: entry.color || 'from-blue-500 to-cyan-400',
    }));

    if (normalized.length) {
      setClaimsStatusInput(normalized);
    }
  }, [selectedUser]);

  const handleCreateField = (field, value) => {
    setCreateForm((current) => ({ ...current, [field]: value }));
    setError('');
    setSuccess('');
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (createForm.tempPassword.length < 8) {
      setError('Temporary password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    try {
      await createAgencyAccount({
        ...createForm,
        createdByEmail: user?.email || 'super-admin',
      });
      setSuccess('Agency account created. User must set a new password on first login.');
      setCreateForm({
        displayName: '',
        email: '',
        organizationName: '',
        role: 'admin',
        tempPassword: '',
      });
    } catch (createError) {
      setError('Unable to create account. Check email/password format and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (uid, role) => {
    setError('');
    setSuccess('');
    try {
      await setManagedUserRole(uid, role);
      setSuccess('User role updated.');
    } catch (roleError) {
      setError('Could not update user role right now.');
    }
  };

  const handleResetToggle = async (uid, mustResetPassword) => {
    setError('');
    setSuccess('');
    try {
      await setManagedUserResetFlag(uid, mustResetPassword);
      setSuccess('Password reset requirement updated.');
    } catch (resetError) {
      setError('Could not update password reset requirement.');
    }
  };

  const handleClaimValueChange = (index, value) => {
    setClaimsStatusInput((current) =>
      current.map((entry, rowIndex) =>
        rowIndex === index
          ? { ...entry, value: Math.max(0, Math.min(100, Number(value) || 0)) }
          : entry,
      ),
    );
  };

  const handleSaveClaims = async () => {
    if (!selectedUser) {
      return;
    }

    setError('');
    setSuccess('');
    try {
      await updateManagedUserClaimsStatus(selectedUser.uid, claimsStatusInput);
      setSuccess('Claims status distribution saved.');
    } catch (claimsError) {
      setError('Unable to save claim status right now.');
    }
  };

  const handleAddAlert = async (event) => {
    event.preventDefault();
    if (!selectedUser || !alertInput.title.trim()) {
      return;
    }

    setError('');
    setSuccess('');
    try {
      await addManagedUserAlert(selectedUser.uid, alertInput.title.trim(), alertInput.level);
      setSuccess('Alert added to selected user dashboard.');
      setAlertInput({ title: '', level: 'warning' });
    } catch (alertError) {
      setError('Unable to add alert right now.');
    }
  };

  const handleAddActivity = async (event) => {
    event.preventDefault();
    if (!selectedUser || !activityInput.event.trim()) {
      return;
    }

    setError('');
    setSuccess('');
    try {
      await addManagedUserActivity(selectedUser.uid, activityInput.event.trim(), activityInput.priority);
      setSuccess('Activity item added.');
      setActivityInput({ event: '', priority: 'normal' });
    } catch (activityError) {
      setError('Unable to add activity right now.');
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-sky-300 mb-2">Super Admin</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">User, Claims, Activity & Alerts Control</h1>
            </div>
            <span className="inline-flex items-center gap-2 rounded-xl border border-sky-400/30 bg-sky-500/10 px-3 py-2 text-sky-200 text-sm">
              <Shield size={16} /> High privilege zone
            </span>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200 flex gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          {success ? (
            <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
              {success}
            </div>
          ) : null}
        </motion.section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleCreateAccount}
            className="card xl:col-span-2 space-y-4"
          >
            <h2 className="text-2xl font-semibold text-white inline-flex items-center gap-2">
              <UserPlus size={20} /> Create Agency Account
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={createForm.displayName}
                onChange={(event) => handleCreateField('displayName', event.target.value)}
                required
                placeholder="Display name"
                className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
              />
              <input
                type="email"
                value={createForm.email}
                onChange={(event) => handleCreateField('email', event.target.value)}
                required
                placeholder="agency@example.com"
                className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
              />
              <input
                value={createForm.organizationName}
                onChange={(event) => handleCreateField('organizationName', event.target.value)}
                required
                placeholder="Organization name"
                className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
              />
              <select
                value={createForm.role}
                onChange={(event) => handleCreateField('role', event.target.value)}
                className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
              <input
                type="text"
                value={createForm.tempPassword}
                onChange={(event) => handleCreateField('tempPassword', event.target.value)}
                required
                placeholder="Temporary password"
                className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white md:col-span-2"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary px-6 py-2.5 inline-flex items-center gap-2">
              <PlusCircle size={16} />
              {loading ? 'Creating...' : 'Create account'}
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
            <h2 className="text-2xl font-semibold text-white inline-flex items-center gap-2 mb-4">
              <Users size={20} /> Managed Users
            </h2>
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {managedUsers.map((entry) => (
                <button
                  key={entry.uid}
                  type="button"
                  onClick={() => setSelectedUserId(entry.uid)}
                  className={`w-full text-left rounded-xl border px-3 py-2 transition-colors ${
                    selectedUserId === entry.uid
                      ? 'border-sky-400/40 bg-sky-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <p className="text-sm text-white truncate">{entry.profile?.displayName || 'Unnamed User'}</p>
                  <p className="text-xs text-gray-400 truncate">{entry.profile?.email || 'No email'}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {selectedUser ? (
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card xl:col-span-2 space-y-4">
              <h2 className="text-2xl font-semibold text-white">Selected Account Controls</h2>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-white font-medium">{selectedUser.profile?.displayName || 'Unnamed User'}</p>
                <p className="text-sm text-gray-300">{selectedUser.profile?.email || 'No email'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-200 mb-2 block">Role</span>
                  <select
                    value={selectedUser.role || 'staff'}
                    onChange={(event) => handleRoleUpdate(selectedUser.uid, event.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                  >
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>

                <label className="inline-flex items-center gap-3 text-gray-200 mt-8">
                  <input
                    type="checkbox"
                    checked={Boolean(selectedUser.auth?.mustResetPassword)}
                    onChange={(event) => handleResetToggle(selectedUser.uid, event.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-900"
                  />
                  Force password reset on next login
                </label>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <h3 className="text-lg font-semibold text-white">Claims Status Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {claimsStatusInput.map((entry, index) => (
                    <label key={entry.label} className="block">
                      <span className="text-sm text-gray-200 mb-2 block">{entry.label} (%)</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={entry.value}
                        onChange={(event) => handleClaimValueChange(index, event.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                      />
                    </label>
                  ))}
                </div>
                <button type="button" onClick={handleSaveClaims} className="btn-secondary px-5 py-2.5 inline-flex items-center gap-2">
                  <Save size={16} /> Save claim status
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <form onSubmit={handleAddAlert} className="card space-y-3">
                <h3 className="text-xl font-semibold text-white inline-flex items-center gap-2">
                  <Bell size={18} /> Add Alert
                </h3>
                <input
                  value={alertInput.title}
                  onChange={(event) => setAlertInput((current) => ({ ...current, title: event.target.value }))}
                  placeholder="Alert title"
                  className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                />
                <select
                  value={alertInput.level}
                  onChange={(event) => setAlertInput((current) => ({ ...current, level: event.target.value }))}
                  className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                >
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                  <option value="info">Info</option>
                </select>
                <button type="submit" className="btn-secondary px-5 py-2.5">Add alert</button>
              </form>

              <form onSubmit={handleAddActivity} className="card space-y-3">
                <h3 className="text-xl font-semibold text-white">Add Activity</h3>
                <input
                  value={activityInput.event}
                  onChange={(event) => setActivityInput((current) => ({ ...current, event: event.target.value }))}
                  placeholder="Activity event"
                  className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                />
                <select
                  value={activityInput.priority}
                  onChange={(event) => setActivityInput((current) => ({ ...current, priority: event.target.value }))}
                  className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
                <button type="submit" className="btn-secondary px-5 py-2.5">Add activity</button>
              </form>
            </motion.div>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
