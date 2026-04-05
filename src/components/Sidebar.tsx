import React from 'react';
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  Lightbulb, 
  Settings, 
  LifeBuoy, 
  Shield,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  onViewChange, 
  isCollapsed, 
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  isAdmin,
  setIsAdmin
}) => {
  const mainNav = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, id: 'overview' },
    { name: 'Transactions', icon: <ArrowRightLeft size={20} />, id: 'transactions' },
    { name: 'Insights', icon: <Lightbulb size={20} />, id: 'insights' },
  ];

  const bottomNav = [
    { name: 'Settings', icon: <Settings size={20} />, id: 'settings' },
    { name: 'Support', icon: <LifeBuoy size={20} />, id: 'support' },
    { name: isAdmin ? 'Switch to Viewer' : 'Switch to Admin', icon: <Shield size={20} />, id: 'admin-toggle' },
  ];

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-50 flex flex-col bg-surface-container-low border-r border-outline-variant/30 transition-all duration-300 font-headline",
    isCollapsed ? "w-20" : "w-64",
    isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        className={sidebarClasses}
      >
        <div className={cn("flex items-center gap-3 p-6 mb-4", isCollapsed ? "justify-center" : "justify-between")}>
          <div className="flex items-center gap-3 overflow-hidden">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shrink-0"
            >
              <LayoutDashboard size={24} />
            </motion.div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="whitespace-nowrap"
                >
                  <h1 className="text-lg font-extrabold tracking-tight text-primary leading-none">Nexus Ledger</h1>
                  <p className="text-[10px] text-on-surface-variant/70 uppercase tracking-widest font-bold mt-1">Financial Advisory</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            className="md:hidden text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Desktop Collapse Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3 top-20 w-6 h-6 bg-primary text-white rounded-full items-center justify-center shadow-lg hover:scale-110 transition-all"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <nav className="flex-1 space-y-1 px-4">
          {mainNav.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onViewChange(item.id);
                if (window.innerWidth < 768) setIsMobileOpen(false);
              }}
              title={isCollapsed ? item.name : ""}
              className={cn(
                "flex items-center gap-3 w-full py-3 rounded-lg transition-all duration-200 text-sm font-bold relative group",
                isCollapsed ? "justify-center px-0" : "px-4",
                activeView === item.id 
                  ? "text-primary bg-primary-container/30" 
                  : "text-on-surface-variant hover:bg-surface-container"
              )}
            >
              {activeView === item.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute right-0 top-2 bottom-2 w-1 bg-primary rounded-l-full"
                />
              )}
              <div className="shrink-0 group-hover:scale-110 transition-transform">{item.icon}</div>
              {!isCollapsed && <span>{item.name}</span>}
            </motion.button>
          ))}
        </nav>

        <div className="mt-auto space-y-4 px-4 pb-6">
          {!isCollapsed && (
            <div className="bg-surface-container-high p-1 rounded-lg flex items-center gap-1 border border-outline-variant/30 mb-4">
              <button 
                onClick={() => setIsAdmin(true)}
                className={cn(
                  "flex-1 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all",
                  isAdmin ? "bg-white dark:bg-surface-container-highest text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                Admin
              </button>
              <button 
                onClick={() => setIsAdmin(false)}
                className={cn(
                  "flex-1 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all",
                  !isAdmin ? "bg-white dark:bg-surface-container-highest text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                Viewer
              </button>
            </div>
          )}

          {!isCollapsed ? (
            <div className="p-4 bg-primary rounded-xl text-white shadow-lg shadow-primary/20 mb-4">
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all">
                Upgrade Plan
              </button>
            </div>
          ) : (
            <div className="flex justify-center mb-4">
              <div 
                onClick={() => setIsAdmin(!isAdmin)}
                className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 cursor-pointer hover:scale-110 transition-all"
              >
                <Shield size={20} />
              </div>
            </div>
          )}

          <div className="space-y-1">
            {bottomNav.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'admin-toggle') {
                    setIsAdmin(!isAdmin);
                  } else {
                    onViewChange(item.id);
                  }
                  if (window.innerWidth < 768) setIsMobileOpen(false);
                }}
                title={isCollapsed ? item.name : ""}
                className={cn(
                  "flex items-center gap-3 w-full py-3 rounded-lg transition-all text-sm font-bold",
                  isCollapsed ? "justify-center px-0" : "px-4",
                  activeView === item.id 
                    ? "text-primary bg-primary-container/30 border-r-4 border-primary" 
                    : "text-on-surface-variant hover:bg-surface-container",
                  item.id === 'admin-toggle' && !isCollapsed && "border border-dashed border-outline-variant mt-2"
                )}
              >
                <div className="shrink-0">{item.icon}</div>
                {!isCollapsed && <span>{item.name}</span>}
              </button>
            ))}
          </div>
        </div>
      </motion.aside>
    </>
  );
};
