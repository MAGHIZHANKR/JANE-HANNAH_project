import { Bell, Search, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { cn } from '../lib/utils';

interface NavbarProps {
  onLogout: () => void;
  userRole: 'admin' | 'super_admin' | 'user';
  onRoleChange?: (role: 'user' | 'admin' | 'super_admin') => void;
}

export default function Navbar({ onLogout, userRole, onRoleChange }: NavbarProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 bg-surface-base/80 backdrop-blur-md border-b border-border-subtle z-40 h-16 transition-all duration-300">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-3 bg-surface-raised border border-border-subtle rounded-md px-4 py-1.5 w-96 group focus-within:border-primary/50 transition-all">
          <Search className="w-4 h-4 text-slate-500 group-focus-within:text-primary" />
          <input
            type="text"
            placeholder="Search for users, alerts, or cameras..."
            className="bg-transparent border-none outline-none text-xs text-slate-400 placeholder:text-slate-600 w-full"
          />
        </div>

        {/* Action Items */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onLogout}
            className="p-2 rounded bg-surface-raised border border-border-subtle text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-all"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-success/10 border border-success/20 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_#4ade80]" />
            <span className="text-[10px] font-bold text-success uppercase tracking-wider">System Online</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded bg-surface-raised border border-border-subtle text-slate-400 hover:text-white hover:border-slate-700 transition-all relative group"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
            </button>

            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute right-0 mt-4 w-80 bg-surface-raised border border-border-subtle rounded shadow-2xl py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-border-subtle flex justify-between items-center">
                  <h4 className="font-semibold text-xs text-white uppercase tracking-wider">Notifications</h4>
                  <button className="text-[10px] text-primary hover:text-primary/80 uppercase font-bold">Clear all</button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-border-subtle last:border-0 font-mono">
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {i === 1 ? 'Unknown person detected at South Wing Entrance' : i === 2 ? 'New camera unit "Cam-02" connected successfully' : 'Monthly attendance report for April is now ready'}
                      </p>
                      <span className="text-[9px] text-slate-600 mt-1 block uppercase">2 hours ago</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* User Profile / Role Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-4 border-l border-border-subtle hover:opacity-80 transition-opacity"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-200">Vision Specialist</p>
                <p className={cn(
                  "text-[9px] font-black uppercase tracking-widest",
                   userRole === 'super_admin' ? "text-primary text-glow" : (userRole === 'admin' ? "text-amber-400" : "text-slate-500")
                )}>{userRole.replace('_', ' ')}</p>
              </div>
              <div className={cn(
                "w-8 h-8 rounded border flex items-center justify-center overflow-hidden transition-colors",
                isProfileOpen ? "border-primary bg-primary/10" : "bg-surface-base border-border-subtle"
              )}>
                 <UserIcon className={cn("w-4 h-4 transition-colors", isProfileOpen ? "text-primary" : "text-slate-500")} />
              </div>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-surface-raised border border-border-subtle rounded-sm shadow-2xl py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-border-subtle mb-2">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Nexus Rank Override</p>
                  </div>
                  {(['user', 'admin', 'super_admin'] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        onRoleChange?.(role);
                        setIsProfileOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-left text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-between group",
                        userRole === role ? "text-primary bg-primary/5" : "text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {role.replace('_', ' ')}
                      {userRole === role && <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_#00d4ff]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
