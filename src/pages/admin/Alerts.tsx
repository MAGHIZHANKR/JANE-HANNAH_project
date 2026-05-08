import { motion } from 'motion/react';
import { ShieldAlert, MapPin, Clock, Eye, Trash2, CheckCircle, ExternalLink } from 'lucide-react';
import Card from '../../components/Card';
import { cn } from '../../lib/utils';

interface Alert {
  id: string;
  image: string;
  timestamp: string;
  location: string;
  status: 'pending' | 'investigating' | 'resolved';
  threatLevel: 'low' | 'medium' | 'high';
}

const ALERTS: Alert[] = [
  { id: 'AL-901', image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=500&q=80', timestamp: '14:22:10', location: 'Server Room Alpha', status: 'pending', threatLevel: 'high' },
  { id: 'AL-902', image: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=500&q=80', timestamp: '13:45:02', location: 'Main Entrance Lobby', status: 'investigating', threatLevel: 'medium' },
  { id: 'AL-903', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80', timestamp: '12:12:45', location: 'Parking P3 Exit', status: 'resolved', threatLevel: 'low' },
  { id: 'AL-904', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80', timestamp: '11:30:12', location: 'Executive Floor', status: 'pending', threatLevel: 'medium' },
  { id: 'AL-905', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80', timestamp: '09:12:55', location: 'Loading Bay West', status: 'resolved', threatLevel: 'low' },
  { id: 'AL-906', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80', timestamp: '08:05:22', location: 'Research Lab 02', status: 'pending', threatLevel: 'high' },
];

export default function Alerts() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">Intelligence Matrix</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Breach Monitoring Segment: Active / Node-Nexus-01</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-danger/10 border border-danger/20 text-danger rounded flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">3 Critical Anomalies</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALERTS.map((alert) => (
          <div key={alert.id}>
            <Card className="p-0 overflow-hidden border-border-subtle flex flex-col group h-full rounded-sm">
              {/* Image Header */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={alert.image} 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" 
                alt="Detected unknown person"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-transparent to-transparent" />
              
              {/* Scan Overlay Effect */}
              <div className="absolute inset-0 border border-primary/20 m-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary" />
              </div>

              {/* Status & Threat Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className={cn(
                  "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border backdrop-blur-md",
                  alert.threatLevel === 'high' ? "bg-danger border-danger text-white" :
                  alert.threatLevel === 'medium' ? "bg-amber-400 border-amber-400 text-black" :
                  "bg-success border-success text-black"
                )}>
                  {alert.threatLevel} PRIORITY
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="font-mono">
                  <h4 className="text-xl font-bold text-white uppercase tracking-tighter">{alert.id}</h4>
                  <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                    <MapPin className="w-3 h-3 text-primary" />
                    {alert.location}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="flex items-center gap-1 justify-end text-[9px] text-slate-500 font-bold uppercase">
                    <Clock className="w-2.5 h-2.5" />
                    T-{alert.timestamp}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-5 bg-surface-raised border-t border-border-subtle space-y-4">
              <div className="flex justify-between items-center font-mono">
                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">System Status</span>
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5",
                  alert.status === 'pending' ? "text-danger" :
                  alert.status === 'investigating' ? "text-primary" :
                  "text-success"
                )}>
                  {alert.status === 'pending' && <div className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />}
                  {alert.status}
                </span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-surface-base hover:bg-surface-top text-slate-400 hover:text-slate-100 text-[10px] font-bold uppercase tracking-widest transition-all border border-border-subtle">
                  <Eye className="w-3.5 h-3.5" />
                  Inspect
                </button>
                {alert.status !== 'resolved' ? (
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-primary hover:bg-primary/90 text-black text-[10px] font-bold uppercase tracking-widest transition-all">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verify
                  </button>
                ) : (
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-surface-base text-slate-600 text-[10px] font-bold uppercase tracking-widest transition-all border border-border-subtle cursor-not-allowed">
                    Archived
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
                <button className="p-2 rounded bg-danger/5 hover:bg-danger text-danger hover:text-white border border-danger/20 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Card>
        </div>
        ))}
      </div>
    </div>
  );
}
