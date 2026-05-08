import { motion } from 'motion/react';
import { 
  Shield, 
  Server, 
  Globe, 
  Activity, 
  Cpu, 
  Database, 
  Users, 
  Zap,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import Card from '../../components/Card';
import { cn } from '../../lib/utils';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const SYSTEM_HEALTH = [
  { label: 'Neural Nodes', value: '12/12', status: 'Optimal', icon: Server, color: 'text-primary' },
  { label: 'Global Traffic', value: '842 Mbps', status: 'Normal', icon: Globe, color: 'text-purple-400' },
  { label: 'Auth Success', value: '99.98%', status: 'Secure', icon: Shield, color: 'text-success' },
  { label: 'Server Load', value: '42%', status: 'Stable', icon: Cpu, color: 'text-amber-400' },
];

const GLOBAL_ACTIVITY_DATA = [
  { name: '00:00', load: 30 },
  { name: '04:00', load: 25 },
  { name: '08:00', load: 75 },
  { name: '12:00', load: 90 },
  { name: '16:00', load: 85 },
  { name: '20:00', load: 50 },
  { name: '23:59', load: 35 },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Nexus Prime Controller</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Super Admin Core • System-Wide Authority</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-rose-500/5 border border-rose-500/20 rounded-sm">
            <span className="text-[10px] font-black uppercase text-rose-500 tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              SYSTEM OVERDRIVE: ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SYSTEM_HEALTH.map((stat, i) => (
          <Card key={i} className="bg-surface-raised border-border-subtle group hover:border-primary/30 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-white tracking-tighter font-mono">{stat.value}</p>
              </div>
              <div className={cn("p-2 rounded border border-border-subtle bg-surface-base", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={cn("text-[9px] font-black uppercase px-2 py-0.5 rounded border tracking-widest", 
                stat.status === 'Optimal' || stat.status === 'Secure' ? "bg-success/5 border-success/20 text-success" : "bg-amber-400/5 border-amber-400/20 text-amber-400"
              )}>
                {stat.status}
              </span>
              <Activity className="w-3 h-3 text-slate-700" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Graph */}
        <Card className="lg:col-span-2 p-8 border-border-subtle">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Neural Backbone Load
            </h3>
            <div className="flex gap-2">
              <div className="px-3 py-1 rounded bg-primary/10 border border-primary/20 text-[8px] font-bold text-primary uppercase">Real-time Stream</div>
            </div>
          </div>
          <div className="h-64 font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GLOBAL_ACTIVITY_DATA}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} stroke="#475569" />
                <YAxis fontSize={10} axisLine={false} tickLine={false} stroke="#475569" />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155'}} />
                <Area type="monotone" dataKey="load" stroke="#00d4ff" fillOpacity={1} fill="url(#colorLoad)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Security Summary */}
        <div className="space-y-6">
          <Card className="bg-surface-raised border-rose-500/20">
            <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Lock className="w-4 h-4 text-rose-500" />
              Security Protocol X
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Firewall Integrity', value: '100%', status: 'Active' },
                { title: 'Biometric Salts', value: '4.2B', status: 'Rotated' },
                { title: 'Active Sessions', value: '1,204', status: 'Monitored' },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-surface-base border border-border-subtle rounded-sm flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase">{item.title}</p>
                    <p className="text-[12px] font-black text-white font-mono">{item.value}</p>
                  </div>
                  <span className="text-[8px] font-black text-success uppercase tracking-widest">{item.status}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-border-subtle">
             <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              Nexus Authority
            </h3>
            <div className="flex flex-col gap-2">
               <button className="flex items-center justify-between p-3 bg-surface-base border border-border-subtle hover:border-primary/40 rounded transition-all group">
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-white uppercase tracking-widest">Wipe Auth Logs</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-700" />
               </button>
               <button className="flex items-center justify-between p-3 bg-surface-base border border-border-subtle hover:border-primary/40 rounded transition-all group">
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-white uppercase tracking-widest">Export Core Audit</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-700" />
               </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
