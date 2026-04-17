import { useEffect, useMemo, useState, memo } from 'react';
import { AlertCircle, CheckCircle2, Clock, FileText, TrendingDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { subscribeToClaimsByAgency } from '../../services/claimService';
import { SkeletonCard } from '../../components/portal/Skeleton';

const sevenDaysAgo = () => {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString().slice(0, 10);
};

const STATUS_BADGE = {
  completed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  denied: 'bg-red-500/15 text-red-300 border-red-500/25',
  pending: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  other: 'bg-slate-500/15 text-slate-300 border-slate-500/25',
};

const StatCard = memo(({ label, value, Icon, accent, loading }) => {
  if (loading) return <SkeletonCard />;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{label}</p>
        <div className={`p-2 rounded-xl ${accent}`}>
          <Icon size={18} className="opacity-80" />
        </div>
      </div>
      <p className="text-4xl font-bold text-white tabular-nums">{value}</p>
    </div>
  );
});

StatCard.displayName = 'StatCard';

const ClaimRow = memo(({ claim }) => (
  <tr className="hover:bg-white/5 transition-colors">
    <td className="px-5 py-3 text-slate-300">{claim.date || '—'}</td>
    <td className="px-5 py-3 text-slate-300">{claim.hours}</td>
    <td className="px-5 py-3 text-slate-300">
      ${Number(claim.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
    </td>
    <td className="px-5 py-3">
      <span
        className={`inline-block px-2.5 py-1 rounded-lg border text-xs font-medium capitalize ${
          STATUS_BADGE[claim.status] || STATUS_BADGE.other
        }`}
      >
        {claim.status === 'other' ? (claim.customStatus || 'Other') : claim.status}
      </span>
    </td>
  </tr>
));

ClaimRow.displayName = 'ClaimRow';

const AgencyDashboard = () => {
  const { user, workspace, agencyId, workspaceLoading } = useAuth();
  const [claims, setClaims] = useState([]);
  const [claimsLoading, setClaimsLoading] = useState(true);

  const displayName = useMemo(
    () => workspace?.profile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'Team',
    [workspace?.profile?.displayName, user?.displayName, user?.email]
  );

  const pendingAuths = useMemo(
    () => workspace?.dashboard?.kpis?.pendingAuthorizations ?? 0,
    [workspace?.dashboard?.kpis?.pendingAuthorizations]
  );

  useEffect(() => {
    if (!agencyId) {
      if (!workspaceLoading) setClaimsLoading(false);
      return;
    }

    setClaimsLoading(true);
    const unsub = subscribeToClaimsByAgency(
      agencyId,
      (data) => {
        setClaims(data);
        setClaimsLoading(false);
      },
      () => setClaimsLoading(false),
    );
    return unsub;
  }, [agencyId, workspaceLoading]);

  const stats = useMemo(() => {
    const week = sevenDaysAgo();
    return {
      billed: claims.length,
      open: claims.filter((c) => c.status === 'pending').length,
      denials: claims.filter((c) => c.status === 'denied' && (c.date || '') >= week).length,
    };
  }, [claims]);

  const recentClaims = useMemo(() => claims.slice(0, 10), [claims]);

  const loading = workspaceLoading || claimsLoading;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-widest text-blue-400 mb-1">Dashboard</p>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {workspaceLoading ? '…' : displayName}
        </h1>
        <p className="text-slate-400 text-sm mt-1">{user?.email}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Billed Claims"
          value={stats.billed}
          Icon={FileText}
          accent="bg-blue-500/10 text-blue-400"
          loading={loading}
        />
        <StatCard
          label="Open Claims"
          value={stats.open}
          Icon={Clock}
          accent="bg-amber-500/10 text-amber-400"
          loading={loading}
        />
        <StatCard
          label="Pending Authorizations"
          value={pendingAuths}
          Icon={AlertCircle}
          accent="bg-purple-500/10 text-purple-400"
          loading={workspaceLoading}
        />
        <StatCard
          label="Denials This Week"
          value={stats.denials}
          Icon={TrendingDown}
          accent="bg-red-500/10 text-red-400"
          loading={loading}
        />
      </div>

      {/* Recent claims table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-semibold text-white">Recent Claims</h2>
          {!claimsLoading && (
            <span className="text-xs text-slate-500">{claims.length} total</span>
          )}
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-white/10 rounded animate-pulse" />
            ))}
          </div>
        ) : recentClaims.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-slate-500">
            <CheckCircle2 size={32} className="opacity-40" />
            <p className="text-sm">No claims yet. Go to Claim Status to add claims.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {['Date', 'Hours', 'Amount', 'Status'].map((h) => (
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
                {recentClaims.map((claim) => (
                  <ClaimRow key={claim.id} claim={claim} statusBadge={STATUS_BADGE} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgencyDashboard;
