import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, LogOut, ShieldCheck } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userRole: 'admin' | 'super_admin' | 'user';
}

export default function Sidebar({ isOpen, setIsOpen, userRole }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const filteredNavItems = NAV_ITEMS.filter(item => 
    !item.roles || item.roles.includes(userRole)
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-surface-raised shadow-2xl transition-all duration-300 z-50 border-r border-border-subtle backdrop-blur-xl",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 relative border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
            <ShieldCheck className="text-black w-5 h-5" />
          </div>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-lg text-white"
            >
              VisionGuard <span className="text-primary">AI</span>
            </motion.span>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="mt-6 px-3 space-y-1">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg transition-all group relative overflow-hidden",
                isActive
                  ? "bg-primary/5 text-primary border-l-2 border-primary"
                  : "text-slate-400 hover:text-slate-200 border-l-2 border-transparent"
              )}
            >
              <Icon className={cn("w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110", isActive && "text-primary")} />
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium text-[13px] whitespace-nowrap"
                >
                  {item.title}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Toggle */}
      <div className="absolute bottom-6 left-0 w-full px-3 space-y-2">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-4 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all group",
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
          {isOpen && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium">
              Logout
            </motion.span>
          )}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-full h-10 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/30 text-slate-400 transition-colors"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
}
