import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { Activity, Shield, Users, Server, AlertTriangle, TrendingUp } from 'lucide-react';
import Card from '../../components/Card';
import { cn } from '../../lib/utils';

const DATA_TRAFFIC = [
  { time: '00:00', load: 45, events: 12 },
  { time: '04:00', load: 30, events: 8 },
  { time: '08:00', load: 85, events: 45 },
  { time: '12:00', load: 95, events: 62 },
  { time: '16:00', load: 75, events: 38 },
  { time: '20:00', load: 60, events: 25 },
  { time: '23:59', load: 50, events: 15 },
];

const DATA_DISTRIBUTION = [
  { name: 'Authorized', value: 720, color: '#00d4ff' },
  { name: 'Unknown', value: 85, color: '#f43f5e' },
  { name: 'Staff', value: 142, color: '#4ade80' },
  { name: 'Guest', value: 45, color: '#fbbf24' },
];

export default function GlobalAnalytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tighter uppercase text-glow">Vector Analytics</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Real-time Data Interpretation Hub</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-primary/5 border border-primary/20 rounded-sm">
            <span className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Live Telemetry: Node-01
            </span>
          </div>
        </div>
      </div>

      {/* High-Level Pulse */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Scans', value: '12.4K', change: '+12%', icon: Users },
          { label: 'Detection Accuracy', value: '99.98%', change: '+0.02%', icon: Activity },
          { label: 'Threat Response', value: '45ms', change: '-5ms', icon: Shield },
          { label: 'DB Integrity', value: '100%', change: 'Stable', icon: Server },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-border-subtle bg-surface-raised/50 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <stat.icon className="w-12 h-12" />
            </div>
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest font-mono mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h4 className="text-2xl font-bold text-white tracking-tighter font-mono">{stat.value}</h4>
              <span className={cn(
                "text-[9px] font-bold font-mono",
                stat.change.includes('+') ? "text-success" : "text-primary"
              )}>{stat.change}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Traffic Chart */}
        <Card className="lg:col-span-2 p-6 border-border-subtle rounded-sm">
          <div className="flex items-center justify-between mb-8">
            <h5 className="text-[11px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              System Load & Intelligence Events
            </h5>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-primary/20 border border-primary" />
                Processing Load
              </div>
              <div className="flex items-center gap-2 text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-success/20 border border-success" />
                Events Logged
              </div>
            </div>
          </div>

          <div className="h-80 w-full font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA_TRAFFIC}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '4px', fontSize: '10px' }}
                  itemStyle={{ color: '#00d4ff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="load" 
                  stroke="#00d4ff" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorLoad)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="events" 
                  stroke="#4ade80" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorEvents)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Identity Distribution */}
        <Card className="p-6 border-border-subtle rounded-sm">
          <h5 className="text-[11px] font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-8">
            <Users className="w-4 h-4 text-primary" />
            Identity Matrix Distro
          </h5>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DATA_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DATA_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '4px', fontSize: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 space-y-3">
            {DATA_DISTRIBUTION.map((entry, index) => (
              <div key={index} className="flex items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{entry.name}</span>
                </div>
                <span className="text-[10px] font-bold text-white">{entry.value} vct.</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Regional Node Status */}
      <Card className="p-6 border-border-subtle rounded-sm">
        <h5 className="text-[11px] font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-8">
          <TrendingUp className="w-4 h-4 text-primary" />
          Global Node Synchronization
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { node: 'Node_Alpha_SEA', status: 'Stable', lat: '12ms', sync: '100%', load: 45 },
            { node: 'Node_Beta_NYC', status: 'Peaking', lat: '45ms', sync: '98%', load: 88, warning: true },
            { node: 'Node_Gamma_LDN', status: 'Stable', lat: '22ms', sync: '100%', load: 32 },
            { node: 'Node_Delta_TKY', status: 'Maintenance', lat: '--', sync: '--', load: 0, off: true },
          ].map((node, i) => (
            <div key={i} className="space-y-4 p-4 bg-surface-base border border-border-subtle rounded-sm relative overflow-hidden group">
              {node.warning && <div className="absolute top-0 right-0 p-2"><AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" /></div>}
              <div className="flex justify-between items-start">
                <h6 className="text-[10px] font-black text-slate-300 uppercase tracking-tighter truncate w-32">{node.node}</h6>
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-widest",
                  node.off ? "text-slate-700" : node.warning ? "text-amber-500" : "text-success"
                )}>{node.status}</span>
              </div>
              <div className="flex justify-between items-center font-mono">
                 <div>
                    <p className="text-[8px] text-slate-600 font-bold uppercase">Latency</p>
                    <p className="text-[10px] font-bold text-slate-400">{node.lat}</p>
                 </div>
                 <div>
                    <p className="text-[8px] text-slate-600 font-bold uppercase">Sync</p>
                    <p className="text-[10px] font-bold text-slate-400">{node.sync}</p>
                 </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[8px] font-bold text-slate-600 uppercase">
                  <span>Load Matrix</span>
                  <span>{node.load}%</span>
                </div>
                <div className="h-1 bg-surface-raised rounded-full overflow-hidden">
                   <div 
                    className={cn("h-full transition-all duration-1000", node.warning ? "bg-amber-400" : "bg-primary")} 
                    style={{ width: `${node.load}%` }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
