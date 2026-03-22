import React from 'react';
import { UserCheck, Shield, Bolt, AtSign, Globe, ShieldAlert, ArrowRight, Link2Off, Mail, Paperclip, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import { EmailLinker } from '../components/EmailLinker';
import { useLinkedEmails } from '../context/LinkedEmailsContext';
import { ThreatFeed } from '../components/ThreatFeed';

import { ManualScan } from '../components/ManualScan';
import { ThreatAnalytics } from '../components/ThreatAnalytics';

export const Dashboard: React.FC = () => {
  const { isAnyEmailLinked } = useLinkedEmails();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative overflow-hidden rounded-[2.5rem] p-8 bg-surface-container-low border border-outline-variant/5">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex items-center justify-center">
                  <div className={`absolute w-12 h-12 rounded-full blur-xl ${isAnyEmailLinked ? 'bg-emerald-500/20' : 'bg-secondary/20'}`}></div>
                  <UserCheck className={`relative z-10 ${isAnyEmailLinked ? 'text-emerald-500' : 'text-secondary'}`} size={32} />
                </div>
                <span className={`${isAnyEmailLinked ? 'text-emerald-500' : 'text-secondary'} font-headline font-bold tracking-widest uppercase text-xs`}>
                  {isAnyEmailLinked ? 'Bot Protection Active' : 'System Guard Active'}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-4 tracking-tighter leading-[1.1]">
                Your digital perimeter is <span className={isAnyEmailLinked ? 'text-emerald-500' : 'text-secondary'}>secure</span>.
              </h2>
              <p className="text-on-primary-container text-lg leading-relaxed mb-8">
                {isAnyEmailLinked 
                  ? 'The AI Bot is now synchronized with your inboxes, providing real-time protection and immediate threat neutralization.'
                  : 'AI-driven heuristics are currently monitoring all incoming communications for phishing signatures.'}
              </p>
              <button className="premium-gradient text-on-primary font-bold px-8 py-4 rounded-2xl flex items-center gap-3 active:scale-95 transition-transform duration-200 shadow-lg shadow-primary/10">
                <Bolt size={20} fill="currentColor" />
                {isAnyEmailLinked ? 'Bot Analysis' : 'Quick Scan'}
              </button>
            </div>
            
            <div className="hidden md:flex relative w-48 h-48 items-center justify-center">
              <div className={`absolute inset-0 rounded-full border animate-pulse ${isAnyEmailLinked ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-secondary/5 border-secondary/10'}`}></div>
              <div className={`absolute inset-6 rounded-full border ${isAnyEmailLinked ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-secondary/5 border-secondary/10'}`}></div>
              <Shield className={isAnyEmailLinked ? 'text-emerald-500/20' : 'text-secondary/20'} size={100} />
            </div>
          </div>
        </div>

        <EmailLinker />
      </section>

      {/* Active Intelligence */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <ShieldAlert className="text-secondary" size={18} />
          <h3 className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Active Intelligence</h3>
        </div>
        
        <div className="bg-surface-container-low rounded-[2.5rem] p-8 border border-secondary/5 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-2xl font-bold font-headline mb-1">Email Traceroute</h4>
                  <p className="text-on-primary-container text-sm">Tracking transmission paths for anomalous routing.</p>
                </div>
                <button className="bg-surface-container-highest text-secondary text-[10px] font-bold px-4 py-2 rounded-xl flex items-center gap-2 active:scale-95 transition-all uppercase tracking-widest">
                  Traceroute
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Sender IP', value: '192.168.1.1', color: 'text-secondary' },
                  { label: 'Domain IP', value: '104.21.34.12', color: 'text-primary' },
                  { label: 'Location', value: 'Dublin, Ireland', color: 'text-on-surface' },
                ].map((item, i) => (
                  <div key={i} className="bg-surface-container-highest/30 p-5 rounded-2xl border border-outline-variant/5">
                    <span className="text-[10px] text-on-primary-container font-bold uppercase tracking-widest block mb-1">
                      {item.label}
                    </span>
                    <span className={`${item.color} font-bold font-mono`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-72 h-56 bg-surface-container-highest/20 rounded-3xl relative traceroute-path flex flex-col items-center justify-center overflow-hidden border border-outline-variant/10">
              <div className="flex items-center justify-around w-full px-6 relative z-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
                    <AtSign className="text-secondary" size={16} />
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-widest">Origin</span>
                </div>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-secondary to-primary mx-2 relative">
                  <motion.div 
                    animate={{ left: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 w-2 h-2 bg-secondary rounded-full -translate-y-1/2 blur-[2px]"
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Globe className="text-primary" size={16} />
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-widest">Cloudflare</span>
                </div>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-primary to-secondary mx-2"></div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
                    <Shield className="text-secondary" size={16} />
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-widest">Secure</span>
                </div>
              </div>
              <div className="absolute bottom-6 text-[10px] text-on-primary-container font-medium tracking-wide">
                Path integrity verified by AI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Threat Feed Section */}
      <ThreatFeed isLinked={isAnyEmailLinked} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Mails Scanned', value: '12,482', sub: '+14%', subColor: 'text-secondary' },
          { label: 'Link Analysis', value: '99.9%', sub: 'Accuracy', subColor: 'text-on-primary-container' },
          { label: 'Active Uptime', value: '482d', sub: 'Continuous', subColor: 'text-on-primary-container' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-low p-8 rounded-[2rem] flex flex-col justify-between border border-outline-variant/5">
            <span className="text-on-primary-container text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
              {stat.label}
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-headline font-extrabold tracking-tight">{stat.value}</span>
              <span className={`${stat.subColor} text-xs font-bold`}>{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Analytics */}
      <ThreatAnalytics />

      {/* Manual Scan */}
      <ManualScan />

      {/* Recent Threats */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-3xl font-bold font-headline tracking-tight">Recent Threats</h3>
            <p className="text-on-primary-container text-sm">Latest neutralization events from the last 24 hours.</p>
          </div>
          <button className="text-secondary text-xs font-bold flex items-center gap-2 hover:underline uppercase tracking-widest">
            View Logs <ArrowRight size={14} />
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { title: 'Suspicious URL', desc: 'secure-login-apple.support.net/verify', icon: Link2Off, risk: 'High Risk', riskBg: 'bg-error-container/40', riskText: 'text-error' },
            { title: 'Fake Bank Email', desc: 'From: alert@global-bank-support.io', icon: Mail, risk: 'Medium Risk', riskBg: 'bg-primary-container', riskText: 'text-primary' },
            { title: 'Malicious Attachment', desc: 'Invoice_29482_Scan.pdf.exe', icon: Paperclip, risk: 'High Risk', riskBg: 'bg-error-container/40', riskText: 'text-error' },
          ].map((threat, i) => (
            <div key={i} className="glass-effect p-6 rounded-[2rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all hover:bg-surface-container-highest/80 border border-outline-variant/5">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl ${threat.risk === 'High Risk' ? 'bg-error-container/20' : 'bg-surface-container-highest'} flex items-center justify-center`}>
                  <threat.icon className={threat.risk === 'High Risk' ? 'text-error' : 'text-on-primary-container'} size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-lg font-headline">{threat.title}</h4>
                  <p className="text-sm text-on-primary-container font-mono opacity-70">{threat.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <div className={`${threat.riskBg} px-4 py-1.5 rounded-lg`}>
                  <span className={`text-[10px] font-bold ${threat.riskText} uppercase tracking-widest`}>
                    {threat.risk}
                  </span>
                </div>
                <button className="bg-surface-container-highest text-on-surface text-sm font-bold px-6 py-3 rounded-2xl hover:bg-surface-container-high transition-colors active:scale-95">
                  View Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
