import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Globe, Mail, Link2Off, ShieldAlert, Filter, CheckCircle2, BrainCircuit, Sparkles, Bot } from 'lucide-react';

interface Threat {
  id: string;
  source: string;
  type: string;
  category: 'Phishing' | 'Malware' | 'Spoofing' | 'Social' | 'Other';
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  timestamp: string;
  aiAnalysis: {
    summary: string;
    detailedSummary: string;
    confidence: number;
    recommendation: string;
    technicalDetails: { label: string; description: string }[];
    detectionMethod: string;
    impactScore: number;
    affectedAssets: string[];
    mitreTechnique: string;
    mitreTactic: string;
  };
  status?: 'active' | 'reviewed';
}

const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-surface-container-highest text-[9px] leading-tight font-medium rounded-lg border border-outline-variant/20 shadow-xl backdrop-blur-md pointer-events-none"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-surface-container-highest" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const INITIAL_THREATS: Threat[] = [
  { 
    id: '1', 
    source: 'paypal-security-update.io', 
    type: 'Credential Harvesting', 
    category: 'Phishing',
    risk: 'Critical', 
    timestamp: 'Just now',
    aiAnalysis: {
      summary: 'Detected unusual email headers, potential spoofing detected.',
      detailedSummary: 'The AI detected a combination of SPF/DKIM failures and a look-alike domain that mimics PayPal\'s official security portal. The payload is designed to capture login credentials via a hidden tracking pixel and a malicious iframe.',
      confidence: 98,
      recommendation: 'Block domain and initiate password reset for targeted users.',
      technicalDetails: [
        { label: 'SPF/DKIM failure', description: 'The email failed sender policy framework and domain keys identified mail verification, indicating the sender is unauthorized.' },
        { label: 'Look-alike domain', description: 'The domain uses homoglyphs or slight misspellings to appear legitimate to the end user.' },
        { label: 'Hidden tracking pixel', description: 'A 1x1 transparent image used to track if and when the user opens the email.' }
      ],
      detectionMethod: 'Heuristic Header Analysis',
      impactScore: 9.2,
      affectedAssets: ['User Credentials', 'Email Infrastructure'],
      mitreTechnique: 'T1566.001 (Phishing: Spearphishing Attachment)',
      mitreTactic: 'Initial Access'
    },
    status: 'active'
  },
  { 
    id: '2', 
    source: '192.168.45.12', 
    type: 'IP Spoofing', 
    category: 'Spoofing',
    risk: 'High', 
    timestamp: '2m ago',
    aiAnalysis: {
      summary: 'Source IP matches known malicious botnet signature.',
      detailedSummary: 'This IP address has been identified as a known Command & Control (C2) node for the Mirai botnet. It is currently attempting to establish unauthorized connections to internal database services.',
      confidence: 92,
      recommendation: 'Blacklist IP at firewall level and monitor egress traffic.',
      technicalDetails: [
        { label: 'Known C2 node', description: 'This IP is listed in global threat intelligence feeds as a command and control server for botnets.' },
        { label: 'Rapid connection attempts', description: 'The source is initiating more than 100 connection requests per second, typical of a brute-force or DDoS attack.' },
        { label: 'Non-standard port usage', description: 'Traffic is being directed to ports not normally used by the targeted services, suggesting a port scan.' }
      ],
      detectionMethod: 'Threat Intel Correlation',
      impactScore: 7.8,
      affectedAssets: ['Network Perimeter', 'Internal Services'],
      mitreTechnique: 'T1071.001 (C2: Web Protocols)',
      mitreTactic: 'Command and Control'
    },
    status: 'active'
  },
  { 
    id: '3', 
    source: 'hr-portal-login.net', 
    type: 'Spear Phishing', 
    category: 'Phishing',
    risk: 'Critical', 
    timestamp: '5m ago',
    aiAnalysis: {
      summary: 'High-confidence match for targeted corporate impersonation.',
      detailedSummary: 'The attack uses Natural Language Processing to identify that the email content specifically targets HR executives with highly personalized information, likely gathered from public social media profiles.',
      confidence: 96,
      recommendation: 'Quarantine all emails from this sender and alert HR department.',
      technicalDetails: [
        { label: 'Targeted executive names', description: 'The email correctly identifies and addresses high-level executives by their full names and titles.' },
        { label: 'Malicious attachment', description: 'The attached PDF contains an embedded macro that attempts to download a secondary payload upon opening.' },
        { label: 'Zero-day URL', description: 'The link in the email points to a domain that was registered less than 1 hour ago and has no prior reputation.' }
      ],
      detectionMethod: 'NLP Sentiment & Entity Extraction',
      impactScore: 8.9,
      affectedAssets: ['HR Database', 'Employee PII'],
      mitreTechnique: 'T1566.002 (Phishing: Spearphishing Link)',
      mitreTactic: 'Initial Access'
    },
    status: 'active'
  },
  { 
    id: '4', 
    source: 'invoice-scan-2024.exe', 
    type: 'Malware Distribution', 
    category: 'Malware',
    risk: 'High', 
    timestamp: '12m ago',
    aiAnalysis: {
      summary: 'Binary heuristics indicate embedded ransomware payload.',
      detailedSummary: 'Static analysis of the executable reveals code patterns consistent with the LockBit ransomware family, including routines for shadow copy deletion and file encryption using AES-256.',
      confidence: 89,
      recommendation: 'Isolate infected endpoint and perform full system scan.',
      technicalDetails: [
        { label: 'Encrypted payload', description: 'The executable contains a large block of high-entropy data, indicating an encrypted or packed malicious payload.' },
        { label: 'Registry modification attempt', description: 'The process attempted to modify system registry keys to ensure persistence across reboots.' },
        { label: 'Shadow copy deletion', description: 'The malware attempted to use vssadmin.exe to delete volume shadow copies, preventing easy data recovery.' }
      ],
      detectionMethod: 'Sandbox Behavioral Analysis',
      impactScore: 8.5,
      affectedAssets: ['Endpoint Filesystem', 'Backup Repositories'],
      mitreTechnique: 'T1486 (Data Encrypted for Impact)',
      mitreTactic: 'Impact'
    },
    status: 'active'
  },
];

const MOCK_SOURCES = [
  'apple-id-verify.security-cloud.net',
  'netflix-billing-update.com',
  '172.16.254.1',
  'fedex-package-tracking.info',
  'dhl-delivery-alert.biz',
  'bank-of-america-login.secure-web.com',
  'google-account-recovery.support-desk.io',
  'zoom-meeting-invite.web-conference.net'
];

const MOCK_TYPES = [
  'Credential Harvesting',
  'IP Spoofing',
  'Spear Phishing',
  'Malware Distribution',
  'Social Engineering',
  'Brand Impersonation',
  'Business Email Compromise'
];

const MOCK_ANALYSIS = [
  'Detected unusual email headers, potential spoofing detected.',
  'Source IP matches known malicious botnet signature.',
  'High-confidence match for targeted corporate impersonation.',
  'Binary heuristics indicate embedded ransomware payload.',
  'Domain age < 24h, common pattern for temporary phishing sites.',
  'Visual similarity engine detected logo misuse.',
  'Active listener detected on port 443 with self-signed cert.',
  'Urgency tactics detected in NLP analysis of email body.'
];

const MOCK_RECOMMENDATIONS = [
  'Block domain and initiate password reset for targeted users.',
  'Blacklist IP at firewall level and monitor egress traffic.',
  'Quarantine all emails from this sender and alert HR department.',
  'Isolate infected endpoint and perform full system scan.',
  'Enable multi-factor authentication for all administrative accounts.',
  'Update web application firewall rules to block similar patterns.',
  'Conduct immediate security awareness training for affected team.',
  'Revoke active sessions and force re-authentication across domain.'
];

const MOCK_DETAILS = [
  [
    { label: 'SPF/DKIM failure', description: 'The email failed sender policy framework and domain keys identified mail verification.' },
    { label: 'Look-alike domain', description: 'The domain uses homoglyphs or slight misspellings to appear legitimate.' },
    { label: 'Hidden tracking pixel', description: 'A 1x1 transparent image used to track if the user opens the email.' }
  ],
  [
    { label: 'Known C2 node', description: 'This IP is listed in global threat intelligence feeds as a command and control server.' },
    { label: 'Rapid connection attempts', description: 'The source is initiating more than 100 connection requests per second.' },
    { label: 'Non-standard port usage', description: 'Traffic is being directed to ports not normally used by the targeted services.' }
  ],
  [
    { label: 'Targeted executive names', description: 'The email correctly identifies and addresses high-level executives.' },
    { label: 'Malicious attachment', description: 'The attached PDF contains an embedded macro that attempts to download a payload.' },
    { label: 'Zero-day URL', description: 'The link in the email points to a domain that was registered less than 1 hour ago.' }
  ],
  [
    { label: 'Encrypted payload', description: 'The executable contains a large block of high-entropy data.' },
    { label: 'Registry modification attempt', description: 'The process attempted to modify system registry keys for persistence.' },
    { label: 'Shadow copy deletion', description: 'The malware attempted to delete volume shadow copies to prevent recovery.' }
  ],
  [
    { label: 'Domain age < 24h', description: 'The domain was registered within the last 24 hours, a common indicator of a temporary phishing site.' },
    { label: 'No SSL certificate', description: 'The site is served over unencrypted HTTP, making it easier to intercept data.' },
    { label: 'IP-based hosting', description: 'The site is accessed directly via IP address rather than a domain name.' }
  ],
  [
    { label: 'Visual similarity match', description: 'The site\'s visual layout matches a known legitimate brand with high precision.' },
    { label: 'OCR detected brand keywords', description: 'Optical Character Recognition found brand names inside images to bypass text filters.' },
    { label: 'Stolen CSS assets', description: 'The site is directly loading CSS and image assets from the official brand website.' }
  ],
  [
    { label: 'Active listener detected', description: 'A network scan found an active service listening on a non-standard port.' },
    { label: 'Self-signed certificate', description: 'The service is using a certificate not signed by a trusted authority.' },
    { label: 'Port scanning behavior', description: 'The source is systematically checking multiple ports for vulnerabilities.' }
  ],
  [
    { label: 'NLP urgency detected', description: 'Natural Language Processing identified high-pressure or threatening language.' },
    { label: 'Sender mismatch', description: 'The "From" address does not match the "Reply-To" or the actual envelope sender.' },
    { label: 'Reply-to redirection', description: 'Replies are directed to a different domain than the sender\'s domain.' }
  ]
];

const MOCK_DETAILED_ANALYSIS = [
  'The AI detected a combination of SPF/DKIM failures and a look-alike domain that mimics official portals. The payload is designed to capture login credentials via a hidden tracking pixel and a malicious iframe.',
  'This IP address has been identified as a known Command & Control (C2) node for active botnets. It is currently attempting to establish unauthorized connections to internal database services.',
  'The attack uses Natural Language Processing to identify that the email content specifically targets executives with highly personalized information gathered from public profiles.',
  'Static analysis of the executable reveals code patterns consistent with ransomware families, including routines for shadow copy deletion and file encryption using AES-256.',
  'Deep packet inspection reveals anomalous traffic patterns consistent with data exfiltration attempts over non-standard encrypted channels.',
  'The visual similarity engine detected a 99% match with a major banking portal, despite the domain having no prior history or trusted reputation.',
  'Behavioral analysis in the sandbox environment showed the process attempting to disable local security software and establish persistence via scheduled tasks.',
  'The email body contains high-urgency keywords and psychological triggers designed to bypass the user\'s critical thinking and force immediate action.'
];

const MOCK_DETECTION_METHODS = [
  'Heuristic Header Analysis',
  'Threat Intel Correlation',
  'NLP Sentiment & Entity Extraction',
  'Sandbox Behavioral Analysis',
  'Visual Similarity Engine',
  'Network Traffic Profiling',
  'Machine Learning Anomaly Detection',
  'Honeypot Interaction Analysis'
];

const MOCK_ASSETS = [
  ['User Credentials', 'Email Infrastructure'],
  ['Network Perimeter', 'Internal Services'],
  ['HR Database', 'Employee PII'],
  ['Endpoint Filesystem', 'Backup Repositories'],
  ['Cloud Storage', 'API Gateways'],
  ['Active Directory', 'Domain Controller'],
  ['Customer Data', 'Payment Gateway'],
  ['Source Code', 'CI/CD Pipeline']
];

const MOCK_MITRE = [
  { technique: 'T1566.001 (Spearphishing Attachment)', tactic: 'Initial Access' },
  { technique: 'T1071.001 (Web Protocols)', tactic: 'Command and Control' },
  { technique: 'T1566.002 (Spearphishing Link)', tactic: 'Initial Access' },
  { technique: 'T1486 (Data Encrypted for Impact)', tactic: 'Impact' },
  { technique: 'T1583.001 (Domains)', tactic: 'Resource Development' },
  { technique: 'T1059.001 (PowerShell)', tactic: 'Execution' },
  { technique: 'T1078 (Valid Accounts)', tactic: 'Persistence' },
  { technique: 'T1133 (External Remote Services)', tactic: 'Persistence' }
];

const categoryColors = {
  Phishing: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  Malware: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Spoofing: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  Social: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  Other: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
};

const riskStyles = {
  Critical: {
    text: 'text-[11px] font-black text-error drop-shadow-[0_0_8px_rgba(255,180,171,0.4)]',
    bar: 'h-3 bg-error shadow-[0_0_10px_rgba(255,180,171,0.6)]',
    container: 'w-20 h-3 bg-error/20 rounded-full',
    width: '100%'
  },
  High: {
    text: 'text-[10px] font-extrabold text-error/90',
    bar: 'h-2 bg-error/80',
    container: 'w-16 h-2 bg-error/10 rounded-full',
    width: '75%'
  },
  Medium: {
    text: 'text-[9px] font-bold text-primary',
    bar: 'h-1 bg-primary',
    container: 'w-12 h-1 bg-primary/10 rounded-full',
    width: '50%'
  },
  Low: {
    text: 'text-[8px] font-semibold text-secondary/70',
    bar: 'h-0.5 bg-secondary/60',
    container: 'w-10 h-0.5 bg-secondary/10 rounded-full',
    width: '25%'
  },
};

const riskColors = {
  Critical: 'text-error border-error/30 bg-error/10 shadow-[inset_0_0_20px_rgba(255,180,171,0.05)]',
  High: 'text-error/80 border-error/20 bg-error/5',
  Medium: 'text-primary border-primary/20 bg-primary/5',
  Low: 'text-secondary border-secondary/20 bg-secondary/5',
};

type FilterType = 'All' | 'Critical' | 'High' | 'Medium' | 'Low';

interface ThreatFeedProps {
  isLinked?: boolean;
}

import { db, collection, onSnapshot, query, orderBy, limit, updateDoc, doc, addDoc } from '../firebase';
import { useAuth } from '../context/AuthContext';

export const ThreatFeed: React.FC<ThreatFeedProps> = ({ isLinked = false }) => {
  const [threats, setThreats] = React.useState<Threat[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [confirmReviewId, setConfirmReviewId] = useState<string | null>(null);
  const { user } = useAuth();

  // Sync with Firestore
  React.useEffect(() => {
    const q = query(
      collection(db, 'threats'),
      orderBy('timestamp', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedThreats = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Threat[];
      setThreats(updatedThreats);
    }, (error) => {
      console.error("Firestore error in ThreatFeed:", error);
    });

    return () => unsubscribe();
  }, []);

  // Simulate real-time updates (only if linked and for demo purposes, but now saving to Firestore)
  React.useEffect(() => {
    if (!isLinked) return;

    const interval = setInterval(async () => {
      const shouldGenerate = Math.random() > 0.4;
      if (!shouldGenerate) return;

      const type = MOCK_TYPES.filter(t => t.includes('Email') || t.includes('Phishing') || t.includes('Spear'))[Math.floor(Math.random() * 3)];
      
      const getCategory = (t: string): Threat['category'] => {
        if (t.includes('Phishing') || t.includes('Harvesting') || t.includes('Impersonation')) return 'Phishing';
        if (t.includes('Malware')) return 'Malware';
        if (t.includes('Spoofing')) return 'Spoofing';
        if (t.includes('Social') || t.includes('Compromise')) return 'Social';
        return 'Other';
      };

      const mitreData = MOCK_MITRE[Math.floor(Math.random() * MOCK_MITRE.length)];
      const newThreatData = {
        source: `[SYNC] ${MOCK_SOURCES[Math.floor(Math.random() * MOCK_SOURCES.length)]}`,
        type: type,
        category: getCategory(type),
        risk: (['Critical', 'High', 'Medium', 'Low'] as const)[Math.floor(Math.random() * 4)],
        timestamp: new Date().toISOString(),
        aiAnalysis: {
          summary: MOCK_ANALYSIS[Math.floor(Math.random() * MOCK_ANALYSIS.length)],
          detailedSummary: MOCK_DETAILED_ANALYSIS[Math.floor(Math.random() * MOCK_DETAILED_ANALYSIS.length)],
          confidence: Math.floor(Math.random() * 20) + 80,
          recommendation: MOCK_RECOMMENDATIONS[Math.floor(Math.random() * MOCK_RECOMMENDATIONS.length)],
          technicalDetails: MOCK_DETAILS[Math.floor(Math.random() * MOCK_DETAILS.length)],
          detectionMethod: MOCK_DETECTION_METHODS[Math.floor(Math.random() * MOCK_DETECTION_METHODS.length)],
          impactScore: parseFloat((Math.random() * 5 + 5).toFixed(1)),
          affectedAssets: MOCK_ASSETS[Math.floor(Math.random() * MOCK_ASSETS.length)],
          mitreTechnique: mitreData.technique,
          mitreTactic: mitreData.tactic
        },
        status: 'active',
        createdBy: 'system'
      };

      try {
        await addDoc(collection(db, 'threats'), newThreatData);
      } catch (error) {
        console.error("Failed to add simulated threat:", error);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isLinked]);

  const handleReview = async (id: string) => {
    try {
      const threatRef = doc(db, 'threats', id);
      await updateDoc(threatRef, { status: 'reviewed' });
      setConfirmReviewId(null);
    } catch (error) {
      console.error("Failed to update threat status:", error);
    }
  };

  const filteredThreats = useMemo(() => {
    let list = activeFilter === 'All' 
      ? threats 
      : threats.filter(t => t.risk === activeFilter);
    
    return [...list].sort((a, b) => {
      const priority = { Critical: 0, High: 1, Medium: 2, Low: 3 };
      return priority[a.risk] - priority[b.risk];
    });
  }, [activeFilter, threats]);

  // Double the list for seamless infinite scroll if it's long enough
  const displayThreats = filteredThreats.length > 3 ? [...filteredThreats, ...filteredThreats] : filteredThreats;

  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <div className={`absolute w-3 h-3 rounded-full animate-ping opacity-75 ${isLinked ? 'bg-emerald-500' : 'bg-error'}`}></div>
            <div className={`relative w-2 h-2 rounded-full ${isLinked ? 'bg-emerald-500' : 'bg-error'}`}></div>
          </div>
          <h3 className="text-[10px] font-bold text-on-surface uppercase tracking-[0.3em]">
            {isLinked ? 'Real-time Bot Protection Active' : 'Live Threat Feed'}
          </h3>
        </div>
        
        {isLinked && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <Bot size={12} className="text-emerald-500" />
            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">Synchronized with Inbox</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <div className="flex items-center gap-1 mr-2 text-[10px] font-bold text-on-primary-container uppercase tracking-widest">
            <Filter size={12} />
            <span>Filter:</span>
          </div>
          {(['All', 'Critical', 'High', 'Medium', 'Low'] as FilterType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all border ${
                activeFilter === filter 
                  ? 'bg-secondary text-on-secondary border-secondary shadow-lg shadow-secondary/20' 
                  : 'bg-surface-container-highest/30 text-on-primary-container border-outline-variant/10 hover:border-secondary/30'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface-container-lowest/50 rounded-[2.5rem] border border-outline-variant/10 overflow-hidden relative group">
        {/* Visual Scan Line Effect */}
        <motion.div 
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-secondary/20 blur-[2px] z-20 pointer-events-none"
        />
        
        <div className="h-[320px] overflow-hidden relative">
          {/* Scrolling Container */}
          <motion.div 
            key={activeFilter} // Reset animation when filter changes
            animate={displayThreats.length > 3 ? { y: [0, -filteredThreats.length * 104] } : { y: 0 }}
            transition={{ 
              duration: filteredThreats.length * 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="p-6 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {displayThreats.map((threat, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: threat.status === 'reviewed' ? 0.3 : 1, 
                    x: 0,
                    filter: threat.status === 'reviewed' ? 'grayscale(1)' : 'grayscale(0)'
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={`${threat.id}-${i}-${activeFilter}`}
                  className={`p-4 rounded-2xl border ${riskColors[threat.risk]} flex flex-col gap-3 backdrop-blur-md transition-all hover:bg-surface-container-highest/20 relative group/card`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-highest/50 flex items-center justify-center border border-outline-variant/10">
                        {threat.type.includes('URL') || threat.type.includes('Harvesting') ? <Link2Off size={18} /> : 
                         threat.type.includes('Email') || threat.type.includes('Phishing') ? <Mail size={18} /> : 
                         <ShieldAlert size={18} />}
                      </div>
                      <div className={threat.status === 'reviewed' ? 'line-through opacity-50' : ''}>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-headline truncate max-w-[140px] md:max-w-none">{threat.source}</span>
                          <span className="text-[8px] font-bold uppercase tracking-tighter opacity-50">{threat.timestamp}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold uppercase tracking-widest border ${categoryColors[threat.category]}`}>
                            {threat.category}
                          </span>
                          <div className="flex items-center gap-1 ml-1" title={`AI Confidence: ${threat.aiAnalysis.confidence}%`}>
                            <BrainCircuit size={10} className="text-secondary opacity-70" />
                            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                              threat.aiAnalysis.confidence >= 95 ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 
                              threat.aiAnalysis.confidence >= 90 ? 'bg-secondary shadow-[0_0_5px_rgba(var(--secondary),0.5)]' : 
                              'bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]'
                            }`} />
                          </div>
                        </div>
                        <p className="text-[10px] opacity-70 font-medium">{threat.type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {threat.status !== 'reviewed' && (
                        <button 
                          onClick={() => setConfirmReviewId(threat.id)}
                          className="opacity-0 group-hover/card:opacity-100 transition-opacity p-2 rounded-lg bg-surface-container-highest/50 hover:bg-secondary/20 hover:text-secondary border border-outline-variant/10"
                          title="Mark as Reviewed"
                        >
                          <CheckCircle2 size={14} />
                        </button>
                      )}
                      
                      <div className="flex flex-col items-end shrink-0">
                        {(() => {
                          const severityScore = Math.round((threat.aiAnalysis.impactScore * 10 + threat.aiAnalysis.confidence) / 2);
                          return (
                            <>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[7px] font-black uppercase tracking-widest opacity-40">AI Severity</span>
                                <Tooltip content={`Impact: ${threat.aiAnalysis.impactScore}/10 | Confidence: ${threat.aiAnalysis.confidence}%`}>
                                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border transition-all ${
                                    severityScore >= 90 ? 'text-error border-error/40 bg-error/10 drop-shadow-[0_0_5px_rgba(255,180,171,0.2)]' :
                                    severityScore >= 75 ? 'text-amber-500 border-amber-500/40 bg-amber-500/10' :
                                    severityScore >= 50 ? 'text-secondary border-secondary/40 bg-secondary/10' :
                                    'text-emerald-500 border-emerald-500/40 bg-emerald-500/10'
                                  }`}>
                                    {severityScore}
                                  </span>
                                </Tooltip>
                              </div>
                              <span className={`uppercase tracking-widest transition-all ${riskStyles[threat.risk].text}`}>
                                {threat.risk}
                              </span>
                              <div className="w-24 h-1.5 bg-surface-container-highest/30 rounded-full mt-1 overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${severityScore}%` }}
                                  className={`h-full transition-all ${
                                    severityScore >= 90 ? 'bg-error shadow-[0_0_8px_rgba(255,180,171,0.6)]' :
                                    severityScore >= 75 ? 'bg-amber-500' :
                                    severityScore >= 50 ? 'bg-secondary' :
                                    'bg-emerald-500'
                                  }`}
                                />
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`pl-14 ${threat.status === 'reviewed' ? 'opacity-30' : ''}`}>
                    <div className="bg-surface-container-highest/30 rounded-xl p-3 border border-outline-variant/5 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex items-center gap-1.5">
                              <Sparkles size={12} className="text-secondary" />
                              <span className="font-bold uppercase tracking-tighter text-[10px] text-secondary">AI Summary</span>
                            </div>
                            <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm flex items-center gap-1 ${
                              threat.aiAnalysis.confidence >= 95 ? 'bg-emerald-500 text-white' : 
                              threat.aiAnalysis.confidence >= 90 ? 'bg-secondary text-on-secondary' : 
                              'bg-amber-500 text-white'
                            }`}>
                              <div className={`w-1 h-1 rounded-full bg-white ${threat.aiAnalysis.confidence >= 95 ? 'animate-ping' : ''}`} />
                              {threat.aiAnalysis.confidence}% Confidence
                            </span>
                          </div>
                          <Tooltip content={threat.aiAnalysis.detailedSummary}>
                            <p className="text-[10px] leading-relaxed italic opacity-90 cursor-help underline decoration-dotted decoration-outline-variant/30 underline-offset-2">
                              {threat.aiAnalysis.summary}
                            </p>
                          </Tooltip>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-outline-variant/5">
                        <div>
                          <span className="text-[8px] font-bold uppercase tracking-widest opacity-50 block mb-1">Technical Indicators</span>
                          <div className="flex flex-wrap gap-1">
                            {threat.aiAnalysis.technicalDetails.map((detail, idx) => (
                              <div key={idx}>
                                <Tooltip content={detail.description}>
                                  <span className="px-1.5 py-0.5 rounded bg-surface-container-highest/50 text-[7px] font-medium border border-outline-variant/5 cursor-help hover:bg-surface-container-highest transition-colors">
                                    {detail.label}
                                  </span>
                                </Tooltip>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[8px] font-bold uppercase tracking-widest opacity-50 block mb-1 text-secondary">Recommendation</span>
                          <p className="text-[9px] leading-tight font-medium opacity-80">{threat.aiAnalysis.recommendation}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-outline-variant/5">
                        <div>
                          <span className="text-[8px] font-bold uppercase tracking-widest opacity-50 block mb-1">Detection Method</span>
                          <p className="text-[9px] font-medium opacity-80">{threat.aiAnalysis.detectionMethod}</p>
                        </div>
                        <div>
                          <span className="text-[8px] font-bold uppercase tracking-widest opacity-50 block mb-1">Estimated Impact</span>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-surface-container-highest/50 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(threat.aiAnalysis.impactScore / 10) * 100}%` }}
                                className={`h-full ${threat.aiAnalysis.impactScore > 8 ? 'bg-error' : threat.aiAnalysis.impactScore > 6 ? 'bg-amber-500' : 'bg-secondary'}`}
                              />
                            </div>
                            <span className="text-[10px] font-black opacity-80">{threat.aiAnalysis.impactScore}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-outline-variant/5">
                        <div>
                          <span className="text-[8px] font-bold uppercase tracking-widest opacity-50 block mb-1">Affected Assets</span>
                          <div className="flex flex-wrap gap-1">
                            {threat.aiAnalysis.affectedAssets.map((asset, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-surface-container-highest/50 text-[7px] font-medium border border-outline-variant/5 text-secondary">
                                {asset}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[8px] font-bold uppercase tracking-widest opacity-50 block mb-1">MITRE ATT&CK Technique</span>
                          <div className="flex flex-col gap-1">
                            <span className="text-[7px] font-black text-secondary uppercase tracking-tighter opacity-70">
                              Tactic: {threat.aiAnalysis.mitreTactic}
                            </span>
                            <a 
                              href={`https://attack.mitre.org/techniques/${threat.aiAnalysis.mitreTechnique.split(' ')[0].replace('.', '/')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[9px] font-bold text-secondary hover:underline flex items-center gap-1 group/mitre"
                            >
                              <Globe size={10} className="opacity-70 group-hover/mitre:opacity-100" />
                              <span className="truncate" title={threat.aiAnalysis.mitreTechnique}>
                                {threat.aiAnalysis.mitreTechnique}
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredThreats.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-on-primary-container opacity-50 py-20">
                <ShieldAlert size={48} className="mb-4 opacity-20" />
                <p className="text-xs font-bold uppercase tracking-widest">No threats detected in this category</p>
              </div>
            )}
          </motion.div>
          
          {/* Gradient Overlays for smooth fade */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-surface-container-lowest to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-container-lowest to-transparent pointer-events-none z-10"></div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {confirmReviewId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-surface-container-low border border-outline-variant/20 rounded-[2rem] p-8 max-w-sm w-full shadow-2xl"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-2">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-bold font-headline">Mark as Reviewed?</h4>
                <p className="text-sm text-on-primary-container opacity-70">
                  This threat will be archived and removed from your active feed.
                </p>
                <div className="grid grid-cols-2 gap-3 w-full mt-4">
                  <button
                    onClick={() => setConfirmReviewId(null)}
                    className="px-6 py-3 rounded-2xl bg-surface-container-highest text-on-surface font-bold text-sm hover:bg-surface-container-high transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReview(confirmReviewId)}
                    className="px-6 py-3 rounded-2xl bg-secondary text-on-secondary font-bold text-sm shadow-lg shadow-secondary/20 active:scale-95 transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
