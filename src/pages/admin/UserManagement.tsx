import { useState, ComponentType } from 'react';
import { UserPlus, Search, Edit2, Trash2, ShieldCheck, Mail, Phone, Calendar, Upload, X } from 'lucide-react';
import { motion } from 'motion/react';
import Card from '../../components/Card';
import { cn } from '../../lib/utils';

export default function UserManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">Identity Nexus</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Directory of Registered VG-Entities</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-black rounded font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20 transition-all"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Enroll Personnel
        </button>
      </div>

      {/* Grid Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* User List Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-0 overflow-hidden border-border-subtle rounded-sm">
            <div className="p-4 border-b border-border-subtle flex flex-col md:flex-row gap-4 items-center justify-between bg-surface-raised">
              <div className="relative group w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="QUERY DIRECTORY..."
                  className="w-full bg-surface-base border border-border-subtle rounded py-2 pl-10 pr-4 text-[10px] text-slate-300 outline-none focus:border-primary/50 transition-all font-bold tracking-widest placeholder:text-slate-700 uppercase"
                />
              </div>
              <div className="flex gap-4">
                <select className="bg-surface-base border border-border-subtle text-slate-500 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded outline-none focus:border-primary/50">
                  <option>Rank: ALL</option>
                  <option>Rank: EXEC</option>
                  <option>Rank: ENG</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-base/50">
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">ENTITY PROFILE</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">COMMS STRING</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">ACCESS TIER</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">LAST SIGNAL</th>
                    <th className="px-6 py-3 text-right text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-border-subtle">MODS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle font-mono">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <tr key={i} className="hover:bg-white/5 group transition-colors cursor-default">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-surface-base border border-border-subtle overflow-hidden flex-shrink-0 group-hover:border-primary/50 transition-all duration-300">
                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-slate-200 uppercase tracking-widest group-hover:text-primary transition-colors">Neural Interface {i}</div>
                            <div className="text-[9px] font-bold text-slate-600 uppercase">ID://VG-00{i}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            <Mail className="w-3 h-3 text-slate-600" />
                            entity_{i}@vision.guard
                          </div>
                          <div className="flex items-center gap-2 text-[9px] font-bold text-slate-600">
                            <Phone className="w-3 h-3" />
                            +1 (555) 00{i}-9876
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.15em] border transition-all",
                          i % 2 === 0 ? "bg-primary/5 border-primary/20 text-primary" : "bg-slate-800/10 border-slate-700/30 text-slate-500"
                        )}>
                          {i % 2 === 0 ? 'Clearance Level 4' : 'Standard Node'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                          <Calendar className="w-3 h-3 text-slate-600" />
                          24h Cycle {i+1}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right space-x-2">
                        <button className="p-1.5 bg-surface-base hover:bg-surface-top rounded text-slate-400 hover:text-slate-200 transition-all border border-border-subtle">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 bg-danger/5 hover:bg-danger rounded text-danger hover:text-white transition-all border border-danger/10">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Intelligence Sidebar */}
        <div className="space-y-6">
          <Card className="bg-surface-top border-border-subtle rounded-sm">
            <ShieldCheck className="w-6 h-6 text-primary mb-6" />
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-3">Neural Storage</h4>
            <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight">
              Facial vectors are encrypted using 4096-bit neural hashing protocols. Distributed architecture maintained by CORE-NODE.
            </p>
            <div className="mt-8 pt-6 border-t border-border-subtle flex items-center justify-between">
              <div className="text-right font-mono">
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Clusters</p>
                <p className="text-lg font-bold text-white tracking-tighter">450 / 1024</p>
              </div>
              <div className="w-14 h-14 rounded-full border-2 border-surface-raised flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20" style={{ height: '44%' }} />
                <span className="text-[10px] font-black text-white relative z-10 font-mono">44%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Enrollment Modal (Simplified) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-surface-base/90 backdrop-blur-md" onClick={() => setIsAddModalOpen(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg bg-surface-raised border border-border-subtle rounded-sm shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="p-8 space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Identity Enrollment</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-white/5 rounded-full text-slate-500 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center border border-dashed border-border-subtle rounded-sm p-10 bg-surface-base group hover:border-primary/50 transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">Inject Neural Scan Data</p>
                  <p className="text-[9px] text-slate-700 mt-2 font-mono">ENCRYPTED MATRIX ONLY (MAX 5MB)</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Matrix Identity</label>
                    <input type="text" className="w-full bg-surface-base border border-border-subtle rounded py-2.5 px-4 text-[11px] font-bold text-slate-300 uppercase outline-none focus:border-primary/50 transition-all tracking-wider" placeholder="ID STRING" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Access Tier</label>
                    <select className="w-full bg-surface-base border border-border-subtle rounded py-2.5 px-4 text-[11px] font-bold text-slate-500 outline-none focus:border-primary/50 transition-all uppercase tracking-widest">
                      <option>LEVEL 01: STD</option>
                      <option>LEVEL 02: EXEC</option>
                      <option>LEVEL 03: ADMIN</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest rounded shadow-xl shadow-primary/20 transition-all text-xs">
                Initialize Enrollment protocol
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
