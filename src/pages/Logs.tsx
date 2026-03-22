import React from 'react';
import { FileText, Search, Banknote, AtSign, Link2Off, CloudOff, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const Logs: React.FC = () => {
  const logs = [
    { date: 'Oct 24, 2023', time: '14:22:01 GMT', type: 'Bank Phishing', icon: Banknote, iconColor: 'text-error', source: 'secure-verify-chase.net/login', action: 'Blocked', actionBg: 'bg-error-container/40', actionText: 'text-error', confidence: '99.8%' },
    { date: 'Oct 24, 2023', time: '11:05:45 GMT', type: 'Spear Phishing', icon: AtSign, iconColor: 'text-primary', source: 'hr-portal@corp-update.ru', action: 'Quarantined', actionBg: 'bg-on-secondary-container/20', actionText: 'text-secondary', confidence: '94.2%' },
    { date: 'Oct 23, 2023', time: '23:58:12 GMT', type: 'Malicious Redirect', icon: Link2Off, iconColor: 'text-error', source: 'bit.ly/3x8K9zP_secure', action: 'Blocked', actionBg: 'bg-error-container/40', actionText: 'text-error', confidence: '100.0%' },
    { date: 'Oct 23, 2023', time: '09:12:33 GMT', type: 'Credential Harvesting', icon: CloudOff, iconColor: 'text-on-primary-container', source: 'microsoft-support.azure-auth.io', action: 'Blocked', actionBg: 'bg-error-container/40', actionText: 'text-error', confidence: '98.5%' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Audit Intelligence</span>
            <h2 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface mb-6 leading-[0.9]">
              Threat <span className="text-primary/60">History.</span>
            </h2>
            <p className="text-on-primary-container text-lg leading-relaxed opacity-80 max-w-xl">
              Detailed ledger of intercepted malicious activities and phishing attempts neutralized by the Sentinel AI core. 
            </p>
          </div>
          <div className="bg-surface-container-low px-8 py-6 rounded-[2rem] border border-outline-variant/5">
            <span className="block text-on-primary-container text-[10px] uppercase tracking-widest mb-2 font-bold">Total Intercepted</span>
            <span className="text-4xl font-headline font-extrabold text-on-surface">1,429</span>
          </div>
        </div>
      </section>

      {/* Filters & Status */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 bg-surface-container-low rounded-[2rem] p-6 flex flex-wrap gap-4 items-center border border-outline-variant/5">
          <span className="text-on-primary-container text-[10px] font-bold uppercase tracking-widest ml-2">Filter by:</span>
          <button className="bg-surface-container-highest px-5 py-2.5 rounded-xl text-xs font-bold text-primary hover:brightness-110 transition-all">All Threats</button>
          {['Bank Phishing', 'Spear Phishing', 'Vishing'].map(f => (
            <button key={f} className="bg-surface-container-lowest px-5 py-2.5 rounded-xl text-xs font-bold text-on-primary-container hover:text-primary transition-all">
              {f}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-3 text-on-primary-container bg-surface-container-lowest px-5 py-2.5 rounded-xl border border-outline-variant/5">
            <Search size={14} />
            <input 
              className="bg-transparent border-none focus:ring-0 text-xs font-medium placeholder:text-on-primary-container/30 w-32" 
              placeholder="Search logs..." 
              type="text"
            />
          </div>
        </div>
        
        <div className="md:col-span-4 bg-surface-container-low rounded-[2rem] p-6 flex items-center justify-between border border-outline-variant/5">
          <div>
            <span className="block text-on-primary-container text-[10px] uppercase tracking-widest font-bold mb-1">System Status</span>
            <span className="text-secondary font-headline font-extrabold text-lg">Active Shield</span>
          </div>
          <div className="relative flex items-center justify-center w-6 h-6">
            <div className="absolute inset-0 bg-secondary rounded-full blur-[8px] opacity-40 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-low rounded-[2.5rem] overflow-hidden border border-outline-variant/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/50 text-on-primary-container text-[10px] uppercase tracking-[0.2em] font-bold">
                <th className="px-10 py-6">Timestamp</th>
                <th className="px-10 py-6">Threat Vector</th>
                <th className="px-10 py-6">Source Identity</th>
                <th className="px-10 py-6">Action Taken</th>
                <th className="px-10 py-6 text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {logs.map((log, i) => (
                <tr key={i} className="group hover:bg-surface-container-highest/40 transition-colors duration-300">
                  <td className="px-10 py-8">
                    <span className="block text-on-surface text-sm font-bold">{log.date}</span>
                    <span className="text-on-primary-container text-xs opacity-60 font-mono">{log.time}</span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <log.icon className={log.iconColor} size={18} />
                      <span className="text-on-surface font-bold text-sm">{log.type}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <code className="text-primary bg-surface-container-lowest px-3 py-1.5 rounded-lg text-[10px] font-mono border border-outline-variant/5">
                      {log.source}
                    </code>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`${log.actionBg} ${log.actionText} text-[10px] px-3 py-1 rounded-lg font-bold uppercase tracking-widest border border-current/10`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <span className="text-on-surface font-mono text-sm font-bold">{log.confidence}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-10 py-8 border-t border-outline-variant/5 flex justify-between items-center bg-surface-container-low/50">
          <span className="text-on-primary-container text-[10px] font-bold uppercase tracking-widest">
            Showing 4 of 1,429 entries
          </span>
          <div className="flex gap-3">
            <button className="p-3 rounded-xl bg-surface-container-highest text-on-primary-container hover:text-primary transition-all active:scale-90">
              <ChevronLeft size={18} />
            </button>
            <button className="p-3 rounded-xl bg-surface-container-highest text-on-primary-container hover:text-primary transition-all active:scale-90">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
