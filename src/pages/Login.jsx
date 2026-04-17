import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { AlertCircle } from 'lucide-react';
import AuthCard from '../components/AuthCard';
import { auth, googleProvider } from '../firebase';

const getErrorMessage = (error) => {
  const code = error?.code || '';

  if (code.includes('auth/invalid-credential') || code.includes('auth/wrong-password')) {
    return 'Incorrect email or password. Please try again.';
  }
  if (code.includes('auth/user-not-found')) {
    return 'No account found for this email.';
  }
  if (code.includes('auth/popup-closed-by-user')) {
    return 'Google sign-in was closed before completion.';
  }
  if (code.includes('auth/network-request-failed')) {
    return 'Network issue detected. Please check your connection.';
  }

  return 'Unable to sign in right now. Please try again.';
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || '/portal';

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    setError('');
    setEmailLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to access your MedXClaim portal."
      footer={
        <>
          New here?{' '}
          <Link to="/register" className="text-teal-300 hover:text-teal-200 font-medium">
            Create an account
          </Link>
        </>
      }
    >
      <button
        type="button"
        onClick={handleGoogleLogin}
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

      <form onSubmit={handleEmailLogin} className="space-y-4">
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
            placeholder="Enter your password"
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
          {emailLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AuthCard>
  );
};

export default Login;
