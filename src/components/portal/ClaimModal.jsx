import { useState } from 'react';
import { X } from 'lucide-react';
import { createClaim, updateClaim } from '../../services/claimService';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'denied', label: 'Denied' },
  { value: 'other', label: 'Other' },
];

const ClaimModal = ({ clientId, agencyId, claim, onClose }) => {
  const isEdit = Boolean(claim?.id);
  const [form, setForm] = useState({
    date: claim?.date || '',
    hours: claim?.hours ?? '',
    amount: claim?.amount ?? '',
    status: claim?.status || 'pending',
    customStatus: claim?.customStatus || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (field, value) => {
    setError('');
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date) return setError('Date is required.');
    if (form.hours === '' || Number(form.hours) < 0) return setError('Hours must be 0 or more.');
    if (form.amount === '' || Number(form.amount) < 0) return setError('Amount must be 0 or more.');
    if (form.status === 'other' && !form.customStatus.trim()) return setError('Please describe the status.');

    setSaving(true);
    try {
      const payload = {
        clientId,
        agencyId,
        date: form.date,
        hours: Number(form.hours),
        amount: Number(form.amount),
        status: form.status,
        customStatus: form.status === 'other' ? form.customStatus.trim() : '',
      };
      if (isEdit) {
        await updateClaim(claim.id, payload);
      } else {
        await createClaim(payload);
      }
      onClose();
    } catch {
      setError('Failed to save claim. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">{isEdit ? 'Edit Claim' : 'Add Claim'}</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Hours</label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={form.hours}
                onChange={(e) => set('hours', e.target.value)}
                placeholder="0"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Amount (USD)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={(e) => set('amount', e.target.value)}
                placeholder="0.00"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Status</label>
            <select
              value={form.status}
              onChange={(e) => set('status', e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {form.status === 'other' && (
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Custom Status</label>
              <input
                type="text"
                value={form.customStatus}
                onChange={(e) => set('customStatus', e.target.value)}
                placeholder="Describe status..."
                maxLength={100}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>
          )}

          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
            >
              {saving ? 'Saving…' : isEdit ? 'Update' : 'Add Claim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimModal;
