'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, User } from '@/lib/auth';

const PortalContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!auth.isAuthenticated()) {
      router.push('/login');
      return;
    }

    const userData = auth.getUser();
    setUser(userData);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    auth.logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome to DPR Assessment Portal
              </h1>
              <div className="text-blue-300">
                <p className="text-lg">{user.name}</p>
                <p className="text-sm opacity-80">{user.department}</p>
                <p className="text-xs opacity-60">{user.email}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                user.role === 'mdoner' 
                  ? 'bg-green-900/50 text-green-300 border border-green-500/30' 
                  : 'bg-blue-900/50 text-blue-300 border border-blue-500/30'
              }`}>
                {user.role === 'mdoner' ? '🏛️ MDoNER Admin' : '👤 Client User'}
              </div>
              <button
                onClick={handleLogout}
                className="block bg-red-600/20 hover:bg-red-600/30 text-red-300 px-4 py-2 rounded-lg text-sm transition-colors border border-red-500/30"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Role-specific Content */}
        {user.role === 'mdoner' ? (
          <MDoNERDashboard />
        ) : (
          <ClientDashboard />
        )}
      </div>
    </div>
  );
};

const MDoNERDashboard: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mr-4">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Review Submissions</h3>
            <p className="text-gray-400 text-sm">Assess DPR documents</p>
          </div>
        </div>
        <div className="text-green-300 text-2xl font-bold">12</div>
        <p className="text-gray-400 text-sm">Pending reviews</p>
      </div>

      <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
            <span className="text-2xl">🔍</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Risk Analysis</h3>
            <p className="text-gray-400 text-sm">AI-powered insights</p>
          </div>
        </div>
        <div className="text-blue-300 text-2xl font-bold">8</div>
        <p className="text-gray-400 text-sm">High-risk projects</p>
      </div>

      <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mr-4">
            <span className="text-2xl">📈</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Reports</h3>
            <p className="text-gray-400 text-sm">Generate analytics</p>
          </div>
        </div>
        <div className="text-purple-300 text-2xl font-bold">24</div>
        <p className="text-gray-400 text-sm">Reports generated</p>
      </div>

      <div className="md:col-span-2 lg:col-span-3 bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">📋 MDoNER Administrative Functions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <button className="bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-300 p-4 rounded-lg text-left transition-colors">
            <div className="font-semibold mb-1">Project Approvals</div>
            <div className="text-sm opacity-80">Review and approve DPR submissions</div>
          </button>
          <button className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 p-4 rounded-lg text-left transition-colors">
            <div className="font-semibold mb-1">Policy Management</div>
            <div className="text-sm opacity-80">Configure assessment criteria</div>
          </button>
          <button className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 p-4 rounded-lg text-left transition-colors">
            <div className="font-semibold mb-1">Regional Analytics</div>
            <div className="text-sm opacity-80">Northeast development insights</div>
          </button>
          <button className="bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 text-orange-300 p-4 rounded-lg text-left transition-colors">
            <div className="font-semibold mb-1">Stakeholder Management</div>
            <div className="text-sm opacity-80">Manage client access and roles</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const ClientDashboard: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
            <span className="text-2xl">📄</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Submit DPR</h3>
            <p className="text-gray-400 text-sm">Upload project documents</p>
          </div>
        </div>
        <div className="text-blue-300 text-2xl font-bold">3</div>
        <p className="text-gray-400 text-sm">Active submissions</p>
      </div>

      <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mr-4">
            <span className="text-2xl">✅</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Track Status</h3>
            <p className="text-gray-400 text-sm">Monitor review progress</p>
          </div>
        </div>
        <div className="text-green-300 text-2xl font-bold">2</div>
        <p className="text-gray-400 text-sm">Approved projects</p>
      </div>

      <div className="md:col-span-2 bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">🎯 Client Portal Functions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <button className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 p-4 rounded-lg text-left transition-colors">
            <div className="font-semibold mb-1">New DPR Submission</div>
            <div className="text-sm opacity-80">Start a new project assessment</div>
          </button>
          <button className="bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-300 p-4 rounded-lg text-left transition-colors">
            <div className="font-semibold mb-1">View Assessment Results</div>
            <div className="text-sm opacity-80">Check your project evaluations</div>
          </button>
          <button className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 p-4 rounded-lg text-left transition-colors">
            <div className="font-semibold mb-1">Download Reports</div>
            <div className="text-sm opacity-80">Get detailed assessment reports</div>
          </button>
          <button className="bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 text-orange-300 p-4 rounded-lg text-left transition-colors">
            <div className="font-semibold mb-1">Support & Guidance</div>
            <div className="text-sm opacity-80">Get help with your submissions</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortalContent;