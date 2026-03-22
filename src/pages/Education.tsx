import React from 'react';
import { GraduationCap, BookOpen, Lock, Play, Info, Search } from 'lucide-react';
import { motion } from 'motion/react';

export const Education: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <section className="relative overflow-hidden pt-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 -mr-20 -mt-20 blur-[100px] rounded-full"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-on-secondary-container/20 text-secondary text-[10px] font-bold tracking-[0.3em] uppercase mb-8 border border-secondary/10">
            <GraduationCap size={14} />
            Academy Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold font-headline text-primary tracking-tighter leading-[0.9] mb-8">
            Phishing Academy
          </h1>
          <p className="text-on-primary-container text-lg md:text-xl max-w-2xl leading-relaxed opacity-80">
            Elevate your digital intuition. Our advanced modules provide the intellectual armor needed to outsmart sophisticated phishing vectors through curated cognitive training.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Featured Module */}
        <div className="md:col-span-8 bg-surface-container-low p-10 rounded-[3rem] flex flex-col justify-between min-h-[450px] relative group overflow-hidden border border-outline-variant/5">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
            <img 
              className="w-full h-full object-cover grayscale" 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
              alt="Digital Network"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h2 className="text-4xl font-extrabold font-headline text-on-surface mb-4 tracking-tight">Spotting Homoglyphs</h2>
                <p className="text-on-primary-container text-lg max-w-md leading-relaxed">Master the art of identifying visual deception in URL characters and lookalike domains.</p>
              </div>
              <div className="w-20 h-20 rounded-[2rem] bg-surface-container-highest flex items-center justify-center border border-outline-variant/10 group-hover:scale-110 transition-transform duration-500">
                <Search className="text-secondary" size={32} />
              </div>
            </div>
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold text-on-primary-container uppercase tracking-[0.3em]">
                <span>Progress</span>
                <span>65%</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  className="h-full bg-secondary rounded-full shadow-[0_0_20px_rgba(74,225,131,0.4)]"
                />
              </div>
            </div>
            <button className="w-full md:w-auto px-10 py-5 bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-bold rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/10">
              <Play size={18} fill="currentColor" />
              Start Lesson
            </button>
          </div>
        </div>

        {/* Small Module 1 */}
        <div className="md:col-span-4 bg-surface-container-highest/40 p-8 rounded-[3rem] flex flex-col justify-between border border-outline-variant/10 glass-effect">
          <div>
            <div className="mb-6 w-14 h-14 rounded-2xl bg-error-container/20 flex items-center justify-center">
              <BookOpen className="text-error" size={24} />
            </div>
            <h3 className="text-2xl font-bold font-headline text-on-surface mb-3 tracking-tight">Urgency Tactics</h3>
            <p className="text-sm text-on-primary-container leading-relaxed opacity-70">Deconstructing psychological triggers used to bypass critical thinking during attacks.</p>
          </div>
          <div className="mt-10 pt-8 border-t border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-bold text-on-primary-container uppercase tracking-widest">Locked</span>
              <Lock className="text-on-primary-container/40" size={16} />
            </div>
            <button className="w-full py-4 bg-surface-container-low text-on-primary-container/40 font-bold rounded-2xl cursor-not-allowed border border-outline-variant/5">
              Resume Module
            </button>
          </div>
        </div>

        {/* Small Module 2 */}
        <div className="md:col-span-4 bg-surface-container-high/60 p-8 rounded-[3rem] flex flex-col justify-between border border-outline-variant/10">
          <div>
            <div className="mb-6 w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center">
              <BookOpen className="text-primary" size={24} />
            </div>
            <h3 className="text-2xl font-bold font-headline text-on-surface mb-3 tracking-tight">Link Masking</h3>
            <p className="text-sm text-on-primary-container leading-relaxed opacity-70">Revealing hidden destinations and shortening service vulnerabilities.</p>
          </div>
          <div className="mt-10 space-y-6">
            <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[12%] rounded-full"></div>
            </div>
            <button className="w-full py-4 bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-bold rounded-2xl active:scale-95 transition-all">
              Start Lesson
            </button>
          </div>
        </div>

        {/* Medium Module */}
        <div className="md:col-span-8 bg-surface-container-low p-8 rounded-[3rem] flex flex-col md:flex-row gap-10 items-center border border-outline-variant/5">
          <div className="w-full md:w-2/5 aspect-video md:aspect-square bg-surface-container-lowest rounded-[2rem] overflow-hidden border border-outline-variant/10 group">
            <img 
              className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" 
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400&auto=format&fit=crop"
              alt="Server Hardware"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold text-error uppercase tracking-widest bg-error-container/20 px-3 py-1 rounded-lg border border-error/10">
                Advanced
              </span>
            </div>
            <h3 className="text-3xl font-bold font-headline text-on-surface mb-4 tracking-tight">Credential Harvesting</h3>
            <p className="text-base text-on-primary-container mb-8 leading-relaxed opacity-80">Deep dive into fake login portals and how data is exfiltrated in milliseconds.</p>
            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-surface-container-highest text-on-surface font-bold rounded-2xl hover:bg-surface-container-high transition-colors active:scale-95 border border-outline-variant/10">
                <Info size={18} />
              </button>
              <button className="flex-1 py-4 bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-bold rounded-2xl active:scale-95 transition-all shadow-lg shadow-primary/5">
                Start Lesson
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Indicator */}
      <section className="mt-12 py-16 flex flex-col items-center relative overflow-hidden rounded-[3rem]">
        <div className="absolute inset-0 bg-secondary/5 blur-[80px] rounded-full"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.4em] mb-6">Neural Learning Sync</span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface tracking-tighter leading-tight">
            8 New Threat Models<br/>Analyzed Today
          </h2>
        </div>
      </section>
    </motion.div>
  );
};
