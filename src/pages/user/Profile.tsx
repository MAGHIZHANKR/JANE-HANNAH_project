import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Fingerprint, 
  ShieldCheck, 
  Camera, 
  Edit3,
  ExternalLink,
  Lock,
  Smartphone
} from 'lucide-react';
import Card from '../../components/Card';
import { cn } from '../../lib/utils';

export default function UserProfile() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header Profile Section */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-primary/20 via-surface-raised to-surface-base rounded-sm border border-border-subtle overflow-hidden relative">
           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(var(--color-border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--color-border-subtle)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        
        <div className="px-8 -mt-16 flex flex-col md:flex-row items-end gap-6 relative z-10">
          <div className="relative group">
            <div className="w-32 h-32 rounded-sm bg-surface-top border-4 border-surface-base shadow-2xl overflow-hidden">
               <div className="w-full h-full flex items-center justify-center bg-surface-raised">
                  <User className="w-16 h-16 text-slate-700" />
               </div>
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-primary text-black rounded shadow-lg hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="pb-2 flex-1">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-1">Cpt. Alex Johnson</h2>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded bg-primary/5 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-widest">Employee ID: VG-2044-X</span>
              <span className="px-3 py-1 rounded bg-surface-raised border border-border-subtle text-[9px] font-black text-slate-400 uppercase tracking-widest">Operations | Tier 04</span>
            </div>
          </div>

          <div className="pb-2 flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-raised border border-border-subtle hover:border-slate-700 text-slate-300 rounded font-black text-[10px] uppercase tracking-widest transition-all">
              <Edit3 className="w-3.5 h-3.5" />
              Modify Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Identity Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8">
            <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-8 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-primary" />
              Core Identity Specs
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: 'Full Legal Identity', value: 'Alex Montgomery Johnson', icon: User },
                { label: 'Secure Comms Address', value: 'a.johnson@visionguard.nexus', icon: Mail },
                { label: 'Secure Signal Link', value: '+1 (555) 902-1044', icon: Phone },
                { label: 'Nexus Department', value: 'Neural Infrastructure / OPS', icon: Building },
                { label: 'Current Assignment', value: 'HQ - Sector 7', icon: Smartphone },
              ].map((field, i) => (
                <div key={i} className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                    <field.icon className="w-3 h-3" />
                    {field.label}
                  </label>
                  <p className="text-[12px] font-bold text-slate-200 uppercase tracking-widest border-b border-border-subtle/50 pb-2">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 border-border-subtle">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-success" />
                Auth Security Integrity
              </h3>
              <span className="text-[9px] font-black text-success uppercase tracking-[0.2em] px-2 py-0.5 rounded border border-success/20 bg-success/5 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-success" />
                Hardened
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-surface-base border border-border-subtle rounded-sm flex items-center justify-between group hover:border-slate-700 transition-all cursor-pointer">
                <div>
                   <p className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">Two-Factor Authenticator</p>
                   <p className="text-[9px] font-bold text-slate-600 uppercase">Status: Enabled & Verified</p>
                </div>
                <Smartphone className="w-4 h-4 text-slate-700 group-hover:text-primary transition-colors" />
              </div>
              <div className="p-4 bg-surface-base border border-border-subtle rounded-sm flex items-center justify-between group hover:border-slate-700 transition-all cursor-pointer">
                <div>
                   <p className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">Nexus Passphrase</p>
                   <p className="text-[9px] font-bold text-slate-600 uppercase">Rotation: 12 days remaining</p>
                </div>
                <Lock className="w-4 h-4 text-slate-700 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-8">
          <Card className="border-primary/20 bg-primary/5">
             <h3 className="text-[11px] font-black text-primary uppercase tracking-widest mb-6">Recognition Enrollment</h3>
             <div className="relative group cursor-pointer overflow-hidden rounded-sm border border-primary/20 mb-6 aspect-square bg-surface-base flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40 z-10" />
                <div className="z-0 w-full h-full flex items-center justify-center">
                  <User className="w-24 h-24 text-slate-800" />
                </div>
                {/* Scanner animation */}
                <div className="absolute inset-x-0 h-px bg-primary z-20 animate-[scan_3s_infinite]" />
                <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 text-center">
                   <p className="text-[10px] font-black text-white uppercase tracking-widest">Update Neural Facet Map</p>
                </div>
             </div>
             
             <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">
                    <span>Neural Mapping Depth</span>
                    <span>99.2%</span>
                  </div>
                  <div className="h-1 bg-surface-base rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '99.2%' }} className="h-full bg-primary" />
                  </div>
               </div>
               
               <div className="pt-4 flex flex-col gap-2">
                 <button className="w-full py-2.5 bg-primary text-black font-black uppercase tracking-widest rounded shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all text-[10px]">
                   Re-Index Face Map
                 </button>
                 <button className="w-full py-2.5 bg-surface-base border border-border-subtle text-slate-500 font-black uppercase tracking-widest rounded hover:bg-surface-raised transition-all text-[10px]">
                   View Enrollment Certificate
                 </button>
               </div>
             </div>
          </Card>

          <Card className="border-border-subtle">
             <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-4">Device Authorization</h3>
             <div className="space-y-3">
               {[
                 { device: 'Workstation NX-Alpha', location: 'London, UK', status: 'Authorized' },
                 { device: 'Nexus Phone v10', location: 'London, UK', status: 'Current' },
               ].map((dev, i) => (
                 <div key={i} className="p-3 bg-surface-base/50 rounded border border-border-subtle flex items-center justify-between">
                   <div>
                     <p className="text-[10px] font-bold text-slate-300 uppercase">{dev.device}</p>
                     <p className="text-[8px] font-bold text-slate-600 uppercase">{dev.location}</p>
                   </div>
                   <span className="text-[8px] font-black text-primary uppercase">{dev.status}</span>
                 </div>
               ))}
               <button className="w-full mt-2 text-[9px] font-bold text-slate-600 hover:text-slate-400 uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                 Manage Linked Transponders <ExternalLink className="w-3 h-3" />
               </button>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
