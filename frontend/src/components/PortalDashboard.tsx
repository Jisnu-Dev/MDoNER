'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, User } from '@/lib/auth';
import Navigation from '@/components/Navigation';
import { useDocuments, UploadedDocument } from '@/contexts/DocumentContext';

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
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
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
  const { getAllDocuments, updateDocumentStatus } = useDocuments();
  const [selectedFilter, setSelectedFilter] = useState<'all' | UploadedDocument['status']>('all');
  
  const allDocuments = getAllDocuments();
  const filteredDocuments = selectedFilter === 'all' 
    ? allDocuments 
    : allDocuments.filter(doc => doc.status === selectedFilter);

  const statusCounts = {
    pending: allDocuments.filter(doc => doc.status === 'pending').length,
    'under-review': allDocuments.filter(doc => doc.status === 'under-review').length,
    approved: allDocuments.filter(doc => doc.status === 'approved').length,
    rejected: allDocuments.filter(doc => doc.status === 'rejected').length,
    viewed: allDocuments.filter(doc => doc.status === 'viewed').length,
  };

  const handleStatusUpdate = (docId: string, newStatus: UploadedDocument['status']) => {
    const comments = {
      'viewed': 'Document has been reviewed by admin.',
      'under-review': 'Document is currently under detailed review.',
      'approved': 'Document meets all requirements and has been approved.',
      'rejected': 'Document requires revisions. Please resubmit with corrections.'
    };
    
    updateDocumentStatus(
      docId, 
      newStatus, 
      comments[newStatus as keyof typeof comments],
      { name: 'MDoNER Admin', email: 'admin@mdoner.gov.in' }
    );
  };

  const getStatusBadge = (status: UploadedDocument['status']) => {
    const statusConfig = {
      'pending': { 
        bg: 'bg-yellow-900/50', 
        text: 'text-yellow-300', 
        border: 'border-yellow-500/30',
        icon: '⏳',
        label: 'Pending'
      },
      'viewed': { 
        bg: 'bg-blue-900/50', 
        text: 'text-blue-300', 
        border: 'border-blue-500/30',
        icon: '👁️',
        label: 'Viewed'
      },
      'under-review': { 
        bg: 'bg-purple-900/50', 
        text: 'text-purple-300', 
        border: 'border-purple-500/30',
        icon: '🔍',
        label: 'Under Review'
      },
      'approved': { 
        bg: 'bg-green-900/50', 
        text: 'text-green-300', 
        border: 'border-green-500/30',
        icon: '✅',
        label: 'Approved'
      },
      'rejected': { 
        bg: 'bg-red-900/50', 
        text: 'text-red-300', 
        border: 'border-red-500/30',
        icon: '❌',
        label: 'Rejected'
      }
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} border ${config.border}`}>
        <span className="mr-1">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="w-full">
      {/* Admin Statistics */}
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">⏳</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">Pending</h3>
              <p className="text-gray-400 text-sm">New submissions</p>
            </div>
          </div>
          <div className="text-yellow-300 text-2xl font-bold">{statusCounts.pending}</div>
        </div>

        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">🔍</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">Reviewing</h3>
              <p className="text-gray-400 text-sm">Under assessment</p>
            </div>
          </div>
          <div className="text-purple-300 text-2xl font-bold">{statusCounts['under-review']}</div>
        </div>

        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">Approved</h3>
              <p className="text-gray-400 text-sm">Ready for implementation</p>
            </div>
          </div>
          <div className="text-green-300 text-2xl font-bold">{statusCounts.approved}</div>
        </div>

        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">❌</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">Rejected</h3>
              <p className="text-gray-400 text-sm">Need revisions</p>
            </div>
          </div>
          <div className="text-red-300 text-2xl font-bold">{statusCounts.rejected}</div>
        </div>

        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">Total</h3>
              <p className="text-gray-400 text-sm">All documents</p>
            </div>
          </div>
          <div className="text-blue-300 text-2xl font-bold">{allDocuments.length}</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            All Documents ({allDocuments.length})
          </button>
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setSelectedFilter(status as UploadedDocument['status'])}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')} ({count})
            </button>
          ))}
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{document.name}</h4>
                    <p className="text-gray-400 text-xs">
                      {formatFileSize(document.size)} • {formatDate(document.uploadDate)}
                    </p>
                    <p className="text-gray-500 text-xs">
                      By: {document.uploadedBy.name} ({document.uploadedBy.email})
                    </p>
                  </div>
                </div>
                {getStatusBadge(document.status)}
              </div>

              {document.reviewerComments && (
                <div className="bg-black/20 border border-white/10 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-400 mb-1">Comments:</p>
                  <p className="text-gray-300 text-sm">{document.reviewerComments}</p>
                </div>
              )}

              {/* Admin Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(document.id, 'viewed')}
                    className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-medium rounded transition-colors"
                  >
                    Mark Viewed
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(document.id, 'under-review')}
                    className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-medium rounded transition-colors"
                  >
                    Start Review
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(document.id, 'approved')}
                    className="px-3 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-300 text-xs font-medium rounded transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(document.id, 'rejected')}
                    className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs font-medium rounded transition-colors"
                  >
                    Reject
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  ID: {document.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ClientDashboard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const { addDocument, getClientDocuments } = useDocuments();
  
  // Get current user's documents
  const user = auth.getUser();
  const uploadedDocuments = user ? getClientDocuments(user.email) : [];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;
    
    setUploadStatus('uploading');
    
    // Simulate upload process
    setTimeout(() => {
      // Add the new document using context
      addDocument({
        name: selectedFile.name,
        size: selectedFile.size,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        reviewerComments: 'Document uploaded successfully. Waiting for initial review.',
        uploadedBy: {
          name: user.name,
          email: user.email,
          department: user.department
        }
      });
      
      setUploadStatus('success');
      
      setTimeout(() => {
        setUploadStatus('idle');
        setSelectedFile(null);
      }, 2000);
    }, 1500);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
  };

  const getStatusBadge = (status: UploadedDocument['status']) => {
    const statusConfig = {
      'pending': { 
        bg: 'bg-yellow-900/50', 
        text: 'text-yellow-300', 
        border: 'border-yellow-500/30',
        icon: '⏳',
        label: 'Pending'
      },
      'viewed': { 
        bg: 'bg-blue-900/50', 
        text: 'text-blue-300', 
        border: 'border-blue-500/30',
        icon: '👁️',
        label: 'Viewed'
      },
      'under-review': { 
        bg: 'bg-purple-900/50', 
        text: 'text-purple-300', 
        border: 'border-purple-500/30',
        icon: '🔍',
        label: 'Under Review'
      },
      'approved': { 
        bg: 'bg-green-900/50', 
        text: 'text-green-300', 
        border: 'border-green-500/30',
        icon: '✅',
        label: 'Approved'
      },
      'rejected': { 
        bg: 'bg-red-900/50', 
        text: 'text-red-300', 
        border: 'border-red-500/30',
        icon: '❌',
        label: 'Rejected'
      }
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} border ${config.border}`}>
        <span className="mr-1">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="w-full min-h-screen bg-black">
      <Navigation />
      
      {/* Document Upload Section */}
      <div className="w-full px-6 pt-32">
        <div id="manage-dpr" className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Add & Manage DPR Documents</h2>
            <p className="text-gray-300 text-sm">Upload your DPR documents for AI-powered quality assessment and risk prediction</p>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center mb-6 hover:border-blue-400/50 transition-colors duration-200">
            {!selectedFile ? (
              <div>
                <div className="mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-white mb-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-300 hover:text-blue-400 font-medium">Click to upload</span>
                    <span className="text-gray-300"> or drag and drop</span>
                  </label>
                </div>
                <p className="text-gray-400 text-sm">PDF, DOC, DOCX up to 10MB</p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <svg className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">{selectedFile.name}</p>
                    <p className="text-gray-400 text-sm">{Math.round(selectedFile.size / 1024)} KB</p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Upload Button */}
          {selectedFile && (
            <div className="flex justify-center">
              <button
                onClick={handleUpload}
                disabled={uploadStatus === 'uploading'}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  uploadStatus === 'uploading'
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : uploadStatus === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {uploadStatus === 'uploading' ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </div>
                ) : uploadStatus === 'success' ? (
                  <div className="flex items-center space-x-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Upload Successful!</span>
                  </div>
                ) : (
                  'Upload Document'
                )}
              </button>
            </div>
          )}
        </div>

        {/* Uploaded Documents Section */}
        {uploadedDocuments.length > 0 && (
          <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 mt-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Uploaded Documents</h3>
              <p className="text-gray-300 text-sm">Track the status of your submitted DPR documents</p>
            </div>

            <div className="space-y-4">
              {uploadedDocuments.map((document) => (
                <div key={document.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">{document.name}</h4>
                        <p className="text-gray-400 text-xs">
                          {formatFileSize(document.size)} • Uploaded on {formatDate(document.uploadDate)}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(document.status)}
                  </div>

                  {document.reviewerComments && (
                    <div className="bg-black/20 border border-white/10 rounded-lg p-3 mt-3">
                      <p className="text-xs text-gray-400 mb-1">Reviewer Comments:</p>
                      <p className="text-gray-300 text-sm">{document.reviewerComments}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                    <div className="flex space-x-2">
                      <button className="text-blue-300 hover:text-blue-400 text-xs font-medium transition-colors">
                        View Details
                      </button>
                      <button className="text-green-300 hover:text-green-400 text-xs font-medium transition-colors">
                        Download
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {document.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalContent;