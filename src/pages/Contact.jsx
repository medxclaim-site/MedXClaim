import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { useSEO, SEO_PRESETS } from '../hooks/useSEO';
import { submitContactForm, sendContactAutoReply } from '../services/contactService';
import { sanitizeInput, validateEmail } from '../utils/validation';

const Contact = () => {
  // Set SEO meta tags for this page
  useSEO(SEO_PRESETS.contact);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setSubmitError('');
    setSubmitMessage('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email).toLowerCase(),
      company: sanitizeInput(formData.company),
      message: sanitizeInput(formData.message),
      source: 'website-contact-form',
    };

    if (!validateEmail(payload.email)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');

    try {
      await submitContactForm(payload);
      // Fire-and-forget auto-reply; do not block success on email delivery
      sendContactAutoReply({ name: payload.name, email: payload.email }).catch(() => {});
      setSubmitMessage('Thank you. Your message has been received. Check your inbox for a confirmation email.');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      setSubmitError('Unable to submit right now. Please email support@medxclaim.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6">Contact MedXClaim</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to optimize your healthcare billing operations? Let&apos;s discuss how we can support your Medicaid, VA, and authorization workflows.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h2 className="text-3xl font-semibold text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-white font-medium mb-2">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="Your organization"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                    placeholder="Tell us about your billing needs and how we can help..."
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitMessage ? <p className="text-sm text-emerald-300">{submitMessage}</p> : null}
                {submitError ? <p className="text-sm text-red-300">{submitError}</p> : null}
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="card">
                <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-teal-400 mr-4" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <a href="mailto:support@medxclaim.com" className="text-gray-300 hover:text-teal-400 transition-colors">support@medxclaim.com</a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-teal-400 mr-4" />
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <p className="text-gray-300">+1 (000) 000-0000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-2xl font-semibold text-white mb-4">Why Contact Us?</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    Free initial consultation and workflow assessment
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    Customized billing support solutions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    Secure communication and privacy-focused data handling
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    Dedicated account management and support
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;