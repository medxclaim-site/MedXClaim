import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  ChevronDown,
  ChevronRight,
  Pencil,
  Plus,
  Trash2,
  UserPlus,
  X,
} from 'lucide-react';
import { subscribeToAgency, updateAgency } from '../../services/agencyService';
import { subscribeToClients, createClient, deleteClient } from '../../services/clientService';
import { subscribeToClaimsByClient, deleteClaim, updateClaim } from '../../services/claimService';
import ClaimModal from '../../components/portal/ClaimModal';
import { SkeletonCard } from '../../components/portal/Skeleton';

const STATUS_BADGE = {
  completed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  denied: 'bg-red-500/15 text-red-300 border-red-500/25',
  pending: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  other: 'bg-slate-500/15 text-slate-300 border-slate-500/25',
};

const STATUS_OPTIONS = ['pending', 'completed', 'denied', 'other'];

// ─── Inline status selector (super admin can edit) ───────────────────────────
const StatusCell = ({ claim }) => {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(claim.status);
  const [custom, setCustom] = useState(claim.customStatus || '');
  const [saving, setSaving] = useState(false);

  const save = async (status, customStatus) => {
    setSaving(true);
    await updateClaim(claim.id, { status, customStatus: status === 'other' ? customStatus : '' });
    setSaving(false);
    setEditing(false);
  };

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className={`inline-block px-2.5 py-1 rounded-lg border text-xs font-medium capitalize cursor-pointer hover:opacity-80 transition-opacity ${
          STATUS_BADGE[claim.status] || STATUS_BADGE.other
        }`}
      >
        {claim.status === 'other' ? (claim.customStatus || 'Other') : claim.status}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 min-w-[140px]">
      <select
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="bg-slate-800 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none focus:border-blue-500/50"
        autoFocus
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>
      {val === 'other' && (
        <input
          type="text"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Describe…"
          maxLength={80}
          className="bg-slate-800 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none focus:border-blue-500/50"
        />
      )}
      <div className="flex gap-1.5">
        <button
          type="button"
          disabled={saving}
          onClick={() => save(val, custom)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs py-1.5 rounded-lg transition-colors"
        >
          {saving ? '…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="flex-1 border border-white/10 text-slate-300 text-xs py-1.5 rounded-lg hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// ─── Client claims table (super admin view) ───────────────────────────────────
const ClientClaimsTable = ({ client, agencyId }) => {
  const [claims, setClaims] = useState(null);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null); // null | 'add' | claimObj

  useEffect(() => {
    if (!open) return;
    const unsub = subscribeToClaimsByClient(client.id, setClaims, () => setClaims([]));
    return unsub;
  }, [client.id, open]);

  const handleDeleteClaim = async (claimId) => {
    if (!window.confirm('Delete this claim?')) return;
    await deleteClaim(claimId);
  };

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        {open ? (
          <ChevronDown size={16} className="text-blue-400 flex-shrink-0" />
        ) : (
          <ChevronRight size={16} className="text-slate-500 flex-shrink-0" />
        )}
        <span className="font-medium text-white">{client.name}</span>
      </button>

      {open && (
        <div className="border-t border-white/10">
          {claims === null ? (
            <div className="p-5">
              <div className="h-3 bg-white/10 rounded animate-pulse w-1/3" />
            </div>
          ) : claims.length === 0 ? (
            <p className="px-5 py-4 text-sm text-slate-500">No claims yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {['Date', 'Hours', 'Amount', 'Status', 'Actions'].map((h) => (
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
                  {claims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3 text-slate-300">{claim.date || '—'}</td>
                      <td className="px-5 py-3 text-slate-300">{claim.hours}</td>
                      <td className="px-5 py-3 text-slate-300">
                        ${Number(claim.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-5 py-3">
                        <StatusCell claim={claim} />
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setModal(claim)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteClaim(claim.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="px-5 py-3">
            <button
              type="button"
              onClick={() => setModal('add')}
              className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              <Plus size={14} />
              Add Claim
            </button>
          </div>
        </div>
      )}

      {modal && (
        <ClaimModal
          clientId={client.id}
          agencyId={agencyId}
          claim={modal === 'add' ? undefined : modal}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────
const AgencyDetail = () => {
  const { agencyId } = useParams();
  const navigate = useNavigate();

  const [agency, setAgency] = useState(undefined); // undefined = loading
  const [clients, setClients] = useState(null);
  const [editingAgency, setEditingAgency] = useState(false);
  const [agencyForm, setAgencyForm] = useState({ name: '', email: '' });
  const [saving, setSaving] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [addingClient, setAddingClient] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);

  useEffect(() => {
    const unsub = subscribeToAgency(agencyId, setAgency, () => setAgency(null));
    return unsub;
  }, [agencyId]);

  useEffect(() => {
    const unsub = subscribeToClients(agencyId, setClients, () => setClients([]));
    return unsub;
  }, [agencyId]);

  useEffect(() => {
    if (agency) {
      setAgencyForm({ name: agency.name || '', email: agency.email || '' });
    }
  }, [agency]);

  const totalStats = useMemo(() => {
    if (!clients) return { clients: 0 };
    return { clients: clients.length };
  }, [clients]);

  const handleSaveAgency = async (e) => {
    e.preventDefault();
    if (!agencyForm.name.trim()) return;
    setSaving(true);
    await updateAgency(agencyId, { name: agencyForm.name.trim(), email: agencyForm.email.trim().toLowerCase() });
    setSaving(false);
    setEditingAgency(false);
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!newClientName.trim()) return;
    setAddingClient(true);
    await createClient(agencyId, newClientName);
    setNewClientName('');
    setShowAddClient(false);
    setAddingClient(false);
  };

  const handleDeleteClient = async (clientId, name) => {
    if (!window.confirm(`Delete client "${name}"?`)) return;
    await deleteClient(clientId);
  };

  const formatDate = (ts) => {
    if (!ts) return '—';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (agency === undefined) {
    return (
      <div className="space-y-4 max-w-5xl">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (agency === null) {
    return (
      <div className="max-w-xl text-center py-20">
        <p className="text-slate-400">Agency not found.</p>
        <button
          type="button"
          onClick={() => navigate('/portal/super-admin')}
          className="mt-4 text-blue-400 hover:underline text-sm"
        >
          Back to Agencies
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate('/portal/super-admin')}
        className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Agencies
      </button>

      {/* Agency header */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        {editingAgency ? (
          <form onSubmit={handleSaveAgency} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Organization Name</label>
                <input
                  type="text"
                  value={agencyForm.name}
                  onChange={(e) => setAgencyForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Email</label>
                <input
                  type="email"
                  value={agencyForm.email}
                  onChange={(e) => setAgencyForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => setEditingAgency(false)}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 text-sm hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Building2 size={22} className="text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{agency.name}</h1>
                <p className="text-slate-400 text-sm">{agency.email}</p>
                <p className="text-slate-500 text-xs mt-1">Onboarded {formatDate(agency.createdAt)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEditingAgency(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm transition-colors"
            >
              <Pencil size={14} />
              Edit
            </button>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-white/10 flex gap-6">
          <div>
            <p className="text-xs text-slate-500">Clients</p>
            <p className="text-2xl font-bold text-white">{clients === null ? '…' : totalStats.clients}</p>
          </div>
        </div>
      </div>

      {/* Clients + claims */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white">Clients &amp; Claims</h2>
          <button
            type="button"
            onClick={() => setShowAddClient((v) => !v)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            <UserPlus size={15} />
            Add Client
          </button>
        </div>

        {showAddClient && (
          <form
            onSubmit={handleAddClient}
            className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3 mb-4"
          >
            <input
              type="text"
              placeholder="Client full name..."
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              maxLength={100}
              autoFocus
              className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={addingClient || !newClientName.trim()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
            >
              {addingClient ? 'Adding…' : 'Add'}
            </button>
            <button
              type="button"
              onClick={() => { setShowAddClient(false); setNewClientName(''); }}
              className="p-2 rounded-xl border border-white/10 text-slate-400 hover:bg-white/5 transition-colors"
            >
              <X size={16} />
            </button>
          </form>
        )}

        {clients === null ? (
          <div className="space-y-3">
            {[1, 2].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-sm">
            No clients added yet.
          </div>
        ) : (
          <div className="space-y-3">
            {clients.map((client) => (
              <ClientClaimsTable
                key={client.id}
                client={client}
                agencyId={agencyId}
                onDeleteClient={handleDeleteClient}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgencyDetail;
