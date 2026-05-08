import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import Card from '../../components/Card';
import { cn } from '../../lib/utils';

interface AttendanceEntry {
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: string;
  status: 'present' | 'late' | 'absent';
  confidence: number;
}

const DUMMY_DATA: AttendanceEntry[] = [
  { date: 'MAY 08, 2024', checkIn: '09:02 AM', checkOut: '05:30 PM', workHours: '08:28', status: 'present', confidence: 99.4 },
  { date: 'MAY 07, 2024', checkIn: '08:58 AM', checkOut: '05:15 PM', workHours: '08:17', status: 'present', confidence: 98.8 },
  { date: 'MAY 06, 2024', checkIn: '09:15 AM', checkOut: '06:02 PM', workHours: '08:47', status: 'late', confidence: 97.2 },
  { date: 'MAY 03, 2024', checkIn: '09:01 AM', checkOut: '05:45 PM', workHours: '08:44', status: 'present', confidence: 99.1 },
  { date: 'MAY 02, 2024', checkIn: '08:55 AM', checkOut: '05:20 PM', workHours: '08:25', status: 'present', confidence: 99.5 },
  { date: 'MAY 01, 2024', checkIn: '--:--', checkOut: '--:--', workHours: '00:00', status: 'absent', confidence: 0 },
];

export default function MyAttendance() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">Attendance Log</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Deep-History of Recognition Access & Duration</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-surface-raised border border-border-subtle hover:border-primary/50 text-slate-300 hover:text-primary rounded font-black text-[10px] uppercase tracking-widest transition-all">
          <Download className="w-3.5 h-3.5" />
          Export Protocol (.PDF)
        </button>
      </div>

      {/* Persistence Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Work Days', value: '22', icon: Calendar, color: 'text-primary' },
          { label: 'Avg Shift', value: '8.4h', icon: Clock, color: 'text-purple-400' },
          { label: 'Reliability', value: '98%', icon: CheckCircle2, color: 'text-success' },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-border-subtle bg-surface-raised/30">
            <div className="flex items-center gap-4">
               <div className={cn("p-2 rounded bg-surface-base border border-border-subtle", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-0.5 font-mono">{stat.label}</p>
                <p className="text-2xl font-bold text-white tracking-tighter font-mono">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Log Table */}
      <Card className="p-0 overflow-hidden border-border-subtle rounded-sm">
        <div className="p-4 border-b border-border-subtle flex flex-col md:flex-row gap-4 items-center justify-between bg-surface-raised">
          <div className="relative group w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="SEARCH LOGS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-base border border-border-subtle rounded py-2 pl-10 pr-4 text-[10px] text-slate-300 outline-none focus:border-primary/50 transition-all font-bold tracking-widest placeholder:text-slate-700 uppercase"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-base border border-border-subtle hover:border-slate-700 text-slate-400 hover:text-slate-200 font-bold text-[10px] uppercase tracking-widest transition-all">
              <Filter className="w-3.5 h-3.5" />
              This Month
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-base/50">
                <th className="px-6 py-4 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Deployment Date</th>
                <th className="px-6 py-4 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Check-In</th>
                <th className="px-6 py-4 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Check-Out</th>
                <th className="px-6 py-4 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Work Duration</th>
                <th className="px-6 py-4 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Status</th>
                <th className="px-6 py-4 text-right text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle font-mono">
              {DUMMY_DATA.map((entry, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-bold text-slate-200 uppercase tracking-widest">{entry.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-400">{entry.checkIn}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-400">{entry.checkOut}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-400">{entry.workHours}H</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className={cn(
                        "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border",
                        entry.status === 'present' ? "bg-success/5 border-success/20 text-success" : 
                        entry.status === 'late' ? "bg-amber-400/5 border-amber-400/20 text-amber-400" :
                        "bg-danger/5 border-danger/20 text-danger"
                      )}>
                        {entry.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={cn(
                      "text-[9px] font-bold",
                      entry.confidence > 95 ? "text-primary" : "text-slate-500"
                    )}>{entry.confidence}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border-subtle flex items-center justify-between bg-surface-raised">
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Showing 1-10 of 42 sequences</p>
          <div className="flex gap-2">
            <button className="p-1.5 rounded bg-surface-base border border-border-subtle text-slate-600 hover:text-slate-300 transition-all disabled:opacity-30" disabled>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded bg-surface-base border border-border-subtle text-slate-600 hover:text-slate-300 transition-all">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Card>

      <div className="p-6 bg-primary/5 border border-primary/20 rounded-sm flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <h4 className="text-[11px] font-black text-primary uppercase tracking-widest mb-1">Recognition Consistency Policy</h4>
          <p className="text-[10px] text-slate-500 leading-relaxed max-w-2xl">
            Attendance is validated using Vector-Mapping Neural Engines. Maintain a 95%+ confidence score to avoid manual verification protocols. 
            Reports are synchronized with Nexus central database every 15 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
