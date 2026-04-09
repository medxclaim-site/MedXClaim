import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TrendingUp, Users, Clock, CheckCircle, ArrowRight, Zap, Shield, Target } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span className="font-bold text-transparent bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text">{count.toLocaleString()}+</span>;
};

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section relative overflow-hidden">
        {/* Enhanced background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl"
          ></motion.div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-teal-900/10"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-6 flex justify-center">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-400/30 rounded-full">
                <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text">
                  ✨ Premium Healthcare Billing Solutions
                </span>
              </div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
              Healthcare Billing Support
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-teal-400 bg-clip-text text-transparent">
                Built for Trust
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Specialized Medicaid, GAMMIS, Tellus, and VA billing workflows designed to improve reimbursement confidence, reduce denials, and streamline operations for healthcare providers.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="/contact" className="btn-primary px-8 py-4 text-lg flex items-center justify-center gap-2">
                Schedule Free Consultation <ArrowRight size={20} />
              </a>
              <a href="/services" className="btn-secondary px-8 py-4 text-lg flex items-center justify-center gap-2">
                Explore Services <ArrowRight size={20} />
              </a>
            </motion.div>

            {/* Trust metrics */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/10"
            >
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={98} />
                </p>
                <p className="text-gray-400 text-sm md:text-base">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                  24<span className="text-gray-400">h</span>
                </p>
                <p className="text-gray-400 text-sm md:text-base">Response Time</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">100<span className="text-gray-400">%</span></p>
                <p className="text-gray-400 text-sm md:text-base">Compliance-Focused</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Healthcare Providers Choose Us */}
      <section className="section bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h2 className="section-title mb-6">Why Healthcare Providers Choose Us</h2>
            <p className="section-subtitle">Proven expertise across Medicaid, GAMMIS, Tellus, and VA billing operations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: "98% Accuracy Rate", desc: "Precise documentation and claim validation" },
              { icon: Users, title: "Growing Provider Network", desc: "Partnering with healthcare agencies nationwide" },
              { icon: Clock, title: "24h Response", desc: "Rapid support for urgent billing needs" },
              { icon: Shield, title: "Built for Security", desc: "Designed with compliance and data protection in mind" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="card text-center"
              >
                <stat.icon className="w-14 h-14 text-teal-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">{stat.title}</h3>
                <p className="text-gray-400">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Billing Services */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h2 className="section-title mb-6">Core Billing Services</h2>
            <p className="section-subtitle">Comprehensive support for your most complex healthcare workflows</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Medicaid Billing Support",
                desc: "End-to-end claim preparation, submission, and reconciliation for Medicaid providers.",
                features: ["Claim validation", "Eligibility verification", "Payment tracking", "Appeal support"]
              },
              {
                icon: Target,
                title: "GAMMIS Workflow Support",
                desc: "Specialized assistance with GAMMIS claim validation, corrections, and reporting.",
                features: ["System navigation", "Claim corrections", "Reporting compliance", "Status updates"]
              },
              {
                icon: CheckCircle,
                title: "VA Billing Assistance",
                desc: "Dedicated support for veteran healthcare claims and VA documentation requirements.",
                features: ["VA claim preparation", "Documentation audit", "Priority processing", "Status monitoring"]
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12 }}
                whileHover={{ scale: 1.02, y: -10 }}
                className="card group"
              >
                <service.icon className="w-16 h-16 text-blue-400 mb-6 group-hover:text-teal-400 transition-colors duration-300" />
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-8">{service.desc}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="/services" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                  Learn More <ArrowRight size={16} />
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-16"
          >
            <a href="/services" className="btn-primary px-8 py-4 text-lg">
              View All Services
            </a>
          </motion.div>
        </div>
      </section>

      {/* How We Support Providers */}
      <section className="section bg-gradient-to-br from-blue-900/10 via-transparent to-teal-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h2 className="section-title mb-6">How We Support Providers</h2>
            <p className="section-subtitle">A simple, proven process for stronger billing outcomes</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { num: "1", title: "Assess Workflow", desc: "Review existing claims, authorizations, and documentation" },
              { num: "2", title: "Organize Documentation", desc: "Align details for accurate submission" },
              { num: "3", title: "Manage Submissions", desc: "Submit claims and track status through resolution" },
              { num: "4", title: "Optimize Processes", desc: "Improve efficiency and reduce denials" }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="card text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                    {step.num}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:flex absolute top-1/3 -right-3 w-6 h-6 items-center justify-center text-teal-400">
                    <ArrowRight size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="card max-w-4xl mx-auto border border-white/20 bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-teal-500/10"
        >
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Ready to Optimize Your Billing?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join healthcare providers who have transformed their billing operations with MedXClaim&apos;s specialized support.
            </p>
            <a href="/contact" className="btn-primary px-8 py-4 text-lg flex items-center justify-center gap-2 mx-auto w-fit">
              Schedule Your Free Consultation <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;