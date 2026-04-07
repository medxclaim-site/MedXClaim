import { motion } from 'framer-motion';
import { CheckCircle, Clock, Target, Users, Zap, Award } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Target,
      title: "Specialized U.S. Healthcare Workflow Knowledge",
      description: "Deep expertise in Medicaid, GAMMIS, Tellus, and VA billing systems that most general billing services lack."
    },
    {
      icon: CheckCircle,
      title: "Accuracy & Detail Focus",
      description: "Every claim undergoes rigorous review and validation to minimize denials and ensure compliance."
    },
    {
      icon: Users,
      title: "Scalable Support for Agencies",
      description: "Flexible services that grow with your organization, from small clinics to large healthcare networks."
    },
    {
      icon: Clock,
      title: "Reliable Turnaround",
      description: "Structured processes ensure predictable timelines and consistent delivery of billing support."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0] }}
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
            <h1 className="section-title mb-8">Why Choose MedXClaim</h1>
            <p className="section-subtitle max-w-3xl mx-auto">
              Healthcare billing support rooted in industry knowledge, reliable execution, and a commitment to your operational success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Reasons Grid */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card group"
              >
                <reason.icon className="w-14 h-14 text-blue-400 mb-6 group-hover:text-teal-400 transition-colors duration-300" />
                <h3 className="text-2xl font-bold text-white mb-4">{reason.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Four-Step Process */}
      <section className="section bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">Our Process: Simple, Effective, Reliable</h2>
            <p className="section-subtitle">Four proven steps to billing transformation</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: "1",
                icon: Target,
                title: "Assess",
                desc: "Review your current workflows and identify improvement opportunities."
              },
              {
                num: "2",
                icon: CheckCircle,
                title: "Organize",
                desc: "Align documentation and prepare claims for accurate submission."
              },
              {
                num: "3",
                icon: Zap,
                title: "Support",
                desc: "Manage submissions, track status, and handle follow-up activities."
              },
              {
                num: "4",
                icon: Award,
                title: "Optimize",
                desc: "Refine processes for better efficiency and consistent results."
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12 }}
                className="relative"
              >
                <div className="card text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.num}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">{step.title}</h4>
                  <p className="text-gray-300">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">The MedXClaim Difference</h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-white font-bold">Feature</th>
                  <th className="text-center py-4 px-6 text-white font-bold">Generic Billing Services</th>
                  <th className="text-center py-4 px-6 text-white font-bold text-teal-400">MedXClaim</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Medicaid Specialization", generic: "Basic", medxclaim: "✓ Deep Expertise" },
                  { feature: "GAMMIS Knowledge", generic: "Limited", medxclaim: "✓ Expert Level" },
                  { feature: "VA Billing Support", generic: "Not Available", medxclaim: "✓ Specialized" },
                  { feature: "24/7 Support", generic: "No", medxclaim: "✓ Yes" },
                  { feature: "Claim Optimization", generic: "Standard", medxclaim: "✓ Advanced" },
                  { feature: "Compliance-Built", generic: "Basic", medxclaim: "✓ Security-First" }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-300">
                    <td className="py-4 px-6 text-white font-semibold">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-400">{row.generic}</td>
                    <td className="py-4 px-6 text-center text-teal-400 font-semibold">{row.medxclaim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: "98%", label: "Claim Accuracy Rate" },
              { stat: "10+", label: "Years of Billing Expertise" },
              { stat: "24h", label: "Average Response Time" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card text-center"
              >
                <p className="text-6xl font-black bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-3">
                  {item.stat}
                </p>
                <p className="text-xl text-gray-300">{item.label}</p>
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
          <h2 className="text-5xl font-bold text-white mb-6">Experience the Difference</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's discuss how MedXClaim's specialized approach can transform your billing operations and boost your bottom line.
          </p>
          <a href="/contact" className="btn-primary px-8 py-4 text-lg">
            Schedule Your Free Consultation
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default WhyChooseUs;