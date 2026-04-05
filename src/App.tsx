/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun,
  Menu,
  Cloud,
  CreditCard,
  Megaphone,
  Briefcase,
  TrendingUp,
  Coffee,
  Smartphone,
  Plane,
  RefreshCw,
  Shield,
  ShoppingBag,
  Zap
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Overview } from './components/Overview';
import { Transactions } from './components/Transactions';
import { Insights } from './components/Insights';
import { Settings } from './components/Settings';
import { Support } from './components/Support';
import { cn } from './lib/utils';

export interface Transaction {
  id: number;
  date: string;
  time: string;
  description: string;
  ref: string;
  category: string;
  categoryColor: string;
  type: 'Income' | 'Expense';
  typeIcon: React.ReactNode;
  amount: string;
  icon: React.ReactNode;
}

const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: 'Oct 24, 2023',
    time: '14:32 PM',
    description: 'Jio Fiber Broadband',
    ref: 'INV-2023-901',
    category: 'Infrastructure',
    categoryColor: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹1,420.00',
    icon: <Cloud size={18} />,
  },
  {
    id: 2,
    date: 'Oct 23, 2023',
    time: '09:15 AM',
    description: 'Razorpay Payout',
    ref: 'TRF-772910',
    category: 'Revenue',
    categoryColor: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    type: 'Income',
    typeIcon: <TrendingUp size={14} className="text-green-600" />,
    amount: '+₹89,000.00',
    icon: <CreditCard size={18} />,
  },
  {
    id: 3,
    date: 'Oct 21, 2023',
    time: '11:05 AM',
    description: 'Swiggy Delivery',
    ref: 'SWG-OCT-21',
    category: 'Food & Dining',
    categoryColor: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹350.00',
    icon: <Megaphone size={18} />,
  },
  {
    id: 4,
    date: 'Oct 20, 2023',
    time: '18:45 PM',
    description: 'Urban Company Service',
    ref: 'REF-992110',
    category: 'Maintenance',
    categoryColor: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹2,100.00',
    icon: <Briefcase size={18} />,
  },
  {
    id: 5,
    date: 'Oct 19, 2023',
    time: '10:20 AM',
    description: 'Zomato Order',
    ref: 'ZOM-9921',
    category: 'Food & Dining',
    categoryColor: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹480.00',
    icon: <Coffee size={18} />,
  },
  {
    id: 6,
    date: 'Oct 18, 2023',
    time: '21:10 PM',
    description: 'Netflix Subscription',
    ref: 'NET-SUB-OCT',
    category: 'Entertainment',
    categoryColor: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹649.00',
    icon: <Smartphone size={18} />,
  },
  {
    id: 7,
    date: 'Oct 17, 2023',
    time: '12:45 PM',
    description: 'Split with Rahul (Dinner)',
    ref: 'UPI-7721',
    category: 'Social',
    categoryColor: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
    type: 'Income',
    typeIcon: <TrendingUp size={14} className="text-green-600" />,
    amount: '+₹1,200.00',
    icon: <RefreshCw size={18} />,
  },
  {
    id: 8,
    date: 'Oct 16, 2023',
    time: '08:30 AM',
    description: 'Uber Ride to Office',
    ref: 'UBR-9910',
    category: 'Transport',
    categoryColor: 'bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹245.00',
    icon: <Plane size={18} />,
  },
  {
    id: 9,
    date: 'Oct 15, 2023',
    time: '19:15 PM',
    description: 'Amazon.in Order',
    ref: 'AMZ-7721',
    category: 'Shopping',
    categoryColor: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹2,499.00',
    icon: <ShoppingBag size={18} />,
  },
  {
    id: 10,
    date: 'Oct 14, 2023',
    time: '11:30 AM',
    description: 'Salary Credit',
    ref: 'SAL-OCT-23',
    category: 'Revenue',
    categoryColor: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    type: 'Income',
    typeIcon: <TrendingUp size={14} className="text-green-600" />,
    amount: '+₹1,25,000.00',
    icon: <CreditCard size={18} />,
  },
  {
    id: 11,
    date: 'Oct 13, 2023',
    time: '14:20 PM',
    description: 'BigBasket Grocery',
    ref: 'BB-9921',
    category: 'Food & Dining',
    categoryColor: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹3,200.00',
    icon: <ShoppingBag size={18} />,
  },
  {
    id: 12,
    date: 'Oct 12, 2023',
    time: '10:05 AM',
    description: 'Tata Power Bill',
    ref: 'TP-OCT-23',
    category: 'Infrastructure',
    categoryColor: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹4,500.00',
    icon: <Zap size={18} />,
  },
  {
    id: 13,
    date: 'Oct 11, 2023',
    time: '16:40 PM',
    description: 'Freelance Project',
    ref: 'FL-9921',
    category: 'Revenue',
    categoryColor: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    type: 'Income',
    typeIcon: <TrendingUp size={14} className="text-green-600" />,
    amount: '+₹45,000.00',
    icon: <CreditCard size={18} />,
  },
  {
    id: 14,
    date: 'Oct 10, 2023',
    time: '12:15 PM',
    description: 'PVR Cinemas',
    ref: 'PVR-OCT-10',
    category: 'Entertainment',
    categoryColor: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹1,200.00',
    icon: <Smartphone size={18} />,
  },
  {
    id: 15,
    date: 'Oct 09, 2023',
    time: '09:30 AM',
    description: 'Petrol Refill',
    ref: 'PET-9921',
    category: 'Transport',
    categoryColor: 'bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹3,000.00',
    icon: <Plane size={18} />,
  },
  {
    id: 16,
    date: 'Oct 08, 2023',
    time: '20:05 PM',
    description: 'Starbucks Coffee',
    ref: 'SBUX-OCT-08',
    category: 'Food & Dining',
    categoryColor: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹450.00',
    icon: <Coffee size={18} />,
  },
  {
    id: 17,
    date: 'Oct 07, 2023',
    time: '11:50 AM',
    description: 'HDFC Bank Interest',
    ref: 'INT-OCT-23',
    category: 'Revenue',
    categoryColor: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    type: 'Income',
    typeIcon: <TrendingUp size={14} className="text-green-600" />,
    amount: '+₹2,450.00',
    icon: <CreditCard size={18} />,
  },
  {
    id: 18,
    date: 'Oct 06, 2023',
    time: '15:30 PM',
    description: 'Myntra Shopping',
    ref: 'MYN-9921',
    category: 'Shopping',
    categoryColor: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹3,500.00',
    icon: <ShoppingBag size={18} />,
  },
  {
    id: 19,
    date: 'Oct 05, 2023',
    time: '10:15 AM',
    description: 'Airtel Mobile Bill',
    ref: 'AIR-OCT-23',
    category: 'Infrastructure',
    categoryColor: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹799.00',
    icon: <Smartphone size={18} />,
  },
  {
    id: 20,
    date: 'Oct 04, 2023',
    time: '18:20 PM',
    description: 'Gym Membership',
    ref: 'GYM-OCT-23',
    category: 'Maintenance',
    categoryColor: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹2,500.00',
    icon: <Briefcase size={18} />,
  },
  {
    id: 21,
    date: 'Oct 03, 2023',
    time: '12:45 PM',
    description: 'Consulting Fee',
    ref: 'CON-9921',
    category: 'Revenue',
    categoryColor: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    type: 'Income',
    typeIcon: <TrendingUp size={14} className="text-green-600" />,
    amount: '+₹15,000.00',
    icon: <CreditCard size={18} />,
  },
  {
    id: 22,
    date: 'Oct 02, 2023',
    time: '09:10 AM',
    description: 'Milk Basket Subscription',
    ref: 'MB-OCT-23',
    category: 'Food & Dining',
    categoryColor: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹1,800.00',
    icon: <Coffee size={18} />,
  },
  {
    id: 23,
    date: 'Oct 01, 2023',
    time: '21:30 PM',
    description: 'BookMyShow',
    ref: 'BMS-OCT-01',
    category: 'Entertainment',
    categoryColor: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    type: 'Expense',
    typeIcon: <TrendingUp size={14} className="text-error rotate-180" />,
    amount: '-₹800.00',
    icon: <Smartphone size={18} />,
  },
  {
    id: 24,
    date: 'Sep 30, 2023',
    time: '14:50 PM',
    description: 'Dividends Credit',
    ref: 'DIV-SEP-23',
    category: 'Revenue',
    categoryColor: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    type: 'Income',
    typeIcon: <TrendingUp size={14} className="text-green-600" />,
    amount: '+₹5,600.00',
    icon: <CreditCard size={18} />,
  },
];

// Initial transactions are already 24, no need for extra loop

const TopBar = ({ 
  activeView, 
  setIsMobileOpen, 
  darkMode, 
  setDarkMode,
  isAdmin
}: { 
  activeView: string, 
  setIsMobileOpen: (open: boolean) => void,
  darkMode: boolean,
  setDarkMode: (dark: boolean) => void,
  isAdmin: boolean
}) => {
  return (
    <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 flex justify-between items-center px-4 md:px-8 lg:px-12 py-4">
      <div className="flex items-center gap-4 md:gap-8">
        <button 
          className="md:hidden text-on-surface-variant hover:text-primary transition-colors"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu size={24} />
        </button>

        {activeView === 'settings' ? (
          <h2 className="font-headline text-lg font-black text-primary hidden sm:block">Financial Precision</h2>
        ) : null}
        
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input 
            type="text" 
            placeholder={activeView === 'settings' ? "Search settings..." : "Search transactions or reports..."} 
            className="bg-surface-container-low border border-outline-variant/50 rounded-full pl-10 pr-4 py-2 text-sm w-48 lg:w-80 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-2 md:gap-4">
          {isAdmin && (
            <div className="hidden sm:flex items-center gap-2 bg-primary-container/30 text-primary px-3 py-1 rounded-full border border-primary/10">
              <Shield size={12} />
              <span className="text-[10px] font-black uppercase tracking-widest">Admin Mode</span>
            </div>
          )}
          <button className="text-on-surface-variant hover:text-primary transition-colors p-2">
            <Bell size={20} />
          </button>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="text-on-surface-variant hover:text-primary transition-colors p-2"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden lg:block">
              <p className="text-xs font-black text-on-surface leading-none">Yash Kumar</p>
              <p className="text-[10px] text-on-surface-variant font-bold mt-1">{isAdmin ? 'Administrator' : 'Viewer'}</p>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10 group-hover:border-primary transition-all">
              <img src="https://picsum.photos/seed/user2/100/100" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default function App() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [activeView]);

  const addTransaction = (newTx: Omit<Transaction, 'id' | 'ref' | 'date' | 'time'>) => {
    const tx: Transaction = {
      ...newTx,
      id: transactions.length + 1,
      ref: `REF-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
    setTransactions([tx, ...transactions]);
  };

  return (
    <div className={cn("flex min-h-screen bg-background transition-colors duration-300", darkMode && "dark")}>
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        isCollapsed ? "md:ml-20" : "md:ml-64"
      )}>
        <TopBar 
          activeView={activeView} 
          setIsMobileOpen={setIsMobileOpen} 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isAdmin={isAdmin}
        />
        
        <div ref={contentRef} className="flex-1 overflow-x-hidden">
          {activeView === 'overview' && (
            <Overview 
              isAdmin={isAdmin} 
              transactions={transactions} 
              addTransaction={addTransaction} 
              onViewInsights={() => setActiveView('insights')}
            />
          )}
          {activeView === 'transactions' && (
            <Transactions 
              isAdmin={isAdmin} 
              setIsAdmin={setIsAdmin}
              transactions={transactions} 
              addTransaction={addTransaction} 
            />
          )}
          {activeView === 'insights' && <Insights />}
          {activeView === 'settings' && (
            <Settings 
              darkMode={darkMode} 
              setDarkMode={setDarkMode} 
            />
          )}
          {activeView === 'support' && <Support />}
        </div>
      </div>
    </div>
  );
}
