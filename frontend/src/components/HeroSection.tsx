'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  DocumentTextIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function HeroSection() {
  return (
    <AuroraBackground className="h-auto min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-8 items-center justify-center px-6 pt-32 pb-0 z-10"
      >
        {/* Main Headline */}
        <div className="space-y-8 text-center max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Transforming Project Evaluation
            <span className="text-blue-300 block mt-2">Through AI Excellence</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Empowering transparent, data-driven decisions for Northeast India&apos;s development future. 
            Advanced AI ensures every project delivers maximum impact for the region.
          </p>
        </div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6"
        >
          <Link 
            href="#assessment-portal"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Begin Assessment Now
            <ArrowRightIcon className="w-5 h-5 ml-3" />
          </Link>
        </motion.div>

        {/* Key Features - Minimal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-3xl text-center"
        >
          <div className="space-y-2">
            <DocumentTextIcon className="w-8 h-8 text-blue-300 mx-auto" />
            <h3 className="text-sm font-medium text-white">Document Analysis</h3>
          </div>

          <div className="space-y-2">
            <ShieldCheckIcon className="w-8 h-8 text-blue-300 mx-auto" />
            <h3 className="text-sm font-medium text-white">Risk Assessment</h3>
          </div>

          <div className="space-y-2">
            <ChartBarIcon className="w-8 h-8 text-blue-300 mx-auto" />
            <h3 className="text-sm font-medium text-white">Performance Analytics</h3>
          </div>
        </motion.div>
      </motion.div>
    </AuroraBackground>
  );
}