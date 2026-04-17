import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Zap, Target, Shield, FileCheck, AlertCircle, TrendingUp } from 'lucide-react';
import { useSEO, SEO_PRESETS } from '../hooks/useSEO';

const Services = () => {
  // Set SEO meta tags for this page
  useSEO(SEO_PRESETS.services);
  const services = [
    {
      icon: Target,
      title: "Medicaid Billing Support",
      description: "Complete claim lifecycle management for Medicaid providers, including preparation, submission, and reconciliation.",
      features: ["Claim validation & optimization", "Eligibility verification", "Payment tracking & reconciliation", "Appeal & denial support"],
      highlight: "Tailored to your state's Medicaid requirements"
    },
    {
      icon: Zap,
      title: "GAMMIS Workflow Support",
      description: "Expert assistance with GAMMIS system navigation, claim corrections, and provider-specific reporting requirements.",
      features: ["System navigation & training", "Claim corrections & resubmission", "Reporting compliance & monitoring", "Real-time status updates"],
      highlight: "Specialized GAMMIS expertise"
    },
    {
      icon: FileCheck,
      title: "Tellus Authorizations & Billing",
      description: "Streamlined authorization management and billing coordination for Tellus-based patient eligibility and services.",
      features: ["Authorization tracking & management", "Service coordination & documentation", "Compliance assurance", "Integration support"],
      highlight: "Seamless Tellus integration"
    },
    {
      icon: Shield,
      title: "VA Billing Assistance",
      description: "Specialized support for veteran healthcare claims, ensuring accurate documentation and timely VA reimbursement.",
      features: ["VA claim preparation & submission", "Documentation audit & compliance", "Priority status monitoring", "Veteran-specific coding expertise"],
      highlight: "Specialized VA billing support"
    },
    {
      icon: TrendingUp,
      title: "Revenue Cycle Optimization",
      description: "End-to-end revenue cycle management to maximize collections and minimize claim denials.",
      features: ["Cycle efficiency analysis", "Process optimization & automation", "Denial prevention & resolution", "Performance analytics & reporting"],
      highlight: "Data-driven optimization"
    },
    {
      icon: AlertCircle,
      title: "Documentation Review & Support",
      description: "Comprehensive documentation audit and submission assistance to ensure claim accuracy and compliance.",
      features: ["Complete document verification", "Accurate coding review", "Submission readiness assessment", "Quality assurance protocols"],
      highlight: "98% accuracy validation"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{ x: [0, -20, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-40 -right-40 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1 variants={itemVariants} className="section-title mb-8">
              Healthcare Billing Services
            </motion.h1>
            <motion.p variants={itemVariants} className="section-subtitle max-w-3xl mx-auto mb-4">
              Comprehensive support for Medicaid, GAMMIS, Tellus, and VA billing workflows that drive operational efficiency and revenue confidence.
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-400 text-lg max-w-2xl mx-auto">
              Each service is designed with deep healthcare billing expertise to reduce complexity, minimize denials, and improve your bottom line.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="card group relative"
              >
                {/* Highlight fade */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-white/10">
                    <p className="text-sm text-teal-400 font-semibold mb-4">{service.highlight}</p>
                    <a href="/contact" className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                      Get Started <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Services Stand Out */}
      <section className="section bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">Why Our Services Stand Out</h2>
            <p className="section-subtitle">Deep expertise meets premium execution</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Specialized Knowledge",
                desc: "Our team specializes exclusively in healthcare billing workflows, not generic billing services.",
              },
              {
                title: "Compliance-First",
                desc: "Every process is designed around regulatory requirements and privacy-focused practices.",
              },
              {
                title: "Scalable Support",
                desc: "From small clinics to large networks, our services scale with your organization's needs.",
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card text-center"
              >
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Comparison */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">Customizable Service Packages</h2>
            <p className="section-subtitle">Choose the level of support that fits your workflow</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Essential",
                desc: "Perfect for providers new to specialized billing support",
                items: ["Initial workflow assessment", "Claim validation & submission", "Monthly reporting", "Email support"]
              },
              {
                name: "Professional",
                desc: "Ideal for growing healthcare organizations",
                items: ["Everything in Essential", "Dedicated account manager", "Real-time claim tracking", "Denial management", "Quarterly optimization reviews"]
              },
              {
                name: "Enterprise",
                desc: "For large-scale healthcare networks",
                items: ["Everything in Professional", "Custom workflow design", "API integration available", "Priority 24/7 support", "Compliance audits"]
              }
            ].map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-gray-400 mb-6">{pkg.desc}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.items.map((item, iidx) => (
                    <li key={iidx} className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="btn-primary w-full text-center py-3">
                  Request Quote
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="card max-w-4xl mx-auto border border-white/20 bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-teal-500/10 text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-6">Need a Custom Solution?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We tailor our billing support services to your specific workflow requirements and healthcare specialization.
          </p>
          <a href="/contact" className="btn-primary px-8 py-4 text-lg">
            Schedule a Consultation
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;