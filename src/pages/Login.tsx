import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import { cn } from '../lib/utils';

interface LoginProps {
  onLogin: (role: 'admin' | 'super_admin' | 'user') => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginInProg, setIsLoginInProg] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'super_admin' | 'user'>('admin');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoginInProg(true);
    
    // Quick login for better UX
    setTimeout(() => {
      onLogin(selectedRole);
      setIsLoginInProg(false);
    }, 400);
  };

  const handleBypass = () => {
    onLogin('super_admin');
  };

  return (
    <div className="min-h-screen bg-surface-base flex relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(var(--color-border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--color-border-subtle)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-20" />
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo & Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex p-4 rounded bg-surface-top border border-border-subtle shadow-2xl mb-8 group"
            >
              <ShieldCheck className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white tracking-tighter mb-2 uppercase">VisionGuard AI</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Advanced Neural Security Infrastructure</p>
          </div>

          {/* Login Card */}
          <Card className="bg-surface-top/80 backdrop-blur-xl border-border-subtle p-8 lg:p-10 rounded-sm shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] pl-1 font-mono">Identity ID</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="ADMIN@VG-NEXUS"
                    className="w-full bg-surface-base border border-border-subtle rounded py-3.5 pl-12 pr-4 text-[11px] text-slate-200 placeholder:text-slate-800 focus:border-primary/50 outline-none transition-all uppercase font-bold tracking-widest"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] font-mono">Auth Protocol</label>
                  <a href="#" className="text-[9px] font-bold text-primary hover:text-primary/80 uppercase tracking-widest">Forgot?</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-surface-base border border-border-subtle rounded py-3.5 pl-12 pr-4 text-slate-200 placeholder:text-slate-800 focus:border-primary/50 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 group cursor-pointer transition-opacity hover:opacity-80">
                <div className="w-4 h-4 rounded-sm border border-border-subtle bg-surface-base flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <CheckCircle2 className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Persist current session</span>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] font-mono">Nexus Rank</label>
                <div className="flex gap-2">
                  {(['admin', 'super_admin', 'user'] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={cn(
                        "flex-1 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all border",
                        selectedRole === role 
                          ? "bg-primary/10 border-primary text-primary" 
                          : "bg-surface-base border-border-subtle text-slate-600 hover:text-slate-400"
                      )}
                    >
                      {role.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoginInProg}
                className="w-full relative group overflow-hidden bg-primary hover:bg-primary/90 text-black font-black py-4 rounded shadow-xl shadow-primary/10 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-[11px] tracking-[0.2em]"
              >
                {isLoginInProg ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Initialize Connection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              </button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-border-subtle text-center">
              <button 
                onClick={handleBypass}
                className="text-[9px] font-bold text-slate-600 hover:text-primary uppercase tracking-[0.2em] transition-colors"
              >
                Immediate System Bypass (Admin Overdrive)
              </button>
            </div>
          </Card>

          <p className="text-center mt-12 text-slate-700 text-[9px] font-bold uppercase tracking-[0.3em]">
            Restricted Core Access. All transactions of signal recorded.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
