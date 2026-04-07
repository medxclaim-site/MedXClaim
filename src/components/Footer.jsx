import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'Medicaid Billing', href: '/services' },
        { label: 'GAMMIS Support', href: '/services' },
        { label: 'VA Billing', href: '/services' },
        { label: 'Revenue Cycle', href: '/services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Why Choose Us', href: '/why-choose-us' },
        { label: 'Industries', href: '/industries' },
        { label: 'FAQ', href: '/faq' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'Documentation', href: '/contact' },
        { label: 'Blog', href: '/contact' },
        { label: 'Resources', href: '/contact' }
      ]
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black/20 via-black/40 to-black/60 backdrop-blur-xl border-t border-white/10">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8 mb-12">
            {/* Brand section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <Link to="/" className="inline-block mb-6">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-teal-400 bg-clip-text text-transparent">
                  MedXClaim
                </span>
              </Link>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
                Premium healthcare billing support for Medicaid, GAMMIS, Tellus, and VA workflows.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300">
                  <Phone size={18} className="text-teal-400 flex-shrink-0" />
                  <a href="tel:+10000000000" className="hover:underline">+1 (000) 000-0000</a>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300">
                  <Mail size={18} className="text-teal-400 flex-shrink-0" />
                  <a href="mailto:hello@medxclaim.com" className="hover:underline">hello@medxclaim.com</a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin size={18} className="text-teal-400 flex-shrink-0" />
                  <span>US-Based Support</span>
                </div>
              </div>
            </motion.div>

            {/* Link sections */}
            {footerSections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h4 className="text-white font-semibold text-lg mb-6">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                      >
                        {link.label}
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600/20 to-teal-500/20 border border-white/10 rounded-2xl p-8 md:p-12 mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to Improve Your Billing?</h3>
                <p className="text-gray-300">Schedule your free consultation with our team.</p>
              </div>
              <Link to="/contact" className="btn-primary whitespace-nowrap px-8">
                Schedule Call
              </Link>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8 md:pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-sm">
              <p>&copy; {currentYear} MedXClaim. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors duration-300">HIPAA Notice</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;