import React, { useState } from 'react';
import { 
  User, 
  Eye, 
  EyeOff, 
  Shield, 
  BarChart3, 
  Users, 
  Monitor, 
  Smartphone,
  CheckCircle2,
  Lock,
  Palette
} from 'lucide-react';
import { cn } from '../lib/utils';

const Toggle = ({ enabled, onChange }: { enabled: boolean, onChange: () => void }) => (
  <button 
    onClick={onChange}
    className={cn(
      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
      enabled ? "bg-primary" : "bg-surface-container-highest"
    )}
  >
    <span
      className={cn(
        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
        enabled ? "translate-x-6" : "translate-x-1"
      )}
    />
  </button>
);

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export const Settings: React.FC<SettingsProps> = ({ darkMode, setDarkMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [interfaceSettings, setInterfaceSettings] = useState({
    systemNotifications: true,
    glassEffects: true
  });

  return (
    <main className="p-8 lg:p-12 space-y-10">
      {/* Header */}
      <section>
        <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface">Account Ecosystem</h1>
        <p className="text-on-surface-variant text-sm font-medium mt-2 max-w-2xl leading-relaxed">
          Manage your administrative footprint, security protocols, and personal interface preferences through our centralized ledger controls.
        </p>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-8 space-y-8">
          {/* Identity Details */}
          <div className="glass-card p-10 rounded-lg">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-primary-container/30 text-primary rounded-lg flex items-center justify-center">
                <User size={24} />
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">Identity Details</h3>
                <p className="text-on-surface-variant text-xs font-medium">Update your core personal information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Yash Kumar"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-sm font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="yash@abcde.in"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-sm font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2 mb-10">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Current Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  defaultValue="yash_secure_pass_2026"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-sm font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="bg-primary text-on-primary px-8 py-3 rounded-lg text-sm font-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                Save Identity Changes
              </button>
            </div>
          </div>

          {/* Authority & Permissions */}
          <div className="glass-card p-10 rounded-lg bg-surface-container-low/30 border border-outline-variant/10">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-lg flex items-center justify-center">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">Authority & Permissions</h3>
                  <p className="text-on-surface-variant text-xs font-medium">Current Role: Systems Architect (L5)</p>
                </div>
              </div>
              <div className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Admin View
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-surface-container-lowest border-2 border-primary rounded-xl relative">
                <CheckCircle2 className="absolute top-4 right-4 text-primary" size={18} />
                <div className="w-10 h-10 bg-primary-container/30 text-primary rounded-lg flex items-center justify-center mb-4">
                  <Shield size={20} />
                </div>
                <h4 className="font-bold text-sm text-on-surface mb-2">Super Administrator</h4>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">Full system-wide write/read access</p>
              </div>

              <div className="p-6 bg-surface-container-low border border-outline-variant/30 rounded-xl hover:bg-surface-container transition-all cursor-pointer">
                <div className="w-10 h-10 bg-surface-container-high text-on-surface-variant rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 size={20} />
                </div>
                <h4 className="font-bold text-sm text-on-surface mb-2">Financial Auditor</h4>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">Transaction history and report generation</p>
              </div>

              <div className="p-6 bg-surface-container-low border border-outline-variant/30 rounded-xl hover:bg-surface-container transition-all cursor-pointer">
                <div className="w-10 h-10 bg-surface-container-high text-on-surface-variant rounded-lg flex items-center justify-center mb-4">
                  <Users size={20} />
                </div>
                <h4 className="font-bold text-sm text-on-surface mb-2">User Manager</h4>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">Onboard staff and manage credentials</p>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-8">
          {/* Interface */}
          <div className="glass-card p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-8">
              <Palette className="text-primary" size={20} />
              <h3 className="font-headline text-lg font-bold text-on-surface">Interface</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-on-surface">Dark Protocol</p>
                  <p className="text-[10px] text-on-surface-variant">Switch to high-contrast dark mode</p>
                </div>
                <Toggle 
                  enabled={darkMode} 
                  onChange={() => setDarkMode(!darkMode)} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-on-surface">System Notifications</p>
                  <p className="text-[10px] text-on-surface-variant">Real-time alerts for transactions</p>
                </div>
                <Toggle 
                  enabled={interfaceSettings.systemNotifications} 
                  onChange={() => setInterfaceSettings(s => ({ ...s, systemNotifications: !s.systemNotifications }))} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-on-surface">Glass Effects</p>
                  <p className="text-[10px] text-on-surface-variant">Enable backdrop blur on menus</p>
                </div>
                <Toggle 
                  enabled={interfaceSettings.glassEffects} 
                  onChange={() => setInterfaceSettings(s => ({ ...s, glassEffects: !s.glassEffects }))} 
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="glass-card p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-8">
              <Lock className="text-primary" size={20} />
              <h3 className="font-headline text-lg font-bold text-on-surface">Security</h3>
            </div>
            
            <div className="p-4 bg-primary-container/20 rounded-xl border border-primary/10 mb-8">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold text-primary">Two-Factor Auth</p>
                <span className="text-[8px] font-black uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded text-primary">Enabled</span>
              </div>
              <p className="text-[10px] text-on-surface-variant leading-relaxed">
                Protect your account with an extra layer of security via SMS or Auth App.
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Recent Activity</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center text-on-surface-variant">
                  <Monitor size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">MacBook Pro - Mumbai, India</p>
                  <p className="text-[10px] text-on-surface-variant">Active now • 192.168.1.45</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center text-on-surface-variant">
                  <Smartphone size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">iPhone 15 - Mumbai, India</p>
                  <p className="text-[10px] text-on-surface-variant">2 hours ago • Mobile App</p>
                </div>
              </div>
              <button className="w-full text-center text-primary text-[10px] font-black uppercase tracking-widest hover:underline pt-2">
                Sign out of all other sessions
              </button>
            </div>
          </div>

          {/* Branding Card */}
          <div className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800" 
              alt="Branding" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-end">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-2">Architecture of Trust</p>
              <h4 className="text-xl font-headline font-black text-white leading-tight">
                Secure. Precise.<br />Editorial Quality.
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-10 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant">
          <span className="text-on-surface">Nexus Ledger</span>
          <span className="opacity-40">•</span>
          <span>Version 4.8.2-stable</span>
        </div>
        <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
          <button className="hover:text-primary transition-colors">Privacy Policy</button>
          <button className="hover:text-primary transition-colors">Service Agreement</button>
          <button className="hover:text-primary transition-colors">Security Audit</button>
        </div>
      </footer>
    </main>
  );
};
