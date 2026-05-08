import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  Camera, 
  Zap,
  ArrowUpRight,
  History,
  Calendar,
  Bell
} from 'lucide-react';
import Card from '../../components/Card';
import { cn } from '../../lib/utils';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const ATTENDANCE_STATS = [
  { label: 'Attendance Status', value: 'Present', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
  { label: 'Check-In Time', value: '09:02 AM', icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Monthly Avg', value: '96.5%', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { label: 'Late Entries', value: '02', icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-400/10' },
];

const RECOGNITION_STATUS = {
  status: 'Face Detected Successfully',
  confidence: 99.4,
  cameraId: 'CAM-ENTRY-01',
  timestamp: 'Just now'
};

const ACTIVITY_TIMELINE = [
  { time: '09:02 AM', event: 'Check In', type: 'in' },
  { time: '01:00 PM', event: 'Break Out', type: 'out' },
  { time: '01:45 PM', event: 'Break In', type: 'in' },
  { time: '05:30 PM', event: 'Check Out', type: 'out' },
];

const WEEKLY_DATA = [
  { name: 'Mon', hours: 8.5 },
  { name: 'Tue', hours: 9.0 },
  { name: 'Wed', hours: 8.2 },
  { name: 'Thu', hours: 8.8 },
  { name: 'Fri', hours: 7.5 },
];

const NOTIFICATIONS = [
  { title: 'Attendance Marked', message: 'You have been successfully recognized at Main Entrance.', time: '2h ago', level: 'info' },
  { title: 'Late Arrival', message: 'Check-in recorded 15 mins past schedule.', time: 'Yesterday', level: 'warning' },
  { title: 'Profile Updated', message: 'Your biometric signature has been re-indexed.', time: '2 days ago', level: 'success' },
];

export default function UserDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">Operations Center</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Personal Recognition & Attendance Metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-primary/5 border border-primary/20 rounded-sm">
            <span className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              BIOMETRIC LOCK: ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ATTENDANCE_STATS.map((stat, i) => (
          <Card key={i} className="group hover:border-primary/30 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1 font-mono">{stat.label}</p>
                <p className={cn("text-2xl font-bold tracking-tighter font-mono", stat.color)}>{stat.value}</p>
              </div>
              <div className={cn("p-2 rounded border border-border-subtle", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-[9px] font-bold text-slate-600 uppercase">
              <TrendingUp className="w-3 h-3 text-success" />
              <span className="text-success">+2.4%</span> vs last month
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recognition & Timeline */}
        <div className="space-y-8">
          {/* Recognition Status */}
          <Card className="bg-gradient-to-br from-surface-top to-surface-raised border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded bg-primary/10 border border-primary/20">
                <Camera className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-[11px] font-black text-white uppercase tracking-widest">Face Recognition Status</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-surface-base/50 rounded border border-border-subtle">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                <span className="text-[10px] font-black text-success uppercase tracking-wider">{RECOGNITION_STATUS.status}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-surface-base/50 rounded border border-border-subtle">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Confidence</span>
                <span className="text-[10px] font-black text-primary uppercase tracking-wider">{RECOGNITION_STATUS.confidence}%</span>
              </div>

              <div className="p-1 bg-surface-base rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${RECOGNITION_STATUS.confidence}%` }}
                  className="h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(0,212,255,0.5)]"
                />
              </div>

              <div className="flex justify-between text-[8px] font-bold text-slate-600 uppercase tracking-widest">
                <span>Node: {RECOGNITION_STATUS.cameraId}</span>
                <span>{RECOGNITION_STATUS.timestamp}</span>
              </div>
            </div>
          </Card>

          {/* Activity Timeline */}
          <Card className="border-border-subtle">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-[11px] font-black text-white uppercase tracking-widest">Daily Activity Sequence</h3>
            </div>

            <div className="space-y-6 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border-subtle" />
              
              {ACTIVITY_TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-4 relative z-10">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-4 border-surface-top flex items-center justify-center",
                    item.type === 'in' ? "bg-primary" : "bg-slate-700"
                  )}>
                    <div className="w-1 h-1 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-slate-200 uppercase tracking-widest">{item.event}</p>
                      <p className="text-[9px] font-bold text-slate-600 uppercase">{item.type === 'in' ? 'Access Granted' : 'Exit Logged'}</p>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 font-mono">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Center/Right: Analytics & Notifications */}
        <div className="lg:col-span-2 space-y-8">
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Weekly Work Cycles
              </h4>
              <div className="h-48 w-full font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={WEEKLY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} stroke="#475569" />
                    <YAxis fontSize={10} axisLine={false} tickLine={false} stroke="#475569" />
                    <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155'}} />
                    <Bar dataKey="hours" fill="#00d4ff" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-8">Attendance Consistency</h4>
              <div className="flex items-center justify-center h-48">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-surface-base stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent" />
                    <motion.circle 
                      className="text-primary stroke-current" 
                      strokeWidth="8" 
                      strokeLinecap="round" 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent"
                      initial={{ strokeDasharray: "0 251" }}
                      animate={{ strokeDasharray: "238 251" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white font-mono">95%</span>
                    <span className="text-[8px] font-bold text-slate-500 uppercase">Score</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Notifications */}
          <Card>
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                Intelligence Feed
              </h4>
              <button className="text-[9px] font-bold text-primary uppercase tracking-widest hover:underline">View All</button>
            </div>

            <div className="space-y-4">
              {NOTIFICATIONS.map((notif, i) => (
                <div key={i} className="group p-4 bg-surface-base border border-border-subtle rounded-sm hover:border-slate-700 transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="text-[11px] font-bold text-slate-200 uppercase tracking-tighter">{notif.title}</h5>
                    <span className="text-[9px] font-bold text-slate-600 uppercase font-mono">{notif.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">{notif.message}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
