import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  ShoppingCart, 
  Calendar, 
  Plus, 
  ChevronRight, 
  Globe, 
  Headset,
  ShoppingBag,
  Coffee,
  RefreshCw,
  Zap,
  Plane,
  X,
  CreditCard,
  Briefcase,
  Smartphone,
  Cloud,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Transaction } from '../App';

const balanceTrendDataMonth = [
  { name: '01 SEP', value: 2400 },
  { name: '05 SEP', value: 2800 },
  { name: '10 SEP', value: 2600 },
  { name: '15 SEP', value: 3200 },
  { name: '20 SEP', value: 3000 },
  { name: '25 SEP', value: 3500 },
  { name: '30 SEP', value: 4200 },
];

const balanceTrendDataWeek = [
  { name: 'MON', value: 3800 },
  { name: 'TUE', value: 3950 },
  { name: 'WED', value: 3900 },
  { name: 'THU', value: 4100 },
  { name: 'FRI', value: 4050 },
  { name: 'SAT', value: 4150 },
  { name: 'SUN', value: 4200 },
];

const spendingData = [
  { name: 'Housing', value: 1500, color: '#0052CC' },
  { name: 'Food', value: 800, color: '#2684FF' },
  { name: 'Transport', value: 400, color: '#D6E4FF' },
];

const markets = [
  { name: 'NIFTY 50', value: '+1.24%', isPositive: true },
  { name: 'SENSEX', value: '+0.85%', isPositive: true },
  { name: 'BTC/INR', value: '-2.14%', isPositive: false },
];

const SummaryCard = ({ title, value, icon, badge, type, trend }: { title: string, value: string, icon: React.ReactNode, badge: string, type: 'balance' | 'income' | 'expenses', trend?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    className="glass-card p-8 rounded-lg relative overflow-hidden group transition-all"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 rounded-xl bg-primary-container/30 text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full",
        type === 'expenses' ? "bg-error/10 text-error" : "bg-green-500/10 text-green-600"
      )}>
        {trend && trend > 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
        {badge}
      </div>
    </div>
    <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
    <h3 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-4">{value}</h3>
    
    {type === 'balance' && (
      <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '60%' }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-primary h-full rounded-full" 
        />
      </div>
    )}
    
    {type === 'income' && (
      <div className="flex items-end gap-1 h-4">
        {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
          <motion.div 
            key={i} 
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.1 }}
            className="flex-1 bg-green-500/20 rounded-t-sm"
          >
            {i === 4 && <div className="w-full h-full bg-green-500 rounded-t-sm" />}
          </motion.div>
        ))}
        <span className="text-[8px] font-bold text-green-600 ml-2">GROWTH</span>
      </div>
    )}
    
    {type === 'expenses' && (
      <div className="space-y-1">
        <div className="flex justify-between text-[8px] font-bold text-on-surface-variant uppercase tracking-widest">
          <span>Budget Limit</span>
          <span>72% Used</span>
        </div>
        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '72%' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-tertiary h-full rounded-full" 
          />
        </div>
      </div>
    )}
  </motion.div>
);

interface OverviewProps {
  isAdmin: boolean;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'ref' | 'date' | 'time'>) => void;
  onViewInsights: () => void;
}

export const Overview: React.FC<OverviewProps> = ({ isAdmin, transactions, addTransaction, onViewInsights }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trendPeriod, setTrendPeriod] = useState<'week' | 'month'>('month');
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'Expense' as 'Income' | 'Expense',
    category: 'Food & Dining',
    timeAgo: 'Just now'
  });

  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'Income')
      .reduce((acc, t) => acc + parseFloat(t.amount.replace(/[^0-9.]/g, '')), 0);
    
    const expenses = transactions
      .filter(t => t.type === 'Expense')
      .reduce((acc, t) => acc + parseFloat(t.amount.replace(/[^0-9.]/g, '')), 0);

    const balance = 845000 + (income - expenses); // Base balance + net flow

    return {
      income,
      expenses,
      balance
    };
  }, [transactions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(formData.amount.replace(/[^0-9.]/g, ''));
    const amountStr = `${formData.type === 'Income' ? '+' : '-'}₹${amountNum.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    
    const categoryColors: Record<string, string> = {
      'Infrastructure': 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      'Revenue': 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      'Food & Dining': 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
      'Maintenance': 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      'Entertainment': 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
      'Social': 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
      'Transport': 'bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400',
    };

    const categoryIcons: Record<string, React.ReactNode> = {
      'Infrastructure': <Cloud size={18} />,
      'Revenue': <CreditCard size={18} />,
      'Food & Dining': <Coffee size={18} />,
      'Maintenance': <Briefcase size={18} />,
      'Entertainment': <Smartphone size={18} />,
      'Social': <RefreshCw size={18} />,
      'Transport': <Plane size={18} />,
    };

    addTransaction({
      description: formData.description,
      amount: amountStr,
      type: formData.type,
      category: formData.category,
      categoryColor: categoryColors[formData.category] || 'bg-gray-50 text-gray-600',
      typeIcon: formData.type === 'Income' ? <TrendingUp size={14} className="text-green-600" /> : <TrendingUp size={14} className="text-error rotate-180" />,
      icon: categoryIcons[formData.category] || <ShoppingBag size={18} />,
    });

    setIsModalOpen(false);
    setFormData({
      description: '',
      amount: '',
      type: 'Expense',
      category: 'Food & Dining',
      timeAgo: 'Just now'
    });
  };

  return (
    <main className="p-8 lg:p-12 space-y-10">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface">Nexus Ledger</h1>
          <p className="text-on-surface-variant text-sm font-medium mt-1">Global performance overview for the last 30 fiscal days.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-surface-container-high border border-outline-variant/30 px-4 py-2 rounded-lg text-sm font-bold text-on-surface hover:bg-surface-container-highest transition-all">
            <Calendar size={18} />
            <span>Last 30 Days</span>
          </button>
          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
            >
              <Plus size={18} />
              <span>Add Entry</span>
            </button>
          )}
        </div>
      </section>

      {/* Add Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline text-xl font-bold text-on-surface">Add New Entry</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface-container-high rounded-full transition-all">
                <X size={20} className="text-on-surface-variant" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Company / Description</label>
                <input 
                  required
                  type="text" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="e.g. Reliance Digital" 
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Amount (₹)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0.00" 
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as 'Income' | 'Expense'})}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="Expense">Debit (Expense)</option>
                    <option value="Income">Credit (Income)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option>Food & Dining</option>
                  <option>Infrastructure</option>
                  <option>Revenue</option>
                  <option>Maintenance</option>
                  <option>Entertainment</option>
                  <option>Social</option>
                  <option>Transport</option>
                </select>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full py-4 bg-primary text-on-primary rounded-xl font-black text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all">
                  Confirm Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SummaryCard 
          title="Total Balance" 
          value={`₹${stats.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`} 
          icon={<Wallet size={24} />} 
          badge="12%" 
          type="balance" 
          trend={12}
        />
        <SummaryCard 
          title="Monthly Income" 
          value={`₹${stats.income.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`} 
          icon={<TrendingUp size={24} />} 
          badge={`₹${(stats.income * 0.15).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`} 
          type="income" 
          trend={15}
        />
        <SummaryCard 
          title="Monthly Expenses" 
          value={`₹${stats.expenses.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`} 
          icon={<ShoppingCart size={24} />} 
          badge="8.2%" 
          type="expenses" 
          trend={-8.2}
        />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-8 glass-card p-8 rounded-lg">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">Balance Trend</h3>
              <p className="text-on-surface-variant text-sm">30-day cumulative growth</p>
            </div>
            <div className="flex bg-surface-container-high p-1 rounded-lg border border-outline-variant/30">
              <button 
                onClick={() => setTrendPeriod('week')}
                className={cn(
                  "px-4 py-1 text-xs font-bold transition-all rounded-md",
                  trendPeriod === 'week' ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                Week
              </button>
              <button 
                onClick={() => setTrendPeriod('month')}
                className={cn(
                  "px-4 py-1 text-xs font-bold transition-all rounded-md",
                  trendPeriod === 'month' ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                Month
              </button>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendPeriod === 'month' ? balanceTrendDataMonth : balanceTrendDataWeek}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E8EE" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#44474E', fontSize: 10, fontWeight: 700 }} dy={10} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-4 glass-card p-8 rounded-lg">
          <h3 className="font-headline text-xl font-bold tracking-tight mb-1 text-on-surface">Spending Breakdown</h3>
          <p className="text-on-surface-variant text-sm mb-8">By category</p>
          <div className="relative h-64 w-full flex items-center justify-center mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={spendingData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value">
                  {spendingData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-headline font-black text-on-surface">₹92k</p>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Total Out</p>
            </div>
          </div>
          <div className="space-y-4 mb-8">
            {spendingData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-bold text-on-surface-variant">{item.name}</span>
                </div>
                <span className="text-sm font-black text-on-surface">₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <button className="w-full text-center text-primary text-xs font-bold hover:underline">View All Categories</button>
        </div>

        <div className="xl:col-span-8 glass-card p-8 rounded-lg">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">Activity Feed</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Live Updates</span>
            </div>
          </div>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {transactions.slice(0, 5).map((tx, index) => (
                <motion.div 
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container transition-all group cursor-pointer rounded-lg border border-transparent hover:border-primary/10"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-colors")}>
                      {tx.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-on-surface">{tx.description}</p>
                      <p className="text-xs text-on-surface-variant">{tx.category} • {tx.time === new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) ? 'Just now' : tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("font-headline font-bold text-sm", tx.type === 'Income' ? "text-green-600" : "text-on-surface")}>{tx.amount}</p>
                    <p className="text-[8px] font-black tracking-widest text-on-surface-variant/50 uppercase mt-1">COMPLETED</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <button className="w-full mt-6 py-3 text-center text-primary text-xs font-bold hover:bg-primary/5 rounded-lg transition-colors">View Full History</button>
        </div>

        <div className="xl:col-span-4 space-y-8">
          <div className="glass-card p-8 rounded-lg">
            <h3 className="font-headline text-xl font-bold tracking-tight mb-6 text-on-surface">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Send Money', icon: <RefreshCw size={20} />, color: 'bg-blue-500' },
                { label: 'Pay Bills', icon: <Zap size={20} />, color: 'bg-orange-500' },
                { label: 'Add Asset', icon: <Plus size={20} />, color: 'bg-green-500' },
                { label: 'Support', icon: <Headset size={20} />, color: 'bg-purple-500' },
              ].map((action) => (
                <button 
                  key={action.label}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all border border-outline-variant/10 group"
                >
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform", action.color)}>
                    {action.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-primary rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            <h3 className="font-headline text-2xl font-black mb-4">Financial Health Score: 785</h3>
            <p className="text-sm text-white/80 mb-8 leading-relaxed">Your credit health has improved by 15 points this month. You're in the top 5% of earners in your region.</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="text-[8px] font-bold uppercase tracking-widest opacity-60 mb-1">Debt/Equity</p>
                <p className="text-xl font-headline font-black">0.32</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="text-[8px] font-bold uppercase tracking-widest opacity-60 mb-1">Liquidity</p>
                <p className="text-xl font-headline font-black">High</p>
              </div>
            </div>
            <button 
              onClick={onViewInsights}
              className="w-full py-4 bg-white text-primary rounded-xl font-black text-sm shadow-xl shadow-black/10 hover:bg-white/90 transition-all"
            >
              View Deep Insights
            </button>
            <div className="absolute -top-4 -right-4">
               <div className="w-12 h-12 bg-primary-container text-primary rounded-full flex items-center justify-center shadow-lg border-4 border-background"><Headset size={20} /></div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-lg">
            <div className="flex items-center gap-2 mb-8">
              <Globe size={20} className="text-primary" />
              <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">Market Overview</h3>
            </div>
            <div className="space-y-6">
              {markets.map((market) => (
                <div key={market.name} className="flex items-center justify-between">
                  <span className="text-sm font-bold text-on-surface-variant">{market.name}</span>
                  <div className={cn("flex items-center gap-2 font-headline font-black text-sm", market.isPositive ? "text-green-600" : "text-error")}>
                    {market.value}
                    <ChevronRight size={14} className={cn("transition-transform", !market.isPositive && "rotate-90")} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
