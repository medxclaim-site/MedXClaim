import { motion } from 'framer-motion';
import { useSEO, SEO_PRESETS } from '../hooks/useSEO';

const PrivacyPolicy = () => {
  // Set SEO meta tags for this page
  useSEO(SEO_PRESETS.privacyPolicy);
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-300 mb-8">Effective date: {effectiveDate}</p>

            <div className="space-y-8 text-gray-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">1. Who We Are</h2>
                <p>
                  MedXClaim provides healthcare billing support services, including workflows related to Medicaid,
                  authorizations, and claims coordination. MedXClaim is currently operated as an independent business
                  and may not yet be registered as a separate legal entity.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">2. Information We Collect</h2>
                <p className="mb-3">We may collect the following categories of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact details, such as name, email address, and company name.</li>
                  <li>Inquiry details you submit through our contact forms.</li>
                  <li>Technical usage data, such as browser type, IP address, and page interactions.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To respond to inquiries and provide requested services.</li>
                  <li>To improve website performance, user experience, and service delivery.</li>
                  <li>To communicate important updates related to our services.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">4. Data Sharing</h2>
                <p>
                  We do not sell your personal information. We may share information with trusted service providers
                  who help us operate our website and business, subject to appropriate confidentiality obligations,
                  or when required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">5. Data Security</h2>
                <p>
                  We use reasonable technical and organizational safeguards to protect information. No method of
                  transmission or storage is fully secure, so absolute security cannot be guaranteed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">6. Data Retention</h2>
                <p>
                  We retain information only as long as needed for the purposes described in this policy,
                  to comply with legal obligations, or to resolve disputes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">7. Your Choices</h2>
                <p>
                  You may request access, correction, or deletion of your personal information by contacting us at
                  <a href="mailto:support@medxclaim.com" className="text-teal-400 hover:text-teal-300 transition-colors">support@medxclaim.com</a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">8. Policy Updates</h2>
                <p>
                  We may update this Privacy Policy from time to time. Updated versions will be posted on this page
                  with a revised effective date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">9. Contact</h2>
                <p>
                  For privacy-related questions, contact: <a href="mailto:support@medxclaim.com" className="text-teal-400 hover:text-teal-300 transition-colors">support@medxclaim.com</a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
