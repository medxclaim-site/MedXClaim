import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowRight, ChevronDown, Settings, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuth();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  const profileInitial = user?.displayName?.[0] || user?.email?.[0] || null;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50' 
          : 'bg-black/20 backdrop-blur-lg border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-teal-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          >
            <span>Med</span>
            <span className="text-white">X</span>
            <span>Claim</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">Home</Link>
            <Link to="/services" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">Services</Link>
            <Link to="/about" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">About</Link>
            <Link to="/why-choose-us" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">Why Us</Link>
            <Link to="/industries" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">Industries</Link>
            <Link to="/faq" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">FAQ</Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <a 
              href="tel:+10000000000" 
              className="p-2 text-gray-300 hover:text-teal-400 hover:bg-white/10 rounded-lg transition-all duration-300"
              title="Call us"
            >
              <Phone size={20} />
            </a>
            <a 
              href="mailto:support@medxclaim.com" 
              className="p-2 text-gray-300 hover:text-teal-400 hover:bg-white/10 rounded-lg transition-all duration-300"
              title="Email us"
            >
              <Mail size={20} />
            </a>
            <Link to="/contact" className="btn-primary text-sm px-6 py-2 flex items-center gap-2">
              Book Call <ArrowRight size={16} />
            </Link>
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((open) => !open)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 pl-2 pr-3 py-2 text-white hover:bg-white/10 transition-all duration-300"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-sm font-bold shadow-lg shadow-blue-950/40">
                  {profileInitial ? profileInitial.toUpperCase() : <User size={16} />}
                </span>
                <ChevronDown size={16} className={`text-gray-300 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen ? (
                <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/40">
                  <div className="border-b border-white/10 px-4 py-3">
                    <p className="text-sm font-medium text-white">{user ? (user.displayName || 'My account') : 'Welcome'}</p>
                    <p className="text-xs text-gray-400">{user ? (user.email || 'Signed in') : 'Access your MedXClaim account'}</p>
                  </div>
                  <div className="p-2">
                    {user ? (
                      <>
                        <Link
                          to="/portal"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors duration-200"
                        >
                          <User size={16} />
                          Portal
                        </Link>
                        <Link
                          to="/portal/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors duration-200"
                        >
                          <Settings size={16} />
                          Required settings
                        </Link>
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-200 hover:bg-red-500/10 hover:text-red-100 transition-colors duration-200"
                        >
                          <X size={16} />
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/register"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors duration-200"
                        >
                          <User size={16} />
                          Register
                        </Link>
                        <Link
                          to="/login"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors duration-200"
                        >
                          <ArrowRight size={16} />
                          Sign in
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/60 backdrop-blur-xl rounded-xl mt-2 p-4 border border-white/10"
          >
            <div className="flex flex-col space-y-2">
              <Link to="/" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/services" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300" onClick={() => setIsOpen(false)}>Services</Link>
              <Link to="/about" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300" onClick={() => setIsOpen(false)}>About</Link>
              <Link to="/why-choose-us" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300" onClick={() => setIsOpen(false)}>Why Us</Link>
              <Link to="/industries" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300" onClick={() => setIsOpen(false)}>Industries</Link>
              <Link to="/faq" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300" onClick={() => setIsOpen(false)}>FAQ</Link>
              {user ? (
                <>
                  <Link to="/portal" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300" onClick={() => setIsOpen(false)}>Portal</Link>
                  <Link to="/portal/settings" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300" onClick={() => setIsOpen(false)}>Required settings</Link>
                  <button type="button" className="btn-secondary px-4 py-2 text-sm" onClick={handleSignOut}>Sign out</button>
                </>
              ) : (
                <>
                  <Link to="/register" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300" onClick={() => setIsOpen(false)}>Register</Link>
                  <Link to="/login" className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300" onClick={() => setIsOpen(false)}>Sign in</Link>
                  <Link to="/contact" className="btn-primary px-4 py-2 text-sm" onClick={() => setIsOpen(false)}>Book Consultation</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;