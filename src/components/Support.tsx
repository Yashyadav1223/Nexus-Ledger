import React, { useState } from 'react';
import { 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronDown, 
  ChevronUp, 
  Send,
  LifeBuoy,
  BookOpen,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const faqs = [
  {
    question: "How do I export my transaction history?",
    answer: "You can export your transaction history by navigating to the Transactions Manager and clicking the 'Download CSV' button located at the top right of the activity feed. You can also generate a detailed PDF report from the Insights section."
  },
  {
    question: "Is my financial data secure?",
    answer: "Yes, Nexus Ledger uses industry-standard AES-256 encryption for all data at rest and TLS 1.3 for data in transit. We never share your personal information with third parties without your explicit consent."
  },
  {
    question: "How can I add a new bank account?",
    answer: "Currently, we support manual entry of transactions. Automated bank syncing is part of our upcoming Q3 roadmap. You can add entries manually using the 'Add Entry' button on the Overview dashboard."
  },
  {
    question: "What is the Financial Health Score?",
    answer: "The Financial Health Score is an AI-driven metric that analyzes your debt-to-income ratio, liquidity, and spending habits to give you a snapshot of your overall financial stability. A score above 700 is considered excellent."
  }
];

export const Support: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <main className="p-8 lg:p-12 space-y-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20"
        >
          <LifeBuoy size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Support Center</span>
        </motion.div>
        <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tighter text-on-surface">How can we help you today?</h1>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={20} />
          <input 
            type="text" 
            placeholder="Search for articles, guides, or FAQs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl pl-16 pr-6 py-5 text-lg shadow-xl shadow-black/5 focus:ring-4 focus:ring-primary/10 outline-none transition-all"
          />
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Knowledge Base', desc: 'Browse detailed guides and documentation.', icon: <BookOpen size={32} />, color: 'bg-blue-500' },
          { title: 'Security Center', desc: 'Learn about how we protect your data.', icon: <ShieldCheck size={32} />, color: 'bg-green-500' },
          { title: 'API Reference', desc: 'Integrate your tools with our platform.', icon: <Zap size={32} />, color: 'bg-orange-500' },
        ].map((card, i) => (
          <motion.div 
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 rounded-2xl border border-outline-variant/20 hover:border-primary/30 transition-all group cursor-pointer"
          >
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform", card.color)}>
              {card.icon}
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface mb-2">{card.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* FAQ Section */}
        <section className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-primary rounded-full" />
            <h2 className="font-headline text-3xl font-black text-on-surface">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={cn(
                  "border border-outline-variant/20 rounded-2xl overflow-hidden transition-all",
                  openFaq === i ? "bg-surface-container-low" : "bg-white hover:bg-surface-container-lowest"
                )}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-on-surface">{faq.question}</span>
                  {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-sm text-on-surface-variant leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="lg:col-span-5 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-primary rounded-full" />
            <h2 className="font-headline text-3xl font-black text-on-surface">Get in Touch</h2>
          </div>
          <div className="glass-card p-8 rounded-2xl border border-outline-variant/20 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-on-surface-variant">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary"><Mail size={20} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Email Us</p>
                  <p className="text-sm font-bold">support@equilibrium.finance</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-on-surface-variant">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary"><Phone size={20} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Call Us</p>
                  <p className="text-sm font-bold">+91 1800-FIN-TECH</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  placeholder="Yash Kumar" 
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  placeholder="yash@abcde.in" 
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  placeholder="How can we help you?" 
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitted}
                className={cn(
                  "w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all",
                  isSubmitted ? "bg-green-500 text-white" : "bg-primary text-on-primary shadow-xl shadow-primary/20 hover:opacity-90"
                )}
              >
                {isSubmitted ? (
                  <>Message Sent!</>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* Footer Support */}
      <footer className="text-center py-12 border-t border-outline-variant/20 opacity-60">
        <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
          Nexus Ledger Support • Available 24/7 for Premium Members
        </p>
      </footer>
    </main>
  );
};
