import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            className="text-2xl md:text-3xl font-bold hover:scale-105 transition-transform duration-300"
          >
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-teal-400 bg-clip-text text-transparent">Med</span>
            <span className="text-white">X</span>
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-teal-400 bg-clip-text text-transparent">Claim</span>
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
              href="mailto:hello@medxclaim.com" 
              className="p-2 text-gray-300 hover:text-teal-400 hover:bg-white/10 rounded-lg transition-all duration-300"
              title="Email us"
            >
              <Mail size={20} />
            </a>
            <Link to="/contact" className="btn-primary text-sm px-6 py-2 flex items-center gap-2">
              Book Call <ArrowRight size={16} />
            </Link>
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
              <Link to="/contact" className="btn-primary px-4 py-2 text-sm" onClick={() => setIsOpen(false)}>Book Consultation</Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;