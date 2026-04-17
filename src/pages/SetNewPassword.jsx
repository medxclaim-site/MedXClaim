import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from 'firebase/auth';
import { AlertCircle, LockKeyhole, Save } from 'lucide-react';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { updateWorkspaceSettings } from '../services/workspaceService';

const SetNewPassword = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!auth.currentUser || !user) {
      setError('Session expired. Please sign in again.');
      return;
    }

    setSaving(true);

    try {
      await updatePassword(auth.currentUser, password);
      await updateWorkspaceSettings(user.uid, {
        'auth.mustResetPassword': false,
        'auth.passwordLastUpdatedAt': new Date().toISOString(),
        'auth.tempPasswordIssuedAt': null,
      });
      navigate('/portal', { replace: true });
    } catch (submitError) {
      setError('Unable to update password right now. Please sign in again and retry.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-xl mx-auto card">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center mb-6">
          <LockKeyhole className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Set your new password</h1>
        <p className="text-gray-300 mb-8">
          Your account was created by your super admin. For security, set a new password before accessing the portal.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="new-password" className="block text-sm text-gray-200 mb-2">New password</label>
            <input
              id="new-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
              placeholder="Enter a strong password"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm text-gray-200 mb-2">Confirm new password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
              placeholder="Repeat your new password"
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200 flex gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={saving}
            className="btn-primary px-6 py-3 inline-flex items-center justify-center gap-2 w-full"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save new password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
