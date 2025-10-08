'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'About System', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Guidelines', href: '#guidelines' },
    { name: 'Portal', href: '#portal' },
    { name: 'Support', href: '#support' }
  ];

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' }
  ];

  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  return (
    <header className="w-full bg-white shadow-lg">
      {/* Top Government Bar */}
      <div className="bg-blue-900 text-white">
        <div className="w-full px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-900 text-xs font-bold">🇮🇳</span>
                </div>
                <span className="text-sm font-medium">Government of India</span>
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors"
              >
                <span className="text-xs font-medium">{currentLanguage.nativeName}</span>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-50 border">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setCurrentLanguage(language);
                        setIsLanguageMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 first:rounded-t-md last:rounded-b-md"
                    >
                      {language.nativeName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Title Section */}
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <Image
                  src="/mdoner-logo.svg"
                  alt="Ministry of Development of North Eastern Region"
                  width={200}
                  height={60}
                  className="h-15 w-auto object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  AI-Powered DPR Assessment System
                </h1>
                <p className="text-xs text-gray-600">
                  Quality Assessment & Risk Prediction Portal
                </p>
              </div>
            </div>

            {/* Right Side Navigation and CTA */}
            <div className="hidden md:flex items-center space-x-8 ml-auto">
              {/* Desktop Navigation */}
              <nav className="flex items-center space-x-6">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-900 font-medium text-sm transition-colors duration-200 relative group px-2 py-1"
                  >
                    {item.name}
                    <span className="absolute left-0 right-0 bottom-[-4px] h-0.5 bg-blue-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                  </a>
                ))}
              </nav>

              {/* CTA Button */}
              <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Access Portal
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-900 p-2"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-3 space-y-3">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-blue-900 font-medium text-sm py-2 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className="w-full bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 mt-4">
                Access Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;