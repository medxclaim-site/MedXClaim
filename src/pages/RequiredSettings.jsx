import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cog, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updateWorkspaceSettings } from '../services/workspaceService';

const RequiredSettings = () => {
  const { user, workspace } = useAuth();
  const [formState, setFormState] = useState({
    displayName: '',
    phone: '',
    jobTitle: '',
    organizationName: '',
    organizationType: 'billing-agency',
    teamSize: '1-10',
    defaultClaimType: 'medicaid',
    autoFollowUps: true,
    timezone: 'America/New_York',
    emailAlerts: true,
    slaAlerts: true,
    dailyDigest: false,
  });
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!workspace) {
      return;
    }

    setFormState({
      displayName: workspace.profile?.displayName || '',
      phone: workspace.profile?.phone || '',
      jobTitle: workspace.profile?.jobTitle || '',
      organizationName: workspace.organization?.name || '',
      organizationType: workspace.organization?.type || 'billing-agency',
      teamSize: workspace.organization?.teamSize || '1-10',
      defaultClaimType: workspace.billingPreferences?.defaultClaimType || 'medicaid',
      autoFollowUps: Boolean(workspace.billingPreferences?.autoFollowUps),
      timezone: workspace.billingPreferences?.timezone || 'America/New_York',
      emailAlerts: Boolean(workspace.notifications?.emailAlerts),
      slaAlerts: Boolean(workspace.notifications?.slaAlerts),
      dailyDigest: Boolean(workspace.notifications?.dailyDigest),
    });
  }, [workspace]);

  const handleFieldChange = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setSaveMessage('');
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!user) {
      return;
    }

    setSaving(true);
    setSaveMessage('');

    try {
      await updateWorkspaceSettings(user.uid, {
        profile: {
          displayName: formState.displayName,
          email: user.email || '',
          phone: formState.phone,
          jobTitle: formState.jobTitle,
        },
        organization: {
          name: formState.organizationName,
          type: formState.organizationType,
          teamSize: formState.teamSize,
        },
        billingPreferences: {
          defaultClaimType: formState.defaultClaimType,
          autoFollowUps: formState.autoFollowUps,
          timezone: formState.timezone,
        },
        notifications: {
          emailAlerts: formState.emailAlerts,
          slaAlerts: formState.slaAlerts,
          dailyDigest: formState.dailyDigest,
        },
      });

      setSaveMessage('Settings saved successfully.');
    } catch (error) {
      setSaveMessage('Unable to save settings right now.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center mb-6">
            <Cog className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Required Settings</h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Complete your profile, organization setup, billing preferences, and notifications. These values are stored in Firebase Firestore.
          </p>

          <form onSubmit={handleSave} className="space-y-8">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Profile Setup</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-200 mb-2 block">Display Name</span>
                  <input
                    value={formState.displayName}
                    onChange={(e) => handleFieldChange('displayName', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-200 mb-2 block">Job Title</span>
                  <input
                    value={formState.jobTitle}
                    onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                    required
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-sm text-gray-200 mb-2 block">Phone</span>
                  <input
                    value={formState.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Organization Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-200 mb-2 block">Organization Name</span>
                  <input
                    value={formState.organizationName}
                    onChange={(e) => handleFieldChange('organizationName', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-200 mb-2 block">Organization Type</span>
                  <select
                    value={formState.organizationType}
                    onChange={(e) => handleFieldChange('organizationType', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                  >
                    <option value="billing-agency">Billing Agency</option>
                    <option value="provider-group">Provider Group</option>
                    <option value="hospital-system">Hospital System</option>
                  </select>
                </label>
                <label className="block md:col-span-2">
                  <span className="text-sm text-gray-200 mb-2 block">Team Size</span>
                  <select
                    value={formState.teamSize}
                    onChange={(e) => handleFieldChange('teamSize', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                  >
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="200+">200+</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Billing Preferences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-200 mb-2 block">Default Claim Type</span>
                  <select
                    value={formState.defaultClaimType}
                    onChange={(e) => handleFieldChange('defaultClaimType', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                  >
                    <option value="medicaid">Medicaid</option>
                    <option value="va">VA</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-gray-200 mb-2 block">Timezone</span>
                  <select
                    value={formState.timezone}
                    onChange={(e) => handleFieldChange('timezone', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white"
                  >
                    <option value="America/New_York">America/New_York</option>
                    <option value="America/Chicago">America/Chicago</option>
                    <option value="America/Denver">America/Denver</option>
                    <option value="America/Los_Angeles">America/Los_Angeles</option>
                  </select>
                </label>
                <label className="inline-flex items-center gap-3 text-gray-200 md:col-span-2">
                  <input
                    type="checkbox"
                    checked={formState.autoFollowUps}
                    onChange={(e) => handleFieldChange('autoFollowUps', e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-900"
                  />
                  Enable automated claim follow-ups
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Notification Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="inline-flex items-center gap-3 text-gray-200">
                  <input
                    type="checkbox"
                    checked={formState.emailAlerts}
                    onChange={(e) => handleFieldChange('emailAlerts', e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-900"
                  />
                  Email alerts
                </label>
                <label className="inline-flex items-center gap-3 text-gray-200">
                  <input
                    type="checkbox"
                    checked={formState.slaAlerts}
                    onChange={(e) => handleFieldChange('slaAlerts', e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-900"
                  />
                  SLA breach alerts
                </label>
                <label className="inline-flex items-center gap-3 text-gray-200 md:col-span-2">
                  <input
                    type="checkbox"
                    checked={formState.dailyDigest}
                    onChange={(e) => handleFieldChange('dailyDigest', e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-900"
                  />
                  Daily digest summary
                </label>
              </div>
            </section>

            <div className="flex flex-wrap gap-4 items-center">
              <button type="submit" className="btn-primary px-6 py-2.5 flex items-center gap-2" disabled={saving}>
                <Save size={16} />
                {saving ? 'Saving...' : 'Save required settings'}
              </button>
              <Link to="/portal" className="btn-secondary px-6 py-2.5">
                Back to Portal
              </Link>
              {saveMessage ? <p className="text-sm text-teal-200">{saveMessage}</p> : null}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RequiredSettings;
