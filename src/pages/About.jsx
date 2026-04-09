import { motion } from 'framer-motion';
import { Target, Shield, Users, Award, Zap, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="section-title mb-8">About MedXClaim</h1>
            <p className="section-subtitle max-w-3xl mx-auto">
              Your specialized partner for healthcare billing operations. We remove administrative burden so you can focus on patient care and operational excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                To provide healthcare providers and agencies with reliable, compliant billing support that maximizes reimbursement and minimizes administrative overhead.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We specialize in the complex workflows of Medicaid, GAMMIS, Tellus, and VA billing systems, ensuring your operations run smoothly, efficiently, and profitably.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                To be the trusted back-office partner for U.S. healthcare providers, enabling them to deliver exceptional patient care without billing complexities.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Through specialized knowledge and scalable support, we help healthcare organizations achieve operational excellence and financial stability.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Specialization Matters */}
      <section className="section bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">Why Specialization Matters</h2>
            <p className="section-subtitle">Healthcare billing is complex. Specialized knowledge creates better outcomes.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: "Workflow Expertise", desc: "Deep understanding of Medicaid, GAMMIS, Tellus, and VA billing systems." },
              { icon: Shield, title: "Compliance Focus", desc: "Regulatory-compliant operations that protect your organization." },
              { icon: Users, title: "Provider Partnership", desc: "Collaborative approach that integrates with your existing workflows." },
              { icon: Award, title: "Proven Results", desc: "Track record of improved reimbursement and reduced claim denials." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="card text-center"
              >
                <item.icon className="w-12 h-12 text-teal-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">Our Core Values</h2>
            <p className="section-subtitle">Guiding principles that shape everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Operational Excellence",
                desc: "We execute with precision and attention to detail. Every claim matters."
              },
              {
                icon: Shield,
                title: "Compliance & Security",
                desc: "HIPAA compliance, secure operations, and regulatory adherence are non-negotiable."
              },
              {
                icon: Heart,
                title: "Provider Success",
                desc: "Your success is our success. We're invested in your financial and operational outcomes."
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card"
              >
                <value.icon className="w-14 h-14 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="card max-w-4xl mx-auto border border-white/20 bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-teal-500/10 text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Partner with MedXClaim?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let&apos;s discuss how our specialized billing support can transform your healthcare operations.
          </p>
          <a href="/contact" className="btn-primary px-8 py-4 text-lg">
            Schedule a Consultation
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default About;