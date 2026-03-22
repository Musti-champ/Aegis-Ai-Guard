import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const TopAppBar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/80 flex justify-between items-center px-6 py-5 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high flex items-center justify-center border border-outline-variant/10">
          <img 
            alt="Profile" 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-xl font-extrabold tracking-tighter text-primary font-headline">
          Sentient Security
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-highest transition-colors duration-300 active:scale-95 text-primary">
          <ShieldCheck size={24} />
        </button>
      </div>
    </header>
  );
};
