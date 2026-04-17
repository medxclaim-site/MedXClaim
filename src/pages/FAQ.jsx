import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useSEO, SEO_PRESETS } from '../hooks/useSEO';

const FAQ = () => {
  // Set SEO meta tags for this page
  useSEO(SEO_PRESETS.faq);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is GAMMIS and how does it affect Medicaid billing?",
      answer: "GAMMIS (Medicaid Management Information System) is a Medicaid management platform. We provide specialized support for GAMMIS claim submission, corrections, and provider-specific reporting requirements to ensure smooth Medicaid reimbursement."
    },
    {
      question: "How does Tellus integration work with billing workflows?",
      answer: "Tellus is an EVV (Electronic Visit Verification) system used for home healthcare services. We manage authorization workflows, service verification, and billing coordination to ensure compliant and timely reimbursement for Tellus-tracked services."
    },
    {
      question: "What makes VA billing different from other healthcare billing?",
      answer: "VA billing involves specific documentation requirements, priority processing for veteran care, and unique reimbursement structures. Our team specializes in VA claim preparation, documentation audit, and status monitoring to ensure veterans receive timely care funding."
    },
    {
      question: "How do you ensure secure and compliant billing operations?",
      answer: "We follow secure data handling, encrypted communications, strict access controls, and regular compliance reviews. All billing operations align with healthcare privacy requirements and industry best practices."
    },
    {
      question: "What is the typical onboarding process for new clients?",
      answer: "Onboarding involves workflow assessment, documentation review, system access setup, and training. We typically complete setup within 1-2 weeks, depending on your organization's complexity and current billing volume."
    },
    {
      question: "How do you handle claim denials and appeals?",
      answer: "We proactively review claims before submission to prevent denials, but when they occur, we manage the appeals process with detailed documentation, timely resubmission, and follow-up tracking until resolution."
    },
    {
      question: "What communication methods do you use for client updates?",
      answer: "We provide regular status updates via email, secure client portals, and scheduled calls. Response time for urgent matters is typically within 24 hours during business days."
    },
    {
      question: "Can you scale support as our organization grows?",
      answer: "Yes, our services are designed to scale with your needs. We can adjust support levels based on claim volume, add specialized services, and accommodate organizational growth."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-16">
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-300">
              Common questions about our healthcare billing support services and processes.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-teal-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-teal-400 flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-16 card"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-gray-300 text-lg mb-6">
              Our billing experts are here to help. Contact us for personalized answers to your specific needs.
            </p>
            <a href="/contact" className="btn-primary">Get in Touch</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;