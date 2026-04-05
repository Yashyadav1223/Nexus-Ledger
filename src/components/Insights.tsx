import React from 'react';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertCircle, 
  Target, 
  ArrowUpRight, 
  ArrowDownRight,
  Zap,
  ShieldCheck,
  BarChart3,
  PieChart as PieChartIcon,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { MonthlyReport } from './MonthlyReport';

const predictiveData = [
  { name: 'OCT', actual: 4200, projected: 4200 },
  { name: 'NOV', actual: 4500, projected: 4600 },
  { name: 'DEC', actual: 4800, projected: 5100 },
  { name: 'JAN', projected: 5400 },
  { name: 'FEB', projected: 5800 },
  { name: 'MAR', projected: 6300 },
];

const categoryEfficiency = [
  { name: 'Cloud Ops', value: 85, status: 'Optimal' },
  { name: 'Marketing', value: 62, status: 'High Spend' },
  { name: 'SaaS Subs', value: 94, status: 'Efficient' },
  { name: 'Consulting', value: 45, status: 'Review Needed' },
];

const InsightCard = ({ title, value, description, icon, trend, trendValue }: { 
  title: string, 
  value: string, 
  description: string, 
  icon: React.ReactNode, 
  trend: 'up' | 'down', 
  trendValue: string 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -4 }}
    className="glass-card p-8 rounded-lg relative overflow-hidden group transition-all"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 rounded-xl bg-primary-container/30 text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full",
        trend === 'up' ? "bg-green-500/10 text-green-600" : "bg-error/10 text-error"
      )}>
        {trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
        {trendValue}
      </div>
    </div>
    <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
    <h3 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-2">{value}</h3>
    <p className="text-on-surface-variant text-xs font-medium leading-relaxed">{description}</p>
  </motion.div>
);

export const Insights: React.FC = () => {
  const [showReport, setShowReport] = React.useState(false);

  return (
    <main className="p-8 lg:p-12 space-y-10">
      {showReport && <MonthlyReport onClose={() => setShowReport(false)} />}
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50 mb-2">
            <span>Finances</span>
            <ChevronRight size={10} />
            <span className="text-primary">Insights</span>
          </div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface">Financial Intelligence</h1>
          <p className="text-on-surface-variant text-sm font-medium mt-1">AI-driven analysis and predictive modeling for your portfolio.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowReport(true)}
            className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
          >
            <Zap size={18} />
            <span>Generate Report</span>
          </button>
        </div>
      </section>

      {/* Insight Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <InsightCard 
          title="Projected Savings" 
          value="₹1,24,500.00" 
          description="Based on current spending patterns, you're on track to save 15% more than last quarter."
          icon={<Target size={24} />}
          trend="up"
          trendValue="+15.2%"
        />
        <InsightCard 
          title="Risk Exposure" 
          value="Low-Medium" 
          description="Your portfolio diversification is healthy, but exposure to tech sector is slightly high (42%)."
          icon={<ShieldCheck size={24} />}
          trend="down"
          trendValue="-2.4%"
        />
        <InsightCard 
          title="Investment ROI" 
          value="24.8%" 
          description="Annualized return across all asset classes. Outperforming NIFTY 50 by 4.2%."
          icon={<TrendingUp size={24} />}
          trend="up"
          trendValue="+8.1%"
        />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Predictive Analysis Chart */}
        <div className="xl:col-span-8 glass-card p-8 rounded-lg">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">Wealth Projection</h3>
              <p className="text-on-surface-variant text-sm">Actual vs. AI-Projected Balance (6 Months)</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-[10px] font-bold text-on-surface-variant">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/30 border border-dashed border-primary" />
                <span className="text-[10px] font-bold text-on-surface-variant">Projected</span>
              </div>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictiveData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E8EE" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#44474E', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="var(--color-primary)" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: 'var(--color-primary)', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: '#fff', strokeWidth: 2, stroke: 'var(--color-primary)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Efficiency Breakdown */}
        <div className="xl:col-span-4 glass-card p-8 rounded-lg">
          <h3 className="font-headline text-xl font-bold tracking-tight mb-1 text-on-surface">Efficiency Metrics</h3>
          <p className="text-on-surface-variant text-sm mb-8">Operational spend performance</p>
          
          <div className="space-y-8">
            {categoryEfficiency.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold text-on-surface">{item.name}</p>
                    <p className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      item.status === 'High Spend' || item.status === 'Review Needed' ? "text-error" : "text-green-600"
                    )}>
                      {item.status}
                    </p>
                  </div>
                  <span className="text-sm font-black text-on-surface">{item.value}%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      item.value > 80 ? "bg-green-500" : item.value > 50 ? "bg-primary" : "bg-error"
                    )} 
                    style={{ width: `${item.value}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 p-4 bg-primary-container/20 rounded-xl border border-primary/10">
            <div className="flex gap-3">
              <Lightbulb className="text-primary shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-primary mb-1">AI Recommendation</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Consolidating your AWS instances could reduce infrastructure costs by up to 12% next month.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations List */}
        <div className="xl:col-span-12 glass-card p-8 rounded-lg">
          <div className="flex items-center gap-2 mb-8">
            <Zap size={20} className="text-primary" />
            <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">Strategic Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Tax Optimization', desc: 'Potential for $2,400 in write-offs identified in your recent consulting expenses.', icon: <ShieldCheck size={20} />, color: 'text-primary' },
              { title: 'Subscription Audit', desc: '3 duplicate SaaS subscriptions found. Canceling could save $145/month.', icon: <AlertCircle size={20} />, color: 'text-error' },
              { title: 'Portfolio Rebalance', desc: 'Tech sector exposure is high. Consider diversifying into Energy or Healthcare.', icon: <BarChart3 size={20} />, color: 'text-green-600' },
            ].map((rec, i) => (
              <div key={i} className="p-6 bg-surface-container-low rounded-xl hover:bg-surface-container transition-all cursor-pointer border border-outline-variant/10">
                <div className={cn("mb-4", rec.color)}>{rec.icon}</div>
                <h4 className="font-bold text-sm text-on-surface mb-2">{rec.title}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">{rec.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest">
                  <span>Take Action</span>
                  <ChevronRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
