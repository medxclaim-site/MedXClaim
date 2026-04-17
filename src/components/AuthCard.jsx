import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AuthCard = ({ title, subtitle, children, footer }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="relative rounded-2xl border border-white/15 bg-slate-900/60 backdrop-blur-xl p-8 shadow-2xl shadow-blue-950/30">
          <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/10" />
          <div className="relative z-10">
            <Link
              to="/"
              className="inline-block mb-6 text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-teal-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              <span>Med</span>
              <span className="text-white">X</span>
              <span>Claim</span>
            </Link>
            <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
            <p className="text-gray-300 mt-2 mb-6">{subtitle}</p>
            {children}
            {footer ? <div className="mt-6 text-sm text-gray-300">{footer}</div> : null}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthCard;
