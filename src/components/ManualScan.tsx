import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Mail, Globe, Sparkles, Loader2, ShieldAlert, CheckCircle2, ArrowRight, Copy, Share2 } from 'lucide-react';
import { analyzeContent, generateResponse, ScanResult } from '../services/geminiService';

export const ManualScan: React.FC = () => {
  const [input, setInput] = useState('');
  const [type, setType] = useState<'url' | 'email'>('url');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [generatedEmail, setGeneratedEmail] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleScan = async () => {
    if (!input.trim()) return;
    setIsScanning(true);
    setResult(null);
    setGeneratedEmail(null);
    try {
      const analysis = await analyzeContent(input, type);
      setResult(analysis);
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleGenerateEmail = async () => {
    if (!result) return;
    setIsGenerating(true);
    try {
      const email = await generateResponse(result.summary, result.recommendation);
      setGeneratedEmail(email);
    } catch (error) {
      console.error('Email generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="bg-surface-container-low rounded-[2.5rem] p-8 border border-outline-variant/5">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="font-headline text-xs font-bold tracking-[0.4em] uppercase text-on-primary-container">AI Manual Scan</h3>
          <p className="text-[10px] text-on-primary-container opacity-50 uppercase tracking-widest font-bold">Powered by Gemini 3.1 Flash</p>
        </div>
        <div className="h-[1px] flex-1 bg-outline-variant/10 ml-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="flex gap-2 p-1 bg-surface-container-highest/30 rounded-2xl w-fit">
            <button
              onClick={() => setType('url')}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                type === 'url' ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/20' : 'text-on-primary-container opacity-50 hover:opacity-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Globe size={14} />
                URL Scan
              </div>
            </button>
            <button
              onClick={() => setType('email')}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                type === 'email' ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/20' : 'text-on-primary-container opacity-50 hover:opacity-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Mail size={14} />
                Email NLP
              </div>
            </button>
          </div>

          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={type === 'url' ? 'Paste suspicious URL here...' : 'Paste suspicious email body here...'}
              className="w-full h-48 bg-surface-container-highest/20 border border-outline-variant/10 rounded-3xl p-6 text-sm font-medium focus:outline-none focus:border-secondary/50 transition-all resize-none placeholder:opacity-30"
            />
            <button
              onClick={handleScan}
              disabled={isScanning || !input.trim()}
              className="absolute bottom-4 right-4 px-6 py-3 bg-secondary text-on-secondary rounded-2xl font-bold text-xs shadow-xl shadow-secondary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
            >
              {isScanning ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search size={16} />
                  Initiate Scan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {!result && !isScanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-outline-variant/10 rounded-[2rem]"
              >
                <div className="w-16 h-16 rounded-full bg-surface-container-highest/50 flex items-center justify-center text-on-primary-container opacity-20 mb-4">
                  <ShieldAlert size={32} />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-30">Waiting for input analysis</p>
              </motion.div>
            )}

            {isScanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border-4 border-secondary/10 border-t-secondary animate-spin" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary animate-pulse" size={24} />
                </div>
                <h4 className="font-headline text-lg font-bold mb-2">Gemini is Thinking</h4>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Performing deep heuristic analysis...</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      result.risk === 'Critical' ? 'bg-error text-white' :
                      result.risk === 'High' ? 'bg-error/20 text-error' :
                      result.risk === 'Medium' ? 'bg-amber-500/20 text-amber-500' :
                      'bg-emerald-500/20 text-emerald-500'
                    }`}>
                      {result.risk} Risk
                    </span>
                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{result.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-secondary">{result.confidence}% Confidence</span>
                    <div className="w-12 h-1.5 bg-secondary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary" style={{ width: `${result.confidence}%` }} />
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-highest/20 rounded-3xl p-6 border border-outline-variant/10">
                  <h4 className="font-headline text-sm font-bold mb-2">{result.summary}</h4>
                  <p className="text-xs leading-relaxed opacity-70">{result.detailedSummary}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-highest/20 rounded-2xl p-4 border border-outline-variant/10">
                    <span className="text-[8px] font-bold uppercase tracking-widest opacity-50 block mb-2">Impact Score</span>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-headline font-black">{result.impactScore}</span>
                      <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className={`h-full ${result.impactScore > 8 ? 'bg-error' : 'bg-secondary'}`} style={{ width: `${result.impactScore * 10}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-highest/20 rounded-2xl p-4 border border-outline-variant/10">
                    <span className="text-[8px] font-bold uppercase tracking-widest opacity-50 block mb-2">MITRE Technique</span>
                    <span className="text-[10px] font-bold text-secondary">{result.mitreTechnique}</span>
                    <p className="text-[8px] opacity-50 uppercase font-bold mt-1">{result.mitreTactic}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleGenerateEmail}
                    disabled={isGenerating}
                    className="flex-1 px-6 py-3 bg-surface-container-highest text-on-surface rounded-2xl font-bold text-xs hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
                  >
                    {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />}
                    Generate Alert Response
                  </button>
                </div>

                {generatedEmail && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-secondary/5 border border-secondary/20 rounded-3xl p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-secondary uppercase tracking-widest">AI Response Draft</span>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-secondary/10 rounded-lg text-secondary transition-colors" title="Copy to Clipboard">
                          <Copy size={14} />
                        </button>
                        <button className="p-2 hover:bg-secondary/10 rounded-lg text-secondary transition-colors" title="Share">
                          <Share2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] leading-relaxed font-medium opacity-80 whitespace-pre-wrap">
                      {generatedEmail}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
