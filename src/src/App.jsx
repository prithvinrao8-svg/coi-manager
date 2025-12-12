import React, { useState } from 'react';
import { Upload, CheckCircle, Users, Award, Target, Home, BarChart3, Menu } from 'lucide-react';

export default function MobileCOIApp() {
  const [uploadState, setUploadState] = useState('idle');
  const [currentView, setCurrentView] = useState('upload');

  const analysisResults = {
    totalConnections: 127,
    goldCOIs: 2,
    actionNeeded: 2,
    estimatedPipeline: "$5-10M",
    topContacts: [
      {
        name: "Jeff Kent",
        title: "Controller, Canart Group",
        category: "GOLD COI",
        urgency: "This Week",
        potential: "1-2 referrals/year",
        message: "Hi Jeff, hope things are going well at Canart. I specialize in working with business owners on wealth planning. Would you have 30 minutes for coffee?"
      },
      {
        name: "David Hughes", 
        title: "Partner, Forward Law",
        category: "GOLD COI",
        urgency: "This Week",
        potential: "2-3 referrals/year",
        message: "Hi David, we connected a while back but never met. I work with business owners on succession planning. Coffee soon?"
      }
    ]
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setUploadState('uploading');
    setTimeout(() => {
      setUploadState('processing');
      setTimeout(() => {
        setUploadState('complete');
        setCurrentView('results');
      }, 2000);
    }, 1500);
  };

  const copyMessage = (message) => {
    navigator.clipboard.writeText(message);
    alert('Message copied! Now send it on LinkedIn.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold">COI Manager</h1>
          <p className="text-xs text-indigo-100">Find Your Referral Sources</p>
        </div>
      </div>

      <div className="px-4 py-6 pb-24">
        {uploadState === 'idle' && currentView === 'upload' && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4">
              <h2 className="text-lg font-bold text-slate-900 mb-3">Get Your LinkedIn Connections</h2>
              <div className="space-y-3 text-sm">
                {[
                  "LinkedIn → Me → Settings",
                  "Data Privacy → Get Data",
                  "Select Connections → Request",
                  "Check email (10-30 min)"
                ].map((step, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="bg-indigo-100 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-indigo-700">
                      {i + 1}
                    </div>
                    <p className="font-semibold text-slate-900">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">🔒 Your data stays on your device. Completely private.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-2 border-dashed border-indigo-300">
              <label htmlFor="file-upload" className="block cursor-pointer">
                <div className="p-8 text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Connections.csv</h3>
                  <p className="text-sm text-slate-600 mb-4">Tap to choose file</p>
                  <div className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold text-sm inline-block">
                    Choose File
                  </div>
                </div>
              </label>
              <input id="file-upload" type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
            </div>

            <button 
              onClick={() => { setUploadState('complete'); setCurrentView('results'); }}
              className="w-full mt-4 bg-slate-600 text-white py-3 rounded-lg font-semibold"
            >
              See Demo Results
            </button>
          </>
        )}

        {uploadState === 'uploading' && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mb-4"></div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Uploading...</h3>
          </div>
        )}

        {uploadState === 'processing' && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="inline-block animate-pulse mb-4">
              <Users className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Analyzing...</h3>
            <p className="text-sm text-slate-600 mb-4">Finding your referral sources</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full animate-pulse w-2/3"></div>
            </div>
          </div>
        )}

        {uploadState === 'complete' && currentView === 'results' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-6 h-6" />
                <h2 className="text-lg font-bold">Analysis Complete!</h2>
              </div>
              <p className="text-sm text-emerald-100">Found {analysisResults.goldCOIs} high-value referral sources</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Connections", value: analysisResults.totalConnections, color: "slate" },
                { label: "Gold COIs", value: analysisResults.goldCOIs, color: "yellow" },
                { label: "Action Needed", value: analysisResults.actionNeeded, color: "red" },
                { label: "Pipeline Value", value: analysisResults.estimatedPipeline, color: "emerald" }
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                  <p className="text-xs text-slate-600 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Contact These This Week
              </h3>
              <div className="space-y-3">
                {analysisResults.topContacts.map((contact, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-4 shadow-md">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900">{contact.name}</h4>
                        <p className="text-xs text-slate-600">{contact.title}</p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-200 text-yellow-900 rounded text-xs font-bold">GOLD</span>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 mb-3">
                      <p className="text-xs text-slate-600 mb-1">Message:</p>
                      <p className="text-xs text-slate-700 italic">{contact.message}</p>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => copyMessage(contact.message)}
                        className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold text-sm"
                      >
                        Copy Message
                      </button>
                      <a 
                        href={`https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(contact.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm text-center"
                      >
                        Open LinkedIn
                      </a>
                    </div>

                    <p className="text-xs text-emerald-700 font-medium mt-2 text-center">
                      Potential: {contact.potential}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-600 rounded-xl shadow-lg p-4 text-white">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Next Steps
              </h3>
              <div className="space-y-1.5 text-sm">
                {["Copy the message templates above", "Send on LinkedIn today", "Schedule coffee meetings"].map((step, i) => (
                  <p key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    {step}
                  </p>
                ))}
              </div>
            </div>

            <button 
              onClick={() => { setUploadState('idle'); setCurrentView('upload'); }}
              className="w-full bg-slate-600 text-white py-3 rounded-lg font-semibold"
            >
              Upload New File
            </button>
          </div>
        )}

        {currentView === 'help' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 mb-4">How It Works</h2>
            
            {[
              { title: "What This App Does", text: "Analyzes your LinkedIn connections to find people who can actually refer business to you - like lawyers, accountants, and business owners.", color: "indigo" },
              { title: "Your Privacy", text: "All analysis happens on your phone. Your data never leaves your device. We don't store or see any of your connections.", color: "emerald" },
              { title: "Best Results", text: "• Reach out within 24 hours\n• Personalize the message\n• Follow up if no response\n• Build relationships slowly", color: "yellow" }
            ].map((section, i) => (
              <div key={i} className={`bg-${section.color}-50 border border-${section.color}-200 rounded-lg p-4`}>
                <h3 className={`font-bold text-${section.color}-900 mb-2`}>{section.title}</h3>
                <p className={`text-sm text-${section.color}-800 whitespace-pre-line`}>{section.text}</p>
              </div>
            ))}

            <button 
              onClick={() => setCurrentView(uploadState === 'complete' ? 'results' : 'upload')}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
            >
              Back to App
            </button>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg">
        <div className="flex justify-around py-2">
          {[
            { view: 'upload', icon: Home, label: 'Upload' },
            { view: 'results', icon: BarChart3, label: 'Results' },
            { view: 'help', icon: Menu, label: 'Help' }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button 
                key={tab.view}
                onClick={() => { 
                  if(tab.view === 'results' && uploadState !== 'complete') return;
                  setCurrentView(tab.view);
                }}
                className={`flex flex-col items-center py-2 px-4 ${currentView === tab.view ? 'text-indigo-600' : 'text-slate-500'}`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
