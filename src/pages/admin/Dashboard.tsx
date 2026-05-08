import { 
  Users, 
  UserPlus, 
  ShieldAlert, 
  Camera, 
  TrendingUp, 
  ArrowRight,
  Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card, { StatCard } from '../../components/Card';
import { DUMMY_ATTENDANCE } from '../../constants';
import { cn } from '../../lib/utils';

const chartData = [
  { name: '08:00', attendance: 45 },
  { name: '09:00', attendance: 124 },
  { name: '10:00', attendance: 89 },
  { name: '11:00', attendance: 65 },
  { name: '12:00', attendance: 42 },
  { name: '13:00', attendance: 38 },
  { name: '14:00', attendance: 55 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">System Overview</h2>
          <p className="text-slate-500 font-medium">Real-time status of VisionGuard node VG-Nexus-01</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded bg-surface-raised border border-border-subtle overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
              </div>
            ))}
            <div className="w-8 h-8 rounded bg-surface-raised border border-border-subtle flex items-center justify-center text-[9px] font-bold text-slate-500 uppercase">
              +12
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/20">
            <UserPlus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Attendance Today" value="124" change="+12%" icon={Users} color="primary" />
        <StatCard title="Unauthorized Entries" value="03" change="-25%" icon={ShieldAlert} color="danger" />
        <StatCard title="Active Systems" value="12/12" change="100%" icon={Camera} color="success" />
        <StatCard title="System Load" value="24%" change="-2%" icon={TrendingUp} color="amber" />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Attendance Flow</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Peak hours detection analytics</p>
            </div>
            <select className="bg-surface-base border border-border-subtle text-slate-400 text-[10px] font-bold px-3 py-1.5 rounded uppercase outline-none focus:border-primary/50">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAttend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" strokeOpacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px' }}
                  itemStyle={{ color: '#00d4ff', fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
                />
                <Area 
                  type="stepAfter" 
                  dataKey="attendance" 
                  stroke="#00d4ff" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorAttend)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Live Activity</h3>
            <Activity className="w-4 h-4 text-primary animate-pulse" />
          </div>
          
          <div className="space-y-6">
            {DUMMY_ATTENDANCE.slice(0, 5).map((log) => (
              <div key={log.id} className="flex gap-4 group cursor-default">
                <div className="relative">
                  <div className="w-10 h-10 rounded bg-surface-raised overflow-hidden border border-border-subtle group-hover:border-primary/50 transition-colors">
                    <img src={`https://i.pravatar.cc/100?u=${log.userId}`} alt="User" />
                  </div>
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface-top",
                    log.status === 'present' ? "bg-success shadow-[0_0_8px_#4ade80]" : "bg-amber-400"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-primary transition-colors uppercase tracking-tight">{log.name}</h4>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Detected at {log.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 font-mono">{log.timestamp.split(' ')[1]}</p>
                  <p className="text-[9px] text-slate-600 font-bold uppercase">{log.userId}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 flex items-center justify-center gap-2 py-3 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-all border border-border-subtle">
            View All Activity <ArrowRight className="w-4 h-4" />
          </button>
        </Card>
      </div>
    </div>
  );
}
