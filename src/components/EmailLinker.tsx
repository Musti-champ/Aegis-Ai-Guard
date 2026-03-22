import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Shield, CheckCircle2, Loader2, AlertCircle, Zap, Bot, Lock, Trash2, RefreshCw } from 'lucide-react';
import { useLinkedEmails } from '../context/LinkedEmailsContext';

export const EmailLinker: React.FC = () => {
  const { linkedEmails, addEmail, linkRealEmail, removeEmail, retryEmail } = useLinkedEmails();
  const [status, setStatus] = useState<'idle' | 'linking' | 'error'>('idle');
  const [email, setEmail] = useState('');

  const handleLinkReal = async () => {
    setStatus('linking');
    await linkRealEmail();
    setStatus('idle');
  };

  const handleLink = async () => {
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    if (linkedEmails.some(e => e.email === email)) {
      setStatus('error');
      return;
    }
    
    setStatus('linking');
    await addEmail(email);
    setStatus('idle');
    setEmail('');
  };

  return (
    <div className="bg-surface-container-low rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-xl relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
            linkedEmails.length > 0 ? 'bg-emerald-500/20 text-emerald-500 rotate-[360deg]' : 'bg-primary/10 text-primary'
          }`}>
            {linkedEmails.length > 0 ? <Bot size={24} /> : <Mail size={24} />}
          </div>
          <div>
            <h3 className="text-xl font-bold font-headline tracking-tight">Email Protection Bot</h3>
            <p className="text-[10px] text-on-primary-container font-bold uppercase tracking-widest opacity-60">Real-time Inbox Synchronization</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === 'idle' || status === 'error' ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <p className="text-sm text-on-primary-container leading-relaxed">
                Connect your email accounts to enable the AI Protection Bot. It will monitor your inboxes in real-time and automatically red-flag suspicious communications.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-surface-container-highest/50 border ${status === 'error' ? 'border-error' : 'border-outline-variant/20'} rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary/50 transition-all`}
                  />
                  {status === 'error' && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-error">
                      <AlertCircle size={18} />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLink}
                  className="premium-gradient text-on-primary font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  <Zap size={18} fill="currentColor" />
                  Link Account
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/10"></div>
                </div>
                <div className="relative flex justify-center text-[8px] font-bold uppercase tracking-widest">
                  <span className="bg-surface-container-low px-2 text-on-primary-container opacity-30">or secure connection</span>
                </div>
              </div>

              <button
                onClick={handleLinkReal}
                className="w-full py-4 bg-surface-container-highest text-on-surface rounded-2xl font-bold text-sm hover:bg-surface-container-high transition-all flex items-center justify-center gap-3 border border-outline-variant/10"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="Google" className="w-5 h-5 bg-white rounded-full p-1" />
                Connect Real Gmail (OAuth)
              </button>

              {/* Linked Emails List */}
              {linkedEmails.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-50">Linked Accounts</h4>
                  <div className="space-y-2">
                    {linkedEmails.map((linked) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={linked.email} 
                        className="bg-surface-container-highest/30 p-4 rounded-2xl border border-outline-variant/5 flex items-center justify-between group/item"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            linked.status === 'active' ? 'bg-emerald-500 animate-pulse' : 
                            linked.status === 'error' ? 'bg-error' : 
                            'bg-primary animate-spin'
                          }`}></div>
                          <div>
                            <span className="text-xs font-bold font-mono truncate block max-w-[150px] sm:max-w-none">{linked.email}</span>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className={`text-[8px] font-bold uppercase tracking-widest block ${
                                  linked.status === 'error' ? 'text-error font-black' : 'opacity-50'
                                }`}>
                                  {linked.status === 'active' ? 'Active' : 
                                   linked.status === 'error' ? 'Connection Error' : 
                                   'Syncing...'}
                                </span>
                                {linked.status === 'error' && (
                                  <button 
                                    onClick={() => retryEmail(linked.email)}
                                    className="text-[8px] font-bold uppercase tracking-widest text-primary hover:underline flex items-center gap-1"
                                  >
                                    <RefreshCw size={8} />
                                    Retry
                                  </button>
                                )}
                              </div>
                              {linked.lastSyncedAt && linked.status === 'active' && (
                                <span className="text-[7px] text-on-primary-container/40 font-medium uppercase tracking-tighter">
                                  Last Synced: {new Date(linked.lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeEmail(linked.email)}
                          className="p-2 text-on-primary-container/40 hover:text-error hover:bg-error/10 rounded-lg transition-all opacity-0 group-hover/item:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-on-primary-container uppercase tracking-widest opacity-50">
                  <Shield size={12} />
                  <span>OAuth 2.0 Secure</span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-on-primary-container uppercase tracking-widest opacity-50">
                  <Lock size={12} />
                  <span>End-to-End Encrypted</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="linking"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="py-10 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="relative">
                <Loader2 className="text-primary animate-spin" size={48} />
                <motion.div 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg">Establishing Secure Link</h4>
                <p className="text-xs text-on-primary-container opacity-60">Synchronizing with {email}...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
