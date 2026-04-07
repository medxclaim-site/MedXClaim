import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="pt-20 section">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-black/70 border-white/10"
        >
          <p className="text-teal-400 text-sm uppercase tracking-[0.3em] mb-4">Page not found</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">Oops — this page does not exist.</h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10">
            It looks like the route you tried to visit is not available. You can return to the homepage or explore our core billing services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/" className="btn-primary px-8 py-4">
              Go to Homepage
            </Link>
            <Link to="/contact" className="btn-secondary px-8 py-4">
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
