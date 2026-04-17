import { motion } from 'framer-motion';
import { useSEO, SEO_PRESETS } from '../hooks/useSEO';

const TermsOfService = () => {
  // Set SEO meta tags for this page
  useSEO(SEO_PRESETS.termsOfService);
  const effectiveDate = 'April 10, 2026';

  return (
    <div className="pt-16">
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-300 mb-8">Effective date: {effectiveDate}</p>

            <div className="space-y-8 text-gray-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the MedXClaim website and services, you agree to these Terms of Service.
                  If you do not agree, please do not use our website or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">2. Service Description</h2>
                <p>
                  MedXClaim provides healthcare billing support services, including claim workflow assistance,
                  authorization coordination, and related operational support.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">3. Business Status Disclosure</h2>
                <p>
                  MedXClaim is currently operated as an independent business and may not yet be formally registered
                  as a separate legal entity. Services are provided as available and according
                  to mutually agreed project terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">4. User Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate information when contacting or engaging our services.</li>
                  <li>Use the website lawfully and not interfere with its operation.</li>
                  <li>Maintain confidentiality of any account credentials you control.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">5. Intellectual Property</h2>
                <p>
                  All website content, branding, and materials provided by MedXClaim are protected by applicable
                  intellectual property laws. You may not copy, redistribute, or create derivative works without
                  prior written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">6. Disclaimer of Warranties</h2>
                <p>
                  Services and website content are provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do not
                  guarantee uninterrupted availability, error-free operation, or specific financial outcomes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, MedXClaim will not be liable for indirect, incidental,
                  special, or consequential damages resulting from use of the website or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">8. Changes to Terms</h2>
                <p>
                  We may update these Terms of Service at any time. Updated terms become effective when posted on
                  this page with a revised effective date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">9. Contact</h2>
                <p>
                  For questions about these terms, contact: <a href="mailto:support@medxclaim.com" className="text-teal-400 hover:text-teal-300 transition-colors">support@medxclaim.com</a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
