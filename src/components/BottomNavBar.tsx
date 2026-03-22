import React from 'react';
import { 
  LayoutDashboard, 
  SearchCode, 
  GraduationCap, 
  FileText, 
  Settings as SettingsIcon 
} from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scanner', label: 'Scanner', icon: SearchCode },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-background/80 backdrop-blur-xl border-t border-outline-variant/15 rounded-t-[2rem] shadow-[0_-4px_40px_-10px_rgba(225,226,235,0.06)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center px-3 py-2 rounded-2xl transition-all duration-300 relative ${
              isActive 
                ? 'bg-surface-container-highest text-secondary scale-105' 
                : 'text-on-primary-container hover:text-primary'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-widest mt-1.5 font-headline">
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};
