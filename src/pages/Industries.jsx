import { motion } from 'framer-motion';
import { Building, Heart, Users, Stethoscope } from 'lucide-react';

const Industries = () => {
  const industries = [
    {
      icon: Building,
      title: "Home Healthcare Agencies",
      description: "Specialized billing support for home care providers managing Medicaid and VA patient services.",
      services: ["Medicaid claim processing", "Authorization management", "Documentation compliance", "Revenue cycle support"]
    },
    {
      icon: Heart,
      title: "Medicaid Providers",
      description: "Comprehensive billing assistance for organizations serving Medicaid-eligible patients.",
      services: ["GAMMIS workflow support", "Eligibility verification", "Claim submission", "Denial management"]
    },
    {
      icon: Users,
      title: "Veterans Service Providers",
      description: "Dedicated VA billing expertise for organizations supporting veteran healthcare needs.",
      services: ["VA claim preparation", "Documentation audit", "Priority processing", "Status monitoring"]
    },
    {
      icon: Stethoscope,
      title: "Behavioral Health Providers",
      description: "Specialized support for mental health and behavioral health billing requirements.",
      services: ["Authorization tracking", "Service documentation", "Compliance assurance", "Reimbursement optimization"]
    }
  ];

  return (
    <div className="pt-16">
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6">Industries We Serve</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tailored healthcare billing support for U.S. providers and agencies across specialized service areas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="card"
              >
                <industry.icon className="w-16 h-16 text-teal-400 mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">{industry.title}</h3>
                <p className="text-gray-300 mb-6">{industry.description}</p>
                <h4 className="text-white font-semibold mb-3">Key Services:</h4>
                <ul className="space-y-2">
                  {industry.services.map((service, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 flex-shrink-0"></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-16 card max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Industry?</h2>
            <p className="text-gray-300 text-lg mb-6">
              We provide customized billing support for various healthcare service providers. Contact us to discuss your specific needs.
            </p>
            <a href="/contact" className="btn-primary">Discuss Your Requirements</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Industries;