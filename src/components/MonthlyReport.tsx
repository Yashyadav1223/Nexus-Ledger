import React, { useRef } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  X, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart as PieChartIcon,
  Calendar,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface MonthlyReportProps {
  onClose: () => void;
}

const reportData = [
  { name: 'Housing', value: 1500, color: '#0052CC' },
  { name: 'Food', value: 800, color: '#2684FF' },
  { name: 'Transport', value: 450, color: '#00C7E6' },
  { name: 'Entertainment', value: 300, color: '#FFAB00' },
  { name: 'Utilities', value: 250, color: '#36B37E' },
  { name: 'Others', value: 150, color: '#6554C0' },
];

export const MonthlyReport: React.FC<MonthlyReportProps> = ({ onClose }) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("Generating PDF... Your download will start shortly.");
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Report Header */}
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="font-headline text-xl font-black text-on-surface">Monthly Financial Report</h2>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">September 2026 • ID: NX-2026-09-01</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint}
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all" 
              title="Print Report"
            >
              <Printer size={20} />
            </button>
            <button 
              onClick={handleDownload}
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all" 
              title="Download PDF"
            >
              <Download size={20} />
            </button>
            <div className="w-px h-6 bg-outline-variant/30 mx-2" />
            <button 
              onClick={onClose}
              className="p-2 text-on-surface-variant hover:text-error hover:bg-error/5 rounded-lg transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12 bg-[#F8F9FC] print:p-0 print:bg-white">
          {/* Executive Summary */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h3 className="font-headline text-lg font-black text-on-surface uppercase tracking-tight">Executive Summary</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm"
              >
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2">Total Inflow</p>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-2xl font-black text-on-surface">₹8,45,000.00</h4>
                  <span className="text-[10px] font-bold text-green-600 flex items-center gap-0.5">
                    <TrendingUp size={10} /> +12%
                  </span>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm"
              >
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2">Total Outflow</p>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-2xl font-black text-on-surface">₹3,45,000.00</h4>
                  <span className="text-[10px] font-bold text-error flex items-center gap-0.5">
                    <TrendingDown size={10} /> +5%
                  </span>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary text-on-primary p-6 rounded-2xl shadow-lg shadow-primary/20"
              >
                <p className="text-[10px] font-black text-on-primary/60 uppercase tracking-widest mb-2">Net Savings</p>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-2xl font-black">₹5,00,000.00</h4>
                  <span className="text-[10px] font-bold text-white/80">59% Rate</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Financial Health Gauge */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h3 className="font-headline text-lg font-black text-on-surface uppercase tracking-tight">Financial Health</h3>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-outline-variant/20 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="relative h-48 w-48 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { value: 785, color: 'var(--color-primary)' },
                          { value: 1000 - 785, color: '#E6E8EE' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        startAngle={180}
                        endAngle={0}
                        paddingAngle={0}
                        dataKey="value"
                      >
                        <Cell fill="var(--color-primary)" />
                        <Cell fill="#E6E8EE" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                    <span className="text-4xl font-headline font-black text-on-surface">785</span>
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Excellent</span>
                  </div>
                </div>
                <div className="w-full space-y-3 mt-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-bold">Liquidity</span>
                    <span className="text-green-600 font-black">High</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-bold">Debt Ratio</span>
                    <span className="text-primary font-black">0.32</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-bold">Savings Rate</span>
                    <span className="text-green-600 font-black">59%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h3 className="font-headline text-lg font-black text-on-surface uppercase tracking-tight">Expense Distribution</h3>
              </div>
              <div className="h-[300px] w-full bg-white p-8 rounded-2xl border border-outline-variant/20">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData} layout="vertical" margin={{ left: 20, right: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#44474E', fontSize: 10, fontWeight: 700 }}
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                      {reportData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Detailed Breakdown */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h3 className="font-headline text-lg font-black text-on-surface uppercase tracking-tight">Top Transactions</h3>
              </div>
              <div className="bg-white rounded-2xl border border-outline-variant/20 divide-y divide-outline-variant/10 overflow-hidden">
                {[
                  { desc: 'AWS Cloud Services', cat: 'Cloud Ops', amt: '₹45,000.00', date: 'Sep 24', status: 'success' },
                  { desc: 'Apple Store Purchase', cat: 'Hardware', amt: '₹1,25,000.00', date: 'Sep 20', status: 'success' },
                  { desc: 'Office Rent - WeWork', cat: 'Housing', amt: '₹85,000.00', date: 'Sep 15', status: 'pending' },
                  { desc: 'Marketing Campaign', cat: 'Marketing', amt: '₹32,000.00', date: 'Sep 10', status: 'success' },
                  { desc: 'SaaS Subscription', cat: 'Software', amt: '₹12,500.00', date: 'Sep 05', status: 'success' },
                ].map((tx, i) => (
                  <div key={i} className="p-4 flex justify-between items-center hover:bg-surface-container-lowest transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        tx.status === 'success' ? "bg-green-500" : "bg-orange-500"
                      )} />
                      <div>
                        <p className="text-sm font-bold text-on-surface">{tx.desc}</p>
                        <p className="text-[10px] text-on-surface-variant font-medium">{tx.cat} • {tx.date}</p>
                      </div>
                    </div>
                    <p className="text-sm font-black text-on-surface">{tx.amt}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h3 className="font-headline text-lg font-black text-on-surface uppercase tracking-tight">Strategic Insights</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 flex gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary h-fit"><CheckCircle2 size={20} /></div>
                  <div>
                    <h4 className="text-sm font-black text-on-surface mb-1">Savings Milestone</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">You've reached 85% of your quarterly savings goal. Keep it up!</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 flex gap-4">
                  <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600 h-fit"><AlertTriangle size={20} /></div>
                  <div>
                    <h4 className="text-sm font-black text-on-surface mb-1">High Spend Alert</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">Marketing expenses are 15% higher than projected. Review campaign ROI.</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 flex gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 h-fit"><Info size={20} /></div>
                  <div>
                    <h4 className="text-sm font-black text-on-surface mb-1">Tax Tip</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">Recent business travel expenses may be eligible for tax deductions.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Report Footer */}
          <footer className="pt-12 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 print:pt-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant">
              <span className="text-on-surface">Nexus Ledger Intelligence</span>
              <span className="opacity-40">•</span>
              <span>Generated on Oct 05, 2026</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
              <span>Confidential Financial Document</span>
            </div>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};
