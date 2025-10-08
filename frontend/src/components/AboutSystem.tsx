'use client';

import { motion } from 'framer-motion';
import { 
  CpuChipIcon,
  DocumentMagnifyingGlassIcon,
  ShieldCheckIcon,
  ChartBarSquareIcon,
  ClockIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

export default function AboutSystem() {
  const features = [
    {
      icon: CpuChipIcon,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze project documents with 98.5% accuracy, identifying potential issues and optimization opportunities."
    },
    {
      icon: DocumentMagnifyingGlassIcon,
      title: "Comprehensive Evaluation", 
      description: "Systematic assessment of technical feasibility, financial viability, environmental impact, and regulatory compliance for all DPR components."
    },
    {
      icon: ShieldCheckIcon,
      title: "Risk Prediction",
      description: "Predictive modeling identifies potential project risks early, enabling proactive mitigation strategies and informed decision-making."
    },
    {
      icon: ChartBarSquareIcon,
      title: "Real-time Analytics",
      description: "Dynamic dashboards provide instant insights, progress tracking, and comprehensive reporting for all stakeholders."
    },
    {
      icon: ClockIcon,
      title: "Rapid Processing",
      description: "Automated evaluation reduces assessment time from weeks to hours while maintaining rigorous quality standards."
    },
    {
      icon: UsersIcon,
      title: "Multi-stakeholder Access",
      description: "Secure, role-based access ensures appropriate information sharing across government departments and project teams."
    }
  ];

  return (
    <section className="relative">
      {/* Gradient Transition Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-800 to-gray-50"></div>
      
      {/* Content Container */}
      <div className="relative py-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            About System
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The DPR Quality Assessment and Risk Prediction System leverages cutting-edge artificial intelligence 
            to transform how development projects are evaluated and managed across Northeast India. Built specifically 
            for the Ministry of Development of North Eastern Region, this system ensures transparent, efficient, 
            and data-driven project assessment.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* System Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              System Performance
            </h3>
            <p className="text-gray-600">
              Proven results across Northeast India&apos;s development landscape
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1,200+</div>
              <div className="text-sm text-gray-600 font-medium">DPRs Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98.5%</div>
              <div className="text-sm text-gray-600 font-medium">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">75%</div>
              <div className="text-sm text-gray-600 font-medium">Risk Reduction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">8</div>
              <div className="text-sm text-gray-600 font-medium">States Covered</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-blue-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Project Assessment?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join government departments across Northeast India in leveraging AI-powered 
              project evaluation for better outcomes and efficient resource allocation.
            </p>
            <button className="bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}