'use client';

import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  ChartBarIcon,
  BellAlertIcon,
  UserGroupIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  ClipboardDocumentCheckIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';

export default function Features() {
  const features = [
    {
      icon: DocumentTextIcon,
      title: "Document Analysis",
      description: "Automated parsing and evaluation of project documents, technical specifications, and compliance requirements."
    },
    {
      icon: ChartBarIcon,
      title: "Performance Metrics",
      description: "Real-time tracking of project KPIs, budget utilization, and milestone achievements."
    },
    {
      icon: BellAlertIcon,
      title: "Alert System",
      description: "Proactive notifications for potential issues, deadline warnings, and compliance violations."
    },
    {
      icon: UserGroupIcon,
      title: "Stakeholder Portal",
      description: "Centralized access for government officials, contractors, and project managers."
    },
    {
      icon: CloudArrowUpIcon,
      title: "Cloud Integration",
      description: "Secure cloud-based infrastructure with automatic backups and data synchronization."
    },
    {
      icon: LockClosedIcon,
      title: "Security Compliance",
      description: "Government-grade security protocols ensuring data protection and regulatory compliance."
    },
    {
      icon: ClipboardDocumentCheckIcon,
      title: "Quality Assurance",
      description: "Multi-layered validation process ensuring accuracy and completeness of assessments."
    },
    {
      icon: PresentationChartLineIcon,
      title: "Analytics Dashboard",
      description: "Comprehensive reporting with visual insights and predictive analytics capabilities."
    }
  ];

  return (
    <section className="relative bg-black py-20">
      {/* Content Container */}
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
            Features
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Comprehensive tools designed for efficient project management and assessment.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 hover:bg-gray-900/70"
            >
              <div className="flex flex-col items-start text-left space-y-4">
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* AI-Powered Insights */}
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-800/50 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-600/20 rounded-lg mr-4">
                <ChartBarIcon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">AI-Powered Insights</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Advanced machine learning algorithms provide intelligent recommendations and predictive analytics for better project outcomes.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                Predictive risk modeling
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                Automated quality scoring
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                Smart resource optimization
              </li>
            </ul>
          </div>

          {/* Government Integration */}
          <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-800/50 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-600/20 rounded-lg mr-4">
                <LockClosedIcon className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Government Integration</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Seamlessly integrates with existing government systems and follows all regulatory compliance requirements.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
                Single Sign-On (SSO) support
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
                Digital India compliance
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
                Multi-language support
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}