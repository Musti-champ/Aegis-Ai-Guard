import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, ShieldCheck, Bell, History, Lock, ChevronRight, CheckCircle2, Shield, Eye, EyeOff, Key, Save, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLinkedEmails } from '../context/LinkedEmailsContext';
import { EmailLinker } from '../components/EmailLinker';

interface SettingsProps {
  onBack?: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const { isAnyEmailLinked } = useLinkedEmails();
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('GEMINI_API_KEY');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleSaveKey = () => {
    setIsSaving(true);
    // Simulate saving to .env (using localStorage for persistence in preview)
    setTimeout(() => {
      localStorage.setItem('GEMINI_API_KEY', apiKey);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-12"
    >
      {/* Header */}
      <header className="flex items-center gap-6 mb-12">
        <button 
          onClick={onBack}
          className="text-primary hover:bg-surface-container-highest transition-all active:scale-90 p-3 rounded-2xl border border-outline-variant/10"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-headline font-extrabold text-3xl tracking-tight text-primary">Settings</h1>
      </header>

      {/* Account Protection */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-headline text-4xl font-extrabold tracking-tighter">Account Protection</h2>
          <div className={`${isAnyEmailLinked ? 'bg-emerald-500/20 border-emerald-500/10' : 'bg-error-container/20 border-error/10'} px-4 py-1.5 rounded-lg border`}>
            <span className={`${isAnyEmailLinked ? 'text-emerald-500' : 'text-error'} font-bold text-[10px] uppercase tracking-[0.2em]`}>
              {isAnyEmailLinked ? 'Protected' : 'Not Protected'}
            </span>
          </div>
        </div>
        
        <EmailLinker />
      </section>

      {/* Security Core */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="font-headline text-xs font-bold tracking-[0.4em] uppercase text-on-primary-container">Security Core</h2>
          <div className="h-[1px] flex-1 bg-outline-variant/10"></div>
        </div>
        
        <div className="space-y-6">
          {/* Gemini API Key Configuration */}
          <div className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Key size={20} />
              </div>
              <div>
                <h3 className="font-headline font-extrabold text-xl">Gemini AI Configuration</h3>
                <p className="text-[10px] text-on-primary-container font-bold uppercase tracking-widest opacity-60">Core Intelligence Engine</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter Gemini API Key"
                  className="w-full bg-surface-container-highest/50 border border-outline-variant/20 rounded-2xl px-5 py-4 text-sm font-mono focus:outline-none focus:border-primary/50 transition-all pr-12"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-primary-container/40 hover:text-primary transition-colors"
                >
                  {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-on-primary-container opacity-60 max-w-[70%]">
                  This key powers the real-time threat analysis and behavioral bot. It will be stored securely in the environment configuration.
                </p>
                <button
                  onClick={handleSaveKey}
                  disabled={isSaving}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                    saveSuccess 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                  }`}
                >
                  {isSaving ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : saveSuccess ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <Save size={16} />
                  )}
                  {isSaving ? 'Saving...' : saveSuccess ? 'Saved to .env' : 'Save Key'}
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Toggle */}
          <div className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/5">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-headline font-extrabold text-xl">Real-time Automatic Threat Detection</span>
                  <div className="relative flex items-center justify-center w-4 h-4">
                    <div className="absolute inset-0 bg-secondary rounded-full blur-[6px] opacity-40 animate-pulse"></div>
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                </div>
                <p className="text-on-primary-container text-base leading-relaxed opacity-80">
                  Automatically intercept and quarantine fraudulent emails the moment they arrive in your inbox.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-2">
                <input checked readOnly className="sr-only peer" type="checkbox" />
                <div className="w-16 h-9 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-on-primary-container after:border-none after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-secondary/20 peer-checked:after:bg-secondary shadow-inner"></div>
              </label>
            </div>
          </div>

          {/* Sensitivity Level */}
          <div className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/5">
            <div className="flex items-center justify-between mb-8">
              <label className="font-headline font-extrabold text-xl">Detection Sensitivity</label>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em] bg-secondary/10 px-3 py-1 rounded-lg border border-secondary/10">Adaptive AI Active</span>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'low', title: 'Low Sensitivity', desc: 'Focuses only on high-confidence phishing attempts. Minimizes false positives.', active: false },
                { id: 'medium', title: 'Medium (Standard)', desc: 'Balanced protection using neural behavior analysis. Optimal for most users.', active: true, recommended: true },
                { id: 'high', title: 'High Sensitivity', desc: 'Strictest filtering. Flags all suspicious links and requests. May require manual review.', active: false },
              ].map((level) => (
                <button 
                  key={level.id}
                  className={`group flex items-start gap-5 p-6 rounded-2xl border transition-all text-left relative ${
                    level.active 
                      ? 'border-secondary bg-secondary/5 ring-4 ring-secondary/5' 
                      : 'border-outline-variant/10 bg-surface-container-lowest hover:bg-surface-container-highest/40'
                  }`}
                >
                  {level.recommended && (
                    <div className="absolute -top-3 right-6 bg-secondary text-on-secondary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      Recommended
                    </div>
                  )}
                  <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    level.active ? 'border-secondary' : 'border-outline group-hover:border-primary'
                  }`}>
                    {level.active && <div className="w-3 h-3 rounded-full bg-secondary"></div>}
                  </div>
                  <div>
                    <div className="font-headline font-extrabold text-on-surface text-lg">{level.title}</div>
                    <p className="text-sm text-on-primary-container mt-2 leading-relaxed opacity-70">{level.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Preferences */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-low p-8 rounded-[2.5rem] flex flex-col justify-between border border-outline-variant/5">
          <div>
            <h3 className="font-headline font-extrabold text-xl mb-1">Security Level</h3>
            <p className="text-xs text-on-primary-container font-bold uppercase tracking-widest opacity-50">Based on current active shields</p>
          </div>
          <div className="mt-12 flex items-baseline gap-3">
            <span className="text-6xl font-headline font-extrabold text-primary tracking-tighter">A-</span>
            <span className="text-secondary font-bold text-xs uppercase tracking-[0.2em]">Optimized</span>
          </div>
          <div className="mt-6 w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              className="bg-primary h-full rounded-full"
            />
          </div>
        </div>

        <div className="bg-surface-container-low p-8 rounded-[2.5rem] space-y-6 border border-outline-variant/5">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-extrabold text-xl">Notifications</h3>
            <Bell className="text-on-primary-container" size={18} />
          </div>
          <ul className="space-y-4">
            {[
              { label: 'Critical Alerts', active: true },
              { label: 'Weekly Report', active: true },
              { label: 'Marketing', active: false },
            ].map((item, i) => (
              <li key={i} className="flex items-center justify-between text-base font-medium">
                <span className={item.active ? 'text-on-surface' : 'text-on-primary-container/40'}>{item.label}</span>
                {item.active ? (
                  <CheckCircle2 className="text-secondary" size={20} fill="currentColor" fillOpacity={0.1} />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-outline-variant/20"></div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Secondary Actions */}
      <section className="space-y-3">
        {[
          { label: 'Security Audit Log', icon: History },
          { label: 'Encryption Keys', icon: Lock },
        ].map((action, i) => (
          <button key={i} className="w-full flex items-center justify-between px-8 py-6 bg-surface-container-low rounded-[2rem] group hover:bg-surface-container-high transition-all border border-outline-variant/5">
            <div className="flex items-center gap-5">
              <action.icon className="text-on-primary-container" size={20} />
              <span className="font-headline font-extrabold text-on-surface text-lg">{action.label}</span>
            </div>
            <ChevronRight className="text-on-primary-container/30 group-hover:translate-x-2 transition-transform" size={20} />
          </button>
        ))}
      </section>
    </motion.div>
  );
};
