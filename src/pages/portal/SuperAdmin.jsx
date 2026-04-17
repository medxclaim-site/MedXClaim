import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus, Trash2, ExternalLink, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { subscribeToAdminUsers, deleteAgencyAccount, createAgencyAccount } from '../../services/adminService';
import { SkeletonCard } from '../../components/portal/Skeleton';

// Memoized row — only re-renders when this specific agency's data changes
const AgencyRow = memo(({ agency, onView, onDelete, formatDate }) => (
  <tr className="hover:bg-white/5 transition-colors">
    <td className="px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
          <Building2 size={14} className="text-blue-400" />
        </div>
        <span className="font-medium text-white">{agency.name}</span>
      </div>
    </td>
    <td className="px-5 py-4 text-slate-300">{agency.email}</td>
    <td className="px-5 py-4 text-slate-400">{formatDate(agency.createdAt)}</td>
    <td className="px-5 py-4">
      <span className="inline-block px-2.5 py-1 rounded-lg border text-xs font-medium capitalize bg-emerald-500/15 text-emerald-300 border-emerald-500/25">
        active
      </span>
    </td>
    <td className="px-5 py-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onView(agency.agencyId || agency.uid)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors"
          title="View agency"
        >
          <ExternalLink size={15} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(agency.uid, agency.agencyId, agency.name)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          title="Delete agency"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </td>
  </tr>
));
AgencyRow.displayName = 'AgencyRow';

const EMPTY_FORM = { displayName: '', email: '', organizationName: '', tempPassword: '' };

const SuperAdmin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rawAdmins, setRawAdmins] = useState(null); // null = still loading
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Source of truth: userWorkspaces role=admin — always shows all accounts
  useEffect(() => {
    const unsub = subscribeToAdminUsers(setRawAdmins, () => setRawAdmins([]));
    return unsub;
  }, []);

  // Normalize into display objects — handles both merged and raw workspace shapes
  const agencies = useMemo(() => {
    if (!rawAdmins) return null;
    return rawAdmins.map((ws) => {
      const email = ws.email || ws.profile?.email || '';
      const name =
        ws.name ||
        ws.organization?.name ||
        ws.profile?.displayName ||
        email.split('@')[0] ||
        'Unknown Agency';
      return {
        uid: ws.uid,
        agencyId: ws.agencyId || null,
        name,
        email,
        createdAt: ws.createdAt || null,
      };
    });
  }, [rawAdmins]);

  const filteredAgencies = useMemo(() => {
    if (!agencies) return [];
    if (!searchTerm.trim()) return agencies;
    const t = searchTerm.toLowerCase();
    return agencies.filter(
      (a) => a.name?.toLowerCase().includes(t) || a.email?.toLowerCase().includes(t),
    );
  }, [agencies, searchTerm]);

  const setField = useCallback((k, v) => {
    setError('');
    setSuccess('');
    setForm((prev) => ({ ...prev, [k]: v }));
  }, []);

  const handleViewAgency = useCallback(
    (id) => navigate(`/portal/super-admin/agencies/${id}`),
    [navigate],
  );

  // uid + agencyId passed directly so this callback never captures stale agencies
  const handleDeleteAgency = useCallback((uid, agencyId, name) => {
    if (!window.confirm(`Delete agency "${name}"? This will remove their portal access.`)) return;
    deleteAgencyAccount(agencyId || null, uid);
  }, []);

  const formatDate = useCallback((ts) => {
    if (!ts) return '—';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }, []);

  const handleCreate = useCallback(
    async (e) => {
      e.preventDefault();
      if (!form.email || !form.tempPassword || !form.organizationName) {
        setError('Email, organization name, and temporary password are required.');
        return;
      }
      if (form.tempPassword.length < 8) {
        setError('Temporary password must be at least 8 characters.');
        return;
      }
      setCreating(true);
      setError('');
      try {
        await createAgencyAccount({
          email: form.email.trim().toLowerCase(),
          tempPassword: form.tempPassword,
          displayName: form.displayName.trim() || form.email.split('@')[0],
          organizationName: form.organizationName.trim(),
          role: 'admin',
          createdByEmail: user?.email,
        });
        setSuccess(`Agency "${form.organizationName}" created. They must change their password on first login.`);
        setForm(EMPTY_FORM);
        setShowCreate(false);
      } catch (err) {
        setError(err.message || 'Failed to create agency account.');
      } finally {
        setCreating(false);
      }
    },
    [form.email, form.tempPassword, form.organizationName, form.displayName, user?.email],
  );

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-purple-400 mb-1">Super Admin</p>
          <h1 className="text-3xl font-bold text-white">Agency Management</h1>
          <p className="text-slate-400 text-sm mt-1">
            {agencies
              ? `${agencies.length} ${agencies.length === 1 ? 'agency' : 'agencies'} onboarded`
              : 'Loading…'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate((v) => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          New Agency
        </button>
      </div>

      {/* Feedback */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 text-sm flex items-start gap-2">
          <span className="flex-1">{error}</span>
          <button type="button" onClick={() => setError('')}><X size={14} /></button>
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-300 text-sm flex items-start gap-2">
          <span className="flex-1">{success}</span>
          <button type="button" onClick={() => setSuccess('')}><X size={14} /></button>
        </div>
      )}

      {/* Create form */}
      {showCreate && (
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Create Agency Account</h2>
            <button type="button" onClick={() => setShowCreate(false)} className="text-slate-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleCreate} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Organization Name *</label>
              <input
                type="text"
                value={form.organizationName}
                onChange={(e) => setField('organizationName', e.target.value)}
                placeholder="Acme Billing LLC"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Admin Name</label>
              <input
                type="text"
                value={form.displayName}
                onChange={(e) => setField('displayName', e.target.value)}
                placeholder="Jane Smith"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                placeholder="admin@agencyname.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Temporary Password *</label>
              <input
                type="password"
                value={form.tempPassword}
                onChange={(e) => setField('tempPassword', e.target.value)}
                placeholder="Min 8 characters"
                minLength={8}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
                required
              />
            </div>
            <div className="sm:col-span-2 flex gap-3 pt-1">
              <button
                type="submit"
                disabled={creating}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
              >
                {creating ? 'Creating…' : 'Create Agency'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 text-sm hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      {agencies && agencies.length > 0 && (
        <input
          type="text"
          placeholder="Search by name or email…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 placeholder-slate-500"
        />
      )}

      {/* Agency list */}
      {agencies === null ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredAgencies.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-slate-500">
          <Building2 size={40} className="opacity-30" />
          <p className="text-sm">
            {searchTerm ? 'No agencies match your search.' : 'No agencies yet. Create one above.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['Organization', 'Email', 'Created', 'Status', 'Actions'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs uppercase tracking-wider text-slate-500 font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAgencies.map((agency) => (
                <AgencyRow
                  key={agency.uid}
                  agency={agency}
                  onView={handleViewAgency}
                  onDelete={handleDeleteAgency}
                  formatDate={formatDate}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;
