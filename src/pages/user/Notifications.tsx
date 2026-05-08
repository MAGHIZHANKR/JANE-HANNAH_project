import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Trash2, 
  CheckCircle2, 
  ShieldAlert, 
  Info, 
  Filter,
  Check
} from 'lucide-react';
import Card from '../../components/Card';
import { cn } from '../../lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'security';
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Recognition Succeeded', message: 'Face successfully matched at North Gate. Access granted at 09:02 AM.', time: '2 mins ago', type: 'success', read: false },
  { id: '2', title: 'Security Advisory', message: 'System maintenance scheduled for 02:00 AM tonight. Expect partial node outages.', time: '1 hour ago', type: 'security', read: false },
  { id: '3', title: 'Late Entry Warning', message: 'Your check-in was logged 15 minutes past the standard protocol threshold.', time: 'Today, 09:12 AM', type: 'warning', read: true },
  { id: '4', title: 'Profile Updated', message: 'Your biometric facet map was successfully re-indexed and deployed.', time: 'Yesterday', type: 'info', read: true },
  { id: '5', title: 'System Message', message: 'Welcome to the New VisionGuard AI Core. Explore your personalized dashboard.', time: '2 days ago', type: 'info', read: true },
];

export default function UserNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filtered = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'warning': return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'security': return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      default: return <Info className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">Intelligence Feed</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Direct communication from VisionGuard Neural Core</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-surface-base border border-border-subtle hover:border-slate-700 text-slate-400 hover:text-slate-200 font-bold text-[10px] uppercase tracking-widest transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            Clear All Unread
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-subtle">
        {[
          { id: 'all', label: 'All Intel' },
          { id: 'unread', label: 'Active Signals' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative",
              activeTab === tab.id ? "text-primary" : "text-slate-600 hover:text-slate-400"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
            {tab.id === 'unread' && notifications.some(n => !n.read) && (
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((notif) => (
              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "group relative p-6 border rounded-sm transition-all duration-300",
                  notif.read 
                    ? "bg-surface-raised/30 border-border-subtle" 
                    : "bg-primary/5 border-primary/20 shadow-[0_0_20px_rgba(0,212,255,0.05)]"
                )}
              >
                <div className="flex gap-4">
                  <div className="mt-1">{getIcon(notif.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h4 className={cn(
                        "text-[11px] font-black uppercase tracking-widest truncate",
                        notif.read ? "text-slate-400" : "text-white"
                      )}>
                        {notif.title}
                      </h4>
                      <span className="text-[9px] font-bold text-slate-600 uppercase font-mono shrink-0">
                        {notif.time}
                      </span>
                    </div>
                    <p className={cn(
                      "text-[11px] font-medium leading-relaxed max-w-2xl",
                      notif.read ? "text-slate-600" : "text-slate-400"
                    )}>
                      {notif.message}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => deleteNotification(notif.id)}
                      className="p-2 rounded bg-surface-base border border-border-subtle text-slate-600 hover:text-rose-500 hover:border-rose-500/50 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 rounded-full bg-surface-raised flex items-center justify-center mb-6 border border-border-subtle">
                  <Bell className="w-6 h-6 text-slate-800" />
               </div>
               <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">No Active Intelligence Signals</h3>
               <p className="text-[10px] text-slate-700 mt-2">All protocols are currently operating within silent parameters.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 bg-surface-raised/50 border border-border-subtle rounded-sm flex items-center justify-between">
        <div>
           <h4 className="text-[11px] font-black text-slate-300 uppercase tracking-widest mb-1">Alert Protocol Settings</h4>
           <p className="text-[9px] text-slate-600 uppercase font-mono">Managed via Central Security Controller (Tier 01 Overdrive)</p>
        </div>
        <button className="px-4 py-2 bg-surface-base border border-border-subtle hover:border-slate-700 text-slate-400 text-[10px] font-bold uppercase transition-all">
          Manage Preferences
        </button>
      </div>
    </div>
  );
}
