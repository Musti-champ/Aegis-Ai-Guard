import React, { useState } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { Dashboard } from './pages/Dashboard';
import { Scanner } from './pages/Scanner';
import { Education } from './pages/Education';
import { Logs } from './pages/Logs';
import { Settings } from './pages/Settings';
import { AnimatePresence } from 'motion/react';
import { ShieldAlert } from 'lucide-react';
import { LinkedEmailsProvider } from './context/LinkedEmailsContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, loading, login } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-secondary/10 border-t-secondary animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest opacity-50">Initializing Aegis Security...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface-container-low border border-outline-variant/10 rounded-[3rem] p-12 text-center shadow-2xl">
          <div className="w-24 h-24 rounded-[2.5rem] bg-secondary/10 flex items-center justify-center text-secondary mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-secondary blur-3xl opacity-20 animate-pulse"></div>
            <ShieldAlert size={48} className="relative z-10" />
          </div>
          <h1 className="text-3xl font-headline font-black mb-4 tracking-tight">Aegis AI Guard</h1>
          <p className="text-sm text-on-primary-container opacity-60 mb-12 leading-relaxed">
            Welcome to the next generation of email security. Please authenticate with your corporate account to access the dashboard.
          </p>
          <button
            onClick={login}
            className="w-full py-4 bg-secondary text-on-secondary rounded-2xl font-bold text-sm shadow-xl shadow-secondary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="Google" className="w-5 h-5 bg-white rounded-full p-1" />
            Sign in with Google
          </button>
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30 mt-8">Secure Enterprise Access Only</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard key="dashboard" />;
      case 'scanner':
        return <Scanner key="scanner" />;
      case 'education':
        return <Education key="education" />;
      case 'logs':
        return <Logs key="logs" />;
      case 'settings':
        return <Settings key="settings" onBack={() => setActiveTab('dashboard')} />;
      default:
        return <Dashboard key="dashboard" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-secondary/30">
      <TopAppBar />
      
      <main className="pt-28 pb-40 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* AI Pulse indicator (Desktop) */}
      <div className="fixed bottom-12 right-12 z-40 hidden lg:flex items-center gap-4 bg-surface-container-low/80 backdrop-blur-md px-6 py-3 rounded-full border border-outline-variant/10">
        <div className="relative">
          <div className="absolute inset-0 bg-secondary blur-xl opacity-30 animate-pulse"></div>
          <div className="w-3 h-3 bg-secondary rounded-full relative z-10"></div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Aegis Active Guard</span>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LinkedEmailsProvider>
        <AppContent />
      </LinkedEmailsProvider>
    </AuthProvider>
  );
}
