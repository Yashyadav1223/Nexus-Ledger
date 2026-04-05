import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Cloud,
  CreditCard,
  Megaphone,
  Briefcase,
  TrendingUp,
  Shield,
  Calendar,
  Smartphone,
  Coffee,
  ShoppingBag,
  Zap,
  Plane,
  RefreshCw,
  X,
  PieChart as PieChartIcon,
  BarChart3
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { cn } from '../lib/utils';
import { Transaction } from '../App';

interface TransactionsProps {
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'ref' | 'date' | 'time'>) => void;
}

export const Transactions: React.FC<TransactionsProps> = ({ isAdmin, setIsAdmin, transactions, addTransaction }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [filters, setFilters] = useState({
    description: '',
    category: 'All Categories',
    dateRange: 'All Time'
  });
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'Expense' as 'Income' | 'Expense',
    category: 'Food & Dining'
  });

  // Filter Logic
  const filteredTransactions = transactions.filter(tx => {
    // Description Filter (Case-insensitive)
    const matchesDescription = tx.description.toLowerCase().includes(filters.description.toLowerCase()) || 
                               tx.ref.toLowerCase().includes(filters.description.toLowerCase());
    
    // Category Filter
    const matchesCategory = filters.category === 'All Categories' || tx.category === filters.category;
    
    // Date Filter (Simple implementation for demo)
    let matchesDate = true;
    if (filters.dateRange !== 'All Time') {
      const txDate = new Date(tx.date);
      const now = new Date();
      if (filters.dateRange === 'Last 7 Days') {
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
        matchesDate = txDate >= sevenDaysAgo;
      } else if (filters.dateRange === 'Last 30 Days') {
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
        matchesDate = txDate >= thirtyDaysAgo;
      }
    }

    return matchesDescription && matchesCategory && matchesDate;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Data for Charts (Use filtered data for charts too?)
  const categoryData = filteredTransactions.reduce((acc: any[], curr) => {
    const existing = acc.find(item => item.name === curr.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: curr.category, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#0052CC', '#2684FF', '#D6E4FF', '#FF8B00', '#36B37E', '#6554C0', '#FF5630'];

  // Calculate dynamic volume data based on transactions
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const volumeMap: Record<string, number> = {
    'Sun': 0, 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0
  };

  transactions.forEach(tx => {
    try {
      // Try to parse the date. Format is "Oct 24, 2023"
      const date = new Date(tx.date);
      if (!isNaN(date.getTime())) {
        const dayName = days[date.getDay()];
        volumeMap[dayName]++;
      }
    } catch (e) {
      // Fallback for invalid dates
    }
  });

  const volumeData = days.map(day => ({
    name: day,
    value: volumeMap[day] || Math.floor(Math.random() * 5) + 1 // Add some base value for visual appeal if data is sparse
  }));

  const avgDaily = (transactions.length / 7).toFixed(1);

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
      category: 'Food & Dining'
    });
    setCurrentPage(1); // Go to first page to see new transaction
  };

  return (
    <main className="p-8 lg:p-12 space-y-8">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50 mb-2">
            <span>Finances</span>
            <ChevronRight size={10} />
            <span className="text-primary">Ledger</span>
          </div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface">Transactions Manager</h1>
          <div className="flex items-center gap-3 mt-4">
            {isAdmin && (
              <div className="flex items-center gap-2 bg-primary-container/30 text-primary px-3 py-1 rounded-full border border-primary/10">
                <Shield size={12} />
                <span className="text-[10px] font-black uppercase tracking-widest">Admin Mode</span>
              </div>
            )}
            <p className="text-on-surface-variant text-sm font-medium">
              Showing <span className="text-on-surface font-bold">{transactions.length} transactions</span> total <span className="text-on-surface font-bold">₹4,20,000.00</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all border",
              isFilterVisible 
                ? "bg-primary text-on-primary border-primary shadow-lg shadow-primary/20" 
                : "bg-surface-container-high border-outline-variant/30 text-on-surface hover:bg-surface-container-highest"
            )}
          >
            <Filter size={18} />
            <span>{isFilterVisible ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
            >
              <Plus size={18} />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <PieChartIcon size={18} className="text-primary" />
            <h3 className="font-headline text-lg font-bold text-on-surface">Category Split</h3>
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
                  {categoryData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-surface-container-high)', 
                    borderRadius: '12px', 
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.slice(0, 4).map((item: any, index: number) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-[10px] font-bold text-on-surface-variant uppercase truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={18} className="text-primary" />
            <h3 className="font-headline text-lg font-bold text-on-surface">Weekly Volume</h3>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-outline-variant)" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--color-on-surface-variant)', fontSize: 10, fontWeight: 700 }} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-surface-container-high)', 
                    borderRadius: '12px', 
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorVolume)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-xs text-on-surface-variant font-medium">Average daily transactions: <span className="text-on-surface font-bold">{avgDaily}</span></p>
            <div className="flex items-center gap-1 text-green-600 text-[10px] font-black">
              <TrendingUp size={12} />
              <span>+14.2% VS LAST WEEK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline text-xl font-bold text-on-surface">New Transaction</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface-container-high rounded-full transition-all">
                <X size={20} className="text-on-surface-variant" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Description / Vendor</label>
                <input 
                  required
                  type="text" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="e.g. Blue Tokai Coffee" 
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
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
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
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters Bar */}
      {isFilterVisible && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="md:col-span-5 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={18} />
            <input 
              type="text" 
              value={filters.description}
              onChange={(e) => {
                setFilters({ ...filters, description: e.target.value });
                setCurrentPage(1);
              }}
              placeholder="Filter by description, vendor or ID..." 
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
            {filters.description && (
              <button 
                onClick={() => setFilters({ ...filters, description: '' })}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="md:col-span-4 relative">
            <select 
              value={filters.category}
              onChange={(e) => {
                setFilters({ ...filters, category: e.target.value });
                setCurrentPage(1);
              }}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-4 text-sm font-bold text-on-surface-variant appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option>All Categories</option>
              <option>Infrastructure</option>
              <option>Revenue</option>
              <option>Food & Dining</option>
              <option>Maintenance</option>
              <option>Entertainment</option>
              <option>Social</option>
              <option>Transport</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none" size={18} />
          </div>
          <div className="md:col-span-3 relative">
            <select 
              value={filters.dateRange}
              onChange={(e) => {
                setFilters({ ...filters, dateRange: e.target.value });
                setCurrentPage(1);
              }}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-4 text-sm font-bold text-on-surface-variant appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option>All Time</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
            <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50 border-b border-outline-variant/30">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Date</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Description</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Category</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Type</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50 text-right">Amount</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {currentTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-surface-container-low transition-all group">
                <td className="px-6 py-6">
                  <p className="text-sm font-bold text-on-surface">{tx.date}</p>
                  <p className="text-[10px] text-on-surface-variant/50 mt-1">{tx.time}</p>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                      {tx.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">{tx.description}</p>
                      <p className="text-[10px] text-on-surface-variant/50 mt-1">{tx.ref}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", tx.categoryColor)}>
                    {tx.category}
                  </span>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2">
                    {tx.typeIcon}
                    <span className="text-xs font-bold text-on-surface-variant">{tx.type}</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-right">
                  <p className={cn("text-sm font-black", tx.type === 'Income' ? "text-green-600" : "text-on-surface")}>
                    {tx.amount}
                  </p>
                </td>
                <td className="px-6 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-error/10 rounded-lg text-error transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <button className="p-2 text-on-surface-variant/30 group-hover:hidden">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-6 bg-surface-container-low/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-on-surface-variant/50">
            Showing <span className="text-on-surface font-bold">{filteredTransactions.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}</span> of <span className="text-on-surface font-bold">{filteredTransactions.length}</span> entries
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 text-on-surface-variant/30 hover:text-on-surface transition-all disabled:opacity-50"
            >
              <ChevronsLeft size={18} />
            </button>
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 text-on-surface-variant/30 hover:text-on-surface transition-all disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              {[...Array(Math.min(3, totalPages))].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                    currentPage === i + 1 ? "bg-primary text-white shadow-md shadow-primary/20" : "hover:bg-surface-container-high text-on-surface-variant"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-on-surface-variant hover:text-primary transition-all disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 text-on-surface-variant hover:text-primary transition-all disabled:opacity-50"
            >
              <ChevronsRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="glass-card p-20 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant/30">
            <Search size={40} />
          </div>
          <div>
            <h3 className="font-headline text-xl font-bold text-on-surface">No transactions found</h3>
            <p className="text-sm text-on-surface-variant max-w-xs mx-auto mt-2">
              We couldn't find any transactions matching your current filters. Try adjusting your search or category.
            </p>
          </div>
          <button 
            onClick={() => setFilters({ description: '', category: 'All Categories', dateRange: 'All Time' })}
            className="text-primary font-bold text-sm hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Bottom Toggle */}
      <div className="flex justify-end pt-4">
        <div className="bg-surface-container-high p-1 rounded-full flex items-center gap-2 border border-outline-variant/30">
          <button 
            onClick={() => setIsAdmin(true)}
            className={cn(
              "px-6 py-2 rounded-full text-xs font-bold transition-all",
              isAdmin ? "bg-primary text-white shadow-md shadow-primary/20" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Admin View
          </button>
          <button 
            onClick={() => setIsAdmin(false)}
            className={cn(
              "px-6 py-2 rounded-full text-xs font-bold transition-all",
              !isAdmin ? "bg-primary text-white shadow-md shadow-primary/20" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Viewer View
          </button>
        </div>
      </div>
    </main>
  );
};
