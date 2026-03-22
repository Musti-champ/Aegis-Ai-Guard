import React, { useEffect, useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend, AreaChart, Area
} from 'recharts';
import { db, collection, onSnapshot, query, orderBy, limit } from '../firebase';
import { motion } from 'motion/react';
import { TrendingUp, Shield, AlertTriangle, Activity } from 'lucide-react';

interface ThreatData {
  timestamp: string;
  category: string;
  risk: string;
}

export const ThreatAnalytics: React.FC = () => {
  const [threats, setThreats] = useState<ThreatData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'threats'),
      orderBy('timestamp', 'asc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        timestamp: doc.data().timestamp,
        category: doc.data().category,
        risk: doc.data().risk
      })) as ThreatData[];
      setThreats(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Process data for Timeline
  const timelineData = useMemo(() => {
    const counts: { [key: string]: number } = {};
    threats.forEach(t => {
      const date = new Date(t.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' });
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [threats]);

  // Process data for Categories
  const categoryData = useMemo(() => {
    const counts: { [key: string]: number } = {};
    threats.forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [threats]);

  // Process data for Risk
  const riskData = useMemo(() => {
    const counts: { [key: string]: number } = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    threats.forEach(t => {
      if (counts[t.risk] !== undefined) {
        counts[t.risk]++;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [threats]);

  const COLORS = ['#F27D26', '#FF4444', '#4CAF50', '#2196F3', '#9C27B0'];
  const RISK_COLORS: { [key: string]: string } = {
    Critical: '#FF4444',
    High: '#FF8800',
    Medium: '#FFBB33',
    Low: '#00C851'
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center bg-surface-container-low rounded-[2.5rem] border border-outline-variant/5">
        <div className="flex flex-col items-center gap-4">
          <Activity className="text-secondary animate-pulse" size={32} />
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Aggregating Global Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Timeline Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-2 bg-surface-container-low rounded-[2.5rem] p-8 border border-outline-variant/5"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <TrendingUp size={16} />
            </div>
            <h3 className="font-headline text-xs font-bold tracking-[0.4em] uppercase text-on-primary-container">Threat Propagation</h3>
          </div>
          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Live Feed</span>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F27D26" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F27D26" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)', fontWeight: 700 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)', fontWeight: 700 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#151619', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
                itemStyle={{ color: '#F27D26' }}
              />
              <Area type="monotone" dataKey="count" stroke="#F27D26" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Distribution Charts */}
      <div className="space-y-8">
        {/* Category Pie */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-surface-container-low rounded-[2.5rem] p-8 border border-outline-variant/5"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield size={16} />
            </div>
            <h3 className="font-headline text-xs font-bold tracking-[0.4em] uppercase text-on-primary-container">Vector Analysis</h3>
          </div>
          
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#151619', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '16px',
                    fontSize: '10px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-50">{entry.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Risk Bar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-container-low rounded-[2.5rem] p-8 border border-outline-variant/5"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-error/10 flex items-center justify-center text-error">
              <AlertTriangle size={16} />
            </div>
            <h3 className="font-headline text-xs font-bold tracking-[0.4em] uppercase text-on-primary-container">Severity Spread</h3>
          </div>
          
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.4)', fontWeight: 700 }}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ 
                    backgroundColor: '#151619', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '16px',
                    fontSize: '10px'
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={RISK_COLORS[entry.name] || '#8884d8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
