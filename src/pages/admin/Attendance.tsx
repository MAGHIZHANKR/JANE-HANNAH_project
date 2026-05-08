import { useState } from 'react';
import { Search, Filter, Download, MoreHorizontal, UserCheck, UserX, Clock } from 'lucide-react';
import Card from '../../components/Card';
import { DUMMY_ATTENDANCE } from '../../constants';
import { cn } from '../../lib/utils';

export default function Attendance() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = DUMMY_ATTENDANCE.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">Access Ledger</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Historical attendance records for all VG-Registered personnel</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-raised border border-border-subtle hover:border-slate-700 text-slate-400 hover:text-slate-200 font-bold text-[10px] uppercase tracking-widest transition-all">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-border-subtle hover:bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest transition-all">
            <Download className="w-3.5 h-3.5" />
            Export Data
          </button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-border-subtle">
        {/* Table Header / Toolbar */}
        <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row gap-4 items-center justify-between bg-surface-raised">
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="SEARCH IDENTITY OR SERIAL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-base border border-border-subtle rounded py-2 pl-10 pr-4 text-[10px] text-slate-300 outline-none focus:border-primary/50 transition-all font-bold tracking-widest placeholder:text-slate-700 uppercase"
            />
          </div>

          <div className="flex items-center gap-4 text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_#4ade80]" />
              <span>Present: 112</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
              <span>Late: 12</span>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-base/50">
                <th className="px-6 py-3 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Digital Identity</th>
                <th className="px-6 py-3 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Protocol Stamp</th>
                <th className="px-6 py-3 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Scan Node</th>
                <th className="px-6 py-3 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Auth Status</th>
                <th className="px-6 py-3 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Co-Efficient</th>
                <th className="px-6 py-3 text-right text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle font-mono">
              {filteredData.map((record) => (
                <tr key={record.id} className="hover:bg-white/5 group transition-colors cursor-default">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-base border border-border-subtle overflow-hidden flex-shrink-0 group-hover:border-primary/50 transition-colors">
                        <img src={`https://i.pravatar.cc/100?u=${record.userId}`} alt={record.name} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-200 group-hover:text-primary transition-colors uppercase tracking-widest">{record.name}</div>
                        <div className="text-[9px] font-bold text-slate-600 uppercase">{record.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                      <Clock className="w-3 h-3 text-slate-600" />
                      {record.timestamp.split(' ')[1]}
                    </div>
                    <div className="text-[9px] text-slate-600 font-bold uppercase">{record.timestamp.split(' ')[0]}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{record.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border",
                      record.status === 'present' 
                        ? "bg-success/5 border-success/20 text-success" 
                        : "bg-amber-400/5 border-amber-400/20 text-amber-500"
                    )}>
                      {record.status === 'present' ? <UserCheck className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                      {record.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-[9px] font-black text-slate-600">
                        <span>{record.confidence}% SIG</span>
                      </div>
                      <div className="w-20 h-[2px] bg-surface-base rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-1000",
                            record.confidence > 98 ? "bg-success shadow-[0_0_8px_#4ade80]" : "bg-primary shadow-[0_0_8px_#00d4ff]"
                          )} 
                          style={{ width: `${record.confidence}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-600 hover:text-slate-200 bg-surface-base border border-border-subtle rounded transition-all">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-surface-raised border-t border-border-subtle flex items-center justify-between">
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest font-mono">Matrix output: {filteredData.length} records identified</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-surface-base border border-border-subtle rounded text-[9px] font-bold text-slate-700 uppercase tracking-widest cursor-not-allowed opacity-50">Prev</button>
            <button className="px-3 py-1 bg-surface-base border border-border-subtle rounded text-[9px] font-bold text-slate-400 hover:text-primary transition-all uppercase tracking-widest">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
