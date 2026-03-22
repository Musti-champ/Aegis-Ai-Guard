import React from 'react';
import { SearchCode, Rocket, CheckCircle2, RefreshCw, Hourglass, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export const Scanner: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <section className="md:ml-4">
        <h1 className="font-headline font-extrabold text-5xl md:text-7xl text-primary tracking-tighter mb-4 max-w-2xl leading-[0.9]">
          Neural Phishing <span className="text-secondary">Analysis.</span>
        </h1>
        <p className="font-body text-on-primary-container text-lg max-w-xl leading-relaxed">
          Deploying high-speed machine learning models to intercept deceptive signatures before they reach your network.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Area */}
        <div className="lg:col-span-8 bg-surface-container-low rounded-[3rem] p-10 relative overflow-hidden border border-outline-variant/5">
          <div className="absolute top-0 right-0 p-10 opacity-5 select-none pointer-events-none">
            <SearchCode size={160} />
          </div>
          
          <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-on-primary-container mb-8">
            Security Ingestion Interface
          </label>
          
          <textarea 
            className="w-full h-72 bg-surface-container-lowest border-none rounded-3xl p-8 text-on-surface placeholder:text-on-primary-container/30 focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none font-body leading-relaxed text-xl transition-all"
            placeholder="Paste a suspicious URL or raw email content for real-time forensic scanning..."
          />
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-on-secondary-container/20 rounded-xl border border-secondary/10">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-3 h-3 bg-secondary rounded-full blur-[4px] animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">AI Engine Active</span>
              </div>
            </div>
            
            <button className="w-full sm:w-auto bg-gradient-to-br from-primary to-on-primary-container text-on-primary px-12 py-5 rounded-full font-headline font-extrabold tracking-tight active:scale-95 hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/10">
              Scan Now
              <Rocket size={20} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Diagnostics Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-surface-container-highest/40 rounded-[3rem] p-10 glass-effect border border-outline-variant/10">
            <h3 className="font-headline font-bold text-2xl text-primary mb-8 tracking-tight">Live Diagnostics</h3>
            
            <div className="space-y-8">
              {[
                { label: 'URL Reputation', sub: 'Cross-referencing 4.2M blacklists', icon: CheckCircle2, color: 'text-secondary', active: true },
                { label: 'Linguistic Triage', sub: 'Checking for deceptive language...', icon: RefreshCw, color: 'text-secondary', active: true, spin: true },
                { label: 'Header Forensic', sub: 'Awaiting input completion', icon: Hourglass, color: 'text-on-primary-container/30', active: false },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-5 ${!item.active && 'opacity-50'}`}>
                  <div className="mt-1">
                    <item.icon className={`${item.color} ${item.spin && 'animate-spin'}`} size={20} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-on-surface">{item.label}</p>
                    <p className="text-xs text-on-primary-container mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pulse Visualization */}
            <div className="mt-12 h-32 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-secondary/5 blur-[40px] rounded-full animate-pulse"></div>
              <div className="flex items-end gap-1.5 h-16">
                {[4, 8, 12, 6, 10, 5, 9, 7, 11, 4].map((h, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [h*4, h*6, h*4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1.5 bg-secondary rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Metric Card */}
          <div className="bg-surface-container-low rounded-[2.5rem] p-8 border border-outline-variant/5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 size={14} className="text-on-primary-container" />
                <span className="text-[10px] font-bold text-on-primary-container uppercase tracking-[0.2em]">Engine Latency</span>
              </div>
              <span className="text-secondary font-headline font-bold text-lg">14ms</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                className="bg-secondary h-full rounded-full shadow-[0_0_10px_rgba(74,225,131,0.3)]"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
