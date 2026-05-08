import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  Camera, 
  ShieldCheck, 
  Database,
  Cpu,
  Monitor,
  Smartphone,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { useState } from 'react';
import Card from '../components/Card';
import { cn } from '../lib/utils';

interface SettingsProps {
  userRole?: 'admin' | 'super_admin' | 'user';
}

export default function Settings({ userRole = 'admin' }: SettingsProps) {
  const [sensitivity, setSensitivity] = useState(85);
  const [notifications, setNotifications] = useState(true);

  const isAdmin = userRole === 'admin' || userRole === 'super_admin';

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">Nexus Configuration</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Personal & Protocol Management</p>
        </div>
        {isAdmin && (
          <button className="px-4 py-2 bg-surface-raised hover:bg-surface-top border border-border-subtle rounded-sm text-slate-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5" />
            System Reboot
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Settings - Admin only */}
          {isAdmin && (
            <Card className="rounded-sm border-border-subtle">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-widest">Neural Parameters</h3>
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] font-mono leading-none mt-1">Intelligence engine tuning</p>
                </div>
              </div>

              <div className="space-y-12">
                <div className="space-y-5">
                  <div className="flex justify-between items-center font-mono">
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">Detection Sensitivity</h4>
                      <p className="text-[9px] text-slate-600 font-bold uppercase mt-0.5">Threshold for identity verification</p>
                    </div>
                    <span className="text-xl font-bold text-primary tracking-tighter">{sensitivity}%</span>
                  </div>
                  <div className="px-2">
                    <input 
                      type="range" 
                      min="50" 
                      max="99" 
                      value={sensitivity} 
                      onChange={(e) => setSensitivity(parseInt(e.target.value))}
                      className="w-full h-1 bg-surface-base rounded-full appearance-none cursor-pointer accent-primary" 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 bg-surface-base border border-border-subtle rounded-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-surface-top flex items-center justify-center border border-border-subtle/50">
                      <ShieldCheck className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Neural Hashing</h4>
                      <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest mt-0.5">Active (SHA-512 Matrix)</p>
                    </div>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <div className="w-10 h-5 bg-success rounded-sm shadow-[0_0_10px_#4ade80]" />
                    <div className="absolute left-6 top-1.5 w-3.5 h-4 bg-white rounded-sm" />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* User Specific: Account Security */}
          {!isAdmin && (
            <Card className="rounded-sm border-border-subtle">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-widest">Account Security</h3>
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] font-mono leading-none mt-1">Credentials & Biometric Overrides</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-4 bg-surface-base border border-border-subtle rounded-sm">
                    <div>
                      <p className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">Change Access Code</p>
                      <p className="text-[8px] text-slate-600 uppercase">Update your terminal password</p>
                    </div>
                    <button className="px-3 py-1 bg-surface-raised border border-border-subtle text-[9px] font-black uppercase text-slate-400 hover:text-white transition-all">Modify</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-base border border-border-subtle rounded-sm">
                    <div>
                      <p className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">Face Map Preferences</p>
                      <p className="text-[8px] text-slate-600 uppercase">Manage how neural maps are stored</p>
                    </div>
                    <button className="px-3 py-1 bg-surface-raised border border-border-subtle text-[9px] font-black uppercase text-slate-400 hover:text-white transition-all">Configure</button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Interface & Notifications */}
          <Card className="rounded-sm border-border-subtle">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded bg-amber-400/10 flex items-center justify-center border border-amber-400/20">
                <Bell className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-widest">Communication</h3>
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] font-mono leading-none mt-1">Interface & telemetry</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => setNotifications(!notifications)}
                className={cn(
                  "p-5 rounded-sm border transition-all cursor-pointer group flex items-center justify-between font-mono",
                  notifications ? "bg-primary/5 border-primary/20" : "bg-surface-base border-border-subtle"
                )}
              >
                <div className="flex items-center gap-4 text-left">
                  <Bell className={cn("w-4 h-4 transition-transform", notifications ? "text-primary" : "text-slate-700")} />
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Alerts</h4>
                    <p className="text-[8px] text-slate-600 uppercase font-bold tracking-widest">Recognition Pings</p>
                  </div>
                </div>
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  notifications ? "bg-primary shadow-[0_0_8px_#00d4ff]" : "bg-slate-800"
                )} />
              </div>

              <div className="p-5 rounded-sm border border-border-subtle bg-surface-base flex items-center justify-between grayscale opacity-30 cursor-not-allowed font-mono">
                <div className="flex items-center gap-4 text-left">
                  <Sun className="w-4 h-4 text-slate-700" />
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Light Mod.</h4>
                    <p className="text-[8px] text-slate-700 uppercase font-bold tracking-widest">Restricted</p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-800" />
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Status Column */}
        <div className="space-y-6">
          <Card className="bg-surface-raised border-border-subtle/50 rounded-sm">
            <h4 className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-8 font-mono">Active Nodes</h4>
            <div className="space-y-6">
              {[
                { name: 'Terminal_Alpha', status: 'Online', icon: Monitor },
                { name: 'Nexus_Phone', status: 'Authorized', icon: Smartphone },
              ].map((device, i) => (
                <div key={i} className="flex items-center justify-between group font-mono">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-surface-base flex items-center justify-center text-slate-600 group-hover:text-primary transition-colors border border-border-subtle">
                      <device.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{device.name}</span>
                  </div>
                  <span className={cn(
                    "text-[8px] font-black uppercase px-2 py-0.5 rounded border tracking-[0.1em]",
                    device.status === 'Online' ? "bg-success/5 border-success/20 text-success" : "bg-primary/5 border-primary/20 text-primary"
                  )}>{device.status}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 rounded-sm border border-dashed border-border-subtle text-slate-600 hover:text-primary hover:border-primary/30 text-[9px] font-black uppercase tracking-[0.2em] transition-all font-mono">
              Link New Device +
            </button>
          </Card>

          <Card className="bg-surface-top border-border-subtle rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <SettingsIcon className="w-20 h-20 text-white rotate-12" />
            </div>
            <h4 className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] mb-1 font-mono">Build Manifest</h4>
            <p className="text-3xl font-black text-white italic tracking-tighter font-mono">v4.2.0-VGX</p>
            <div className="mt-6 pt-6 border-t border-border-subtle/50 text-[9px] font-bold text-slate-600 uppercase tracking-widest leading-loose font-mono">
              <p className="text-slate-400">Core Engine: VISIONGUARD-03</p>
              <p>Opti-Index: 12.05.2024</p>
              <p>Uptime: <span className="text-primary italic">99.98%</span></p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
