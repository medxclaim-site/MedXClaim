import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Pencil, Trash2, Search, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { subscribeToClients, createClient, deleteClient } from '../../services/clientService';
import { subscribeToClaimsByClient, deleteClaim, updateClaim } from '../../services/claimService';
import ClaimModal from '../../components/portal/ClaimModal';
import { SkeletonCard } from '../../components/portal/Skeleton';

const STATUS_OPTIONS = ['pending', 'completed', 'denied', 'other'];

const STATUS_BADGE = {
  completed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  denied: 'bg-red-500/15 text-red-300 border-red-500/25',
  pending: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  other: 'bg-slate-500/15 text-slate-300 border-slate-500/25',
};

// ─── Inline status selector ───────────────────────────────────────────────────
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

// ─── Claims table for one client ─────────────────────────────────────────────
const ClientClaims = ({ clientId, agencyId, onAddClaim, isReadOnly }) => {
  const [claims, setClaims] = useState(null);
  const [editingClaim, setEditingClaim] = useState(null);

  useEffect(() => {
    const unsub = subscribeToClaimsByClient(clientId, setClaims, () => setClaims([]));
    return unsub;
  }, [clientId]);

  const handleDelete = async (claimId) => {
    if (!window.confirm('Delete this claim?')) return;
    await deleteClaim(claimId);
  };

  if (claims === null) {
    return (
      <div className="px-5 py-4">
        <div className="h-3 bg-white/10 rounded animate-pulse w-1/2" />
      </div>
    );
  }

  return (
    <div className="border-t border-white/10">
      {claims.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['Date', 'Hours', 'Amount (USD)', 'Status', ...(isReadOnly ? [] : ['Actions'])].map((h) => (
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
                    {isReadOnly ? (
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg border text-xs font-medium capitalize ${
                          STATUS_BADGE[claim.status] || STATUS_BADGE.other
                        }`}
                      >
                        {claim.status === 'other' ? (claim.customStatus || 'Other') : claim.status}
                      </span>
                    ) : (
                      <StatusCell claim={claim} />
                    )}
                  </td>
                  {!isReadOnly && (
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingClaim(claim)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors"
                          title="Edit claim"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(claim.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          title="Delete claim"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isReadOnly && (
        <div className="px-5 py-3">
          <button
            type="button"
            onClick={onAddClaim}
            className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            <Plus size={14} />
            Add Claim
          </button>
        </div>
      )}

      {!isReadOnly && editingClaim && (
        <ClaimModal
          clientId={clientId}
          agencyId={agencyId}
          claim={editingClaim}
          onClose={() => setEditingClaim(null)}
        />
      )}
    </div>
  );
};

// ─── Single client row (accordion) ───────────────────────────────────────────
const ClientRow = ({ client, agencyId, onDelete, isReadOnly }) => {
  const [open, setOpen] = useState(false);
  const [addingClaim, setAddingClaim] = useState(false);

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
        <span className="font-medium text-white flex-1">{client.name}</span>
        {!isReadOnly && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(client.id);
            }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            title="Delete client"
          >
            <Trash2 size={14} />
          </button>
        )}
      </button>

      {open && (
        <ClientClaims
          clientId={client.id}
          agencyId={agencyId}
          onAddClaim={() => setAddingClaim(true)}
          isReadOnly={isReadOnly}
        />
      )}

      {!isReadOnly && addingClaim && (
        <ClaimModal
          clientId={client.id}
          agencyId={agencyId}
          onClose={() => setAddingClaim(false)}
        />
      )}
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────
const ClaimStatus = () => {
  const { agencyId, isSuperAdmin, workspaceLoading } = useAuth();
  const [clients, setClients] = useState(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [adding, setAdding] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!agencyId) {
      if (!workspaceLoading) setClients([]);
      return;
    }
    const unsub = subscribeToClients(agencyId, setClients, () => setClients([]));
    return unsub;
  }, [agencyId, workspaceLoading]);

  const filtered = useMemo(() => {
    if (!clients) return [];
    if (!debouncedSearch.trim()) return clients;
    return clients.filter((c) => c.name.toLowerCase().includes(debouncedSearch.toLowerCase()));
  }, [clients, debouncedSearch]);

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!newClientName.trim() || !agencyId) return;
    setAdding(true);
    await createClient(agencyId, newClientName);
    setNewClientName('');
    setShowAddClient(false);
    setAdding(false);
  };

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm('Delete this client and all their claims?')) return;
    await deleteClient(clientId);
  };

  // Agencies are read-only
  const isReadOnly = !isSuperAdmin;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-blue-400 mb-1">Claim Status</p>
          <h1 className="text-3xl font-bold text-white">Clients &amp; Claims</h1>
          {isReadOnly && (
            <p className="text-xs text-slate-400 mt-2">View-only mode</p>
          )}
        </div>
        {!isReadOnly && (
          <button
            type="button"
            onClick={() => setShowAddClient((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            <UserPlus size={16} />
            New Client
          </button>
        )}
      </div>

      {/* Add client form */}
      {!isReadOnly && showAddClient && (
        <form
          onSubmit={handleAddClient}
          className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
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
            disabled={adding || !newClientName.trim()}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
          >
            {adding ? 'Adding…' : 'Add'}
          </button>
          <button
            type="button"
            onClick={() => setShowAddClient(false)}
            className="px-3 py-2 rounded-xl border border-white/10 text-slate-400 text-sm hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
        />
      </div>

      {/* Client list */}
      {clients === null ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p className="text-sm">
            {search ? 'No clients match your search.' : 'No clients yet. Add one to get started.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((client) => (
            <ClientRow
              key={client.id}
              client={client}
              agencyId={agencyId}
              onDelete={handleDeleteClient}
              isReadOnly={isReadOnly}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClaimStatus;
