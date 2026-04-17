import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { AlertCircle } from 'lucide-react';
import AuthCard from '../components/AuthCard';
import { auth, googleProvider } from '../firebase';

const getErrorMessage = (error) => {
  const code = error?.code || '';

  if (code.includes('auth/email-already-in-use')) {
    return 'This email is already in use. Try logging in instead.';
  }
  if (code.includes('auth/weak-password')) {
    return 'Password should be at least 6 characters long.';
  }
  if (code.includes('auth/invalid-email')) {
    return 'Please enter a valid email address.';
  }

  return 'Unable to create account right now. Please try again.';
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setEmailLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (name.trim()) {
        await updateProfile(credential.user, { displayName: name.trim() });
      }
      navigate('/portal', { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/portal', { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create account"
      subtitle="Set up your MedXClaim workspace in under a minute."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-teal-300 hover:text-teal-200 font-medium">
            Sign in
          </Link>
        </>
      }
    >
      <button
        type="button"
        onClick={handleGoogleRegister}
        disabled={googleLoading || emailLoading}
        className="w-full inline-flex justify-center items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white font-medium hover:bg-white/10 transition-colors disabled:opacity-60"
      >
        {googleLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
        Continue with Google
      </button>

      <div className="my-6 flex items-center gap-3 text-gray-400">
        <div className="h-px bg-white/10 flex-1" />
        <span className="text-xs tracking-[0.2em]">OR</span>
        <div className="h-px bg-white/10 flex-1" />
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm text-gray-200 mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-gray-200 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-gray-200 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
            placeholder="Create password"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm text-gray-200 mb-2">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
            placeholder="Repeat password"
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
          disabled={emailLoading || googleLoading}
          className="w-full btn-primary py-3"
        >
          {emailLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </AuthCard>
  );
};

export default Register;
