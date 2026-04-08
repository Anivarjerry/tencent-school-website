import React from 'react';
import { useWebsiteData } from './hooks/useWebsiteData';
import { PublicWebsite } from './components/PublicWebsite';

export default function App() {
  const { data, loading, error } = useWebsiteData();

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-50 gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-emerald-100 rounded-full"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-display font-extrabold text-slate-900 mb-2">VidyaSetu AI</h2>
          <p className="text-slate-500 font-medium animate-pulse">Initializing Digital Campus...</p>
        </div>
      </div>
    );
  }

  return <PublicWebsite data={data} error={error} />;
}
