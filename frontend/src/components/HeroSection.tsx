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
    <AuroraBackground className="h-screen w-full">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-8 items-center justify-center px-6 h-full w-full z-10 pt-16"
      >
        {/* Main Headline */}
        <div className="space-y-6 text-center max-w-3xl">
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            DPR Assessment
            <span className="text-blue-300 block mt-2">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-xl mx-auto">
            AI-powered project evaluation for Northeast India
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
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Assessment
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>


      </motion.div>
    </AuroraBackground>
  );
}