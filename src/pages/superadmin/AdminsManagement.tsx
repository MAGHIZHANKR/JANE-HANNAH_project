import { useState } from 'react';
import { motion } from 'motion/react';
import { UserPlus, Shield, Trash2, Mail, ShieldAlert, CheckCircle2, MoreVertical, Search, Filter } from 'lucide-react';
import Card from '../../components/Card';
import { cn } from '../../lib/utils';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  status: 'active' | 'suspended';
  lastActive: string;
}

const INITIAL_ADMINS: AdminUser[] = [
  { id: 'ADM-001', name: 'Sarah Connor', email: 's.connor@vision.guard', role: 'super_admin', status: 'active', lastActive: '2m ago' },
  { id: 'ADM-002', name: 'James Moss', email: 'j.moss@vision.guard', role: 'admin', status: 'active', lastActive: '14h ago' },
  { id: 'ADM-003', name: 'Elena Vance', email: 'e.vance@vision.guard', role: 'admin', status: 'suspended', lastActive: '5d ago' },
];

export default function AdminsManagement() {
  const [admins, setAdmins] = useState<AdminUser[]>(INITIAL_ADMINS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">Nexus Authority</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Management of System Controllers & Access Privileges</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-black rounded font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20 transition-all"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Authorize New Admin
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Controllers', value: '08', icon: Shield, color: 'text-primary' },
          { label: 'Pending Auth', value: '02', icon: ShieldAlert, color: 'text-amber-400' },
          { label: 'Global Uptime', value: '99.9%', icon: CheckCircle2, color: 'text-success' },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-border-subtle bg-surface-raised/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1 font-mono">{stat.label}</p>
                <p className="text-3xl font-bold text-white tracking-tighter font-mono">{stat.value}</p>
              </div>
              <div className={cn("p-2 rounded bg-surface-base border border-border-subtle", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Table */}
      <Card className="p-0 overflow-hidden border-border-subtle rounded-sm">
        <div className="p-4 border-b border-border-subtle flex flex-col md:flex-row gap-4 items-center justify-between bg-surface-raised">
          <div className="relative group w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="SEARCH AUTHORITIES..."
              className="w-full bg-surface-base border border-border-subtle rounded py-2 pl-10 pr-4 text-[10px] text-slate-300 outline-none focus:border-primary/50 transition-all font-bold tracking-widest placeholder:text-slate-700 uppercase"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-base border border-border-subtle hover:border-slate-700 text-slate-400 hover:text-slate-200 font-bold text-[10px] uppercase tracking-widest transition-all">
            <Filter className="w-3.5 h-3.5" />
            Filter Status
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-base/50">
                <th className="px-6 py-3 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Administrator</th>
                <th className="px-6 py-3 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Role Class</th>
                <th className="px-6 py-3 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Auth Status</th>
                <th className="px-6 py-3 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Pulse Rate</th>
                <th className="px-6 py-3 text-right text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle font-mono">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-base border border-border-subtle flex items-center justify-center font-bold text-[10px] text-primary group-hover:border-primary/50 transition-colors">
                        {admin.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-slate-200 uppercase tracking-widest">{admin.name}</div>
                        <div className="text-[9px] font-bold text-slate-600 uppercase">{admin.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border",
                      admin.role === 'super_admin' ? "bg-primary/5 border-primary/20 text-primary" : "bg-slate-800/20 border-slate-700/30 text-slate-500"
                    )}>
                      {admin.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        admin.status === 'active' ? "bg-success shadow-[0_0_8px_#4ade80]" : "bg-danger shadow-[0_0_8px_#f43f5e]"
                      )} />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{admin.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] text-slate-400 font-bold uppercase">
                    {admin.lastActive}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 bg-surface-base hover:bg-surface-top rounded text-slate-400 transition-all border border-border-subtle">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-surface-base/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md bg-surface-raised border border-border-subtle rounded-sm shadow-2xl relative z-10 p-8"
          >
            <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-8">Authorize Authority Profile</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Name Identity</label>
                <input type="text" className="w-full bg-surface-base border border-border-subtle rounded py-2.5 px-4 text-[11px] font-bold text-slate-300 uppercase outline-none focus:border-primary/50 transition-all tracking-wider" placeholder="NAME" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Comms String</label>
                <input type="email" className="w-full bg-surface-base border border-border-subtle rounded py-2.5 px-4 text-[11px] font-bold text-slate-300 uppercase outline-none focus:border-primary/50 transition-all tracking-wider" placeholder="EMAIL@VG" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Permission Level</label>
                <select className="w-full bg-surface-base border border-border-subtle rounded py-2.5 px-4 text-[11px] font-bold text-slate-500 outline-none focus:border-primary/50 transition-all uppercase tracking-widest">
                  <option>LEVEL 04: STANDARD</option>
                  <option>LEVEL 05: SUPER_ADMIN</option>
                </select>
              </div>
              <div className="pt-4 flex gap-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-surface-base border border-border-subtle text-slate-400 font-black uppercase tracking-widest rounded hover:bg-surface-top transition-all text-[10px]">Cancel</button>
                <button className="flex-1 py-3 bg-primary text-black font-black uppercase tracking-widest rounded shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all text-[10px]">Grant access</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
