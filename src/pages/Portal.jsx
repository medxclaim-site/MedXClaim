import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { AlertTriangle, Bell, CheckCircle2, Clock3, Shield, Users } from 'lucide-react';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

const kpiLabels = {
  openClaims: 'Open Claims',
  pendingAuthorizations: 'Pending Authorizations',
  denialsThisWeek: 'Denials This Week',
  avgResolutionDays: 'Avg Resolution (days)',
};

const alertStyles = {
  warning: 'border-amber-400/30 bg-amber-500/10 text-amber-200',
  critical: 'border-red-400/30 bg-red-500/10 text-red-200',
  info: 'border-blue-400/30 bg-blue-500/10 text-blue-200',
};

const Portal = () => {
  const { user, workspace, role, permissions, settingsComplete, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login', { replace: true });
  };

  const dashboard = workspace?.dashboard || {
    kpis: {},
    claimsStatus: [],
    recentActivity: [],
    alerts: [],
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-teal-300 mb-2">Dashboard</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Welcome back, {user?.displayName || 'Team'}</h1>
              <p className="text-gray-300">Signed in as <span className="text-teal-300">{user?.email}</span></p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {isSuperAdmin ? (
                <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-200">
                  Role: {role}
                </span>
              ) : null}
              {!settingsComplete ? (
                <button
                  type="button"
                  onClick={() => navigate('/portal/settings')}
                  className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-amber-200 hover:bg-amber-500/20 transition-colors"
                >
                  Complete Required Settings
                </button>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-emerald-200 text-sm">
                  <CheckCircle2 size={16} /> Settings complete
                </span>
              )}
              {isSuperAdmin ? (
                <button onClick={() => navigate('/portal/super-admin')} className="rounded-xl border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-sky-200 hover:bg-sky-500/20 transition-colors">
                  Super Admin Console
                </button>
              ) : null}
              <button onClick={handleSignOut} className="btn-secondary px-5 py-2.5">
                Sign out
              </button>
            </div>
          </div>
        </motion.section>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 auto-rows-fr items-stretch">
          {Object.entries(dashboard.kpis || {}).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="card h-full"
            >
              <p className="text-gray-300 text-sm mb-2">{kpiLabels[key] || key}</p>
              <p className="text-4xl font-bold text-white">{value}</p>
            </motion.div>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="card xl:col-span-2">
            <h2 className="text-2xl font-semibold text-white mb-5">Claims Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(dashboard.claimsStatus || []).map((status) => (
                <div key={status.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-200">{status.label}</p>
                    <p className="text-white font-bold">{status.value}%</p>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${status.color}`}
                      style={{ width: `${status.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="card">
            <h2 className="text-2xl font-semibold text-white mb-5">Alerts</h2>
            <div className="space-y-3">
              {(dashboard.alerts || []).map((alert) => (
                <div key={alert.id} className={`rounded-xl border p-3 text-sm ${alertStyles[alert.level] || alertStyles.info}`}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{alert.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="card xl:col-span-2">
            <h2 className="text-2xl font-semibold text-white mb-5">Recent Activity</h2>
            <div className="space-y-3">
              {(dashboard.recentActivity || []).map((item) => (
                <div key={item.id} className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-start gap-3">
                  <Clock3 className="w-4 h-4 mt-1 text-teal-300" />
                  <div>
                    <p className="text-gray-100">{item.event}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {isSuperAdmin ? (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="card">
              <h2 className="text-2xl font-semibold text-white mb-5">Access & Permissions</h2>
              <div className="space-y-3 mb-5">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center gap-3">
                  <Shield className="w-4 h-4 text-blue-300" />
                  <span className="text-gray-200 text-sm">Can manage users: {permissions.canManageUsers ? 'Yes' : 'No'}</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center gap-3">
                  <Users className="w-4 h-4 text-blue-300" />
                  <span className="text-gray-200 text-sm">Can assign tasks: {permissions.canAssignTasks ? 'Yes' : 'No'}</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center gap-3">
                  <Bell className="w-4 h-4 text-blue-300" />
                  <span className="text-gray-200 text-sm">Can view all claims: {permissions.canViewAllClaims ? 'Yes' : 'No'}</span>
                </div>
              </div>
              <p className="text-emerald-200 text-sm">Super admin view enabled: workspace-wide control panel is active.</p>
            </motion.div>
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default Portal;
