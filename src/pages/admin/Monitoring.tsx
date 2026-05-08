import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Users, ShieldAlert, Play, Square, Fullscreen, Maximize, Scan, Target, Info } from 'lucide-react';
import Card from '../../components/Card';
import { cn } from '../../lib/utils';

export default function Monitoring() {
  const [isActive, setIsActive] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [detectedFaces, setDetectedFaces] = useState<any[]>([]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Randomly simulate detections
        if (Math.random() > 0.7) {
          const newFace = {
            id: Math.random(),
            x: 20 + Math.random() * 50,
            y: 20 + Math.random() * 50,
            width: 15 + Math.random() * 10,
            height: 20 + Math.random() * 10,
            label: Math.random() > 0.2 ? 'User: Alex Johnson' : 'UNKNOWN PERSON',
            confidence: (95 + Math.random() * 4).toFixed(1),
            type: Math.random() > 0.2 ? 'registered' : 'unknown'
          };
          setDetectedFaces(prev => [...prev.slice(-2), newFace]);
        }
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setDetectedFaces([]);
    }
  }, [isActive]);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">Active Surveillance</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Monitoring node VG-Nexus-01 • Camera Feed: Main_Gate_01</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 bg-surface-raised border rounded",
            isActive ? "border-success/20 text-success" : "border-danger/20 text-danger"
          )}>
            <div className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-success shadow-[0_0_8px_#4ade80]" : "bg-danger")} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{isActive ? "Protocol Active" : "Stream Offline"}</span>
          </div>
          <button 
            onClick={() => setIsActive(!isActive)}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded text-[11px] uppercase tracking-widest font-black transition-all",
              isActive 
                ? "bg-danger hover:bg-danger/90 text-white" 
                : "bg-primary hover:bg-primary/90 text-black"
            )}
          >
            {isActive ? <><Square className="w-4 h-4 fill-current" /> Stop Process</> : <><Play className="w-4 h-4 fill-current" /> Start Process</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Feed Container */}
        <div className="xl:col-span-3 space-y-4">
          <Card className="p-0 border-border-subtle aspect-video relative group overflow-hidden bg-black rounded-sm">
            <AnimatePresence>
              {!isActive ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-surface-base/90 z-20 backdrop-blur-md"
                >
                  <div className="w-16 h-16 rounded bg-surface-raised flex items-center justify-center border border-border-subtle mb-4">
                    <Camera className="w-6 h-6 text-slate-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Connection Protocol Required</h3>
                  <p className="text-slate-600 text-[10px] mt-2 font-bold uppercase tracking-tighter">Waiting for encrypted stream handshake...</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-10"
                >
                  {/* Fake Video Feed (Static but with noise) */}
                  <div className="absolute inset-0 bg-[#00d4ff]/5 opacity-20 mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                  
                  {/* Scanning Line Overlay */}
                  {scanning && (
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-0 w-full h-[1px] bg-primary/40 shadow-[0_0_10px_#00d4ff] z-20 pointer-events-none"
                    />
                  )}

                  {/* Recognition Overlays */}
                  {detectedFaces.map((face) => (
                    <motion.div
                      key={face.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.1, opacity: 0 }}
                      className="absolute border transition-all duration-300"
                      style={{
                        left: `${face.x}%`,
                        top: `${face.y}%`,
                        width: `${face.width}%`,
                        height: `${face.height}%`,
                        borderColor: face.type === 'registered' ? '#4ade80' : '#ff4d4d'
                      }}
                    >
                      {/* Corner Accents */}
                      <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-inherit" />
                      <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-inherit" />
                      <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-inherit" />
                      <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-inherit" />
                      
                      {/* Label */}
                      <div className={cn(
                        "absolute -top-5 left-[-1px] px-2 py-0.5 whitespace-nowrap text-[9px] font-bold uppercase tracking-tighter shadow-xl border",
                        face.type === 'registered' ? "bg-success border-success text-black" : "bg-danger border-danger text-white"
                      )}>
                        {face.label} • {face.confidence}%
                      </div>
                    </motion.div>
                  ))}

                  {/* UI Elements Overlay */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2 z-20 font-mono">
                    <div className="flex items-center gap-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-sm">
                      <div className="w-1 h-1 rounded-full bg-danger animate-pulse" />
                      <span className="text-[9px] text-white font-bold">FE_STREAM: 0192-X</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-sm">
                      <span className="text-[9px] text-white/50 font-bold uppercase">SEC_TIME: {new Date().toISOString().split('T')[1].slice(0, 8)}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                    <button className="p-1.5 bg-black/60 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors rounded-sm">
                      <Maximize className="w-3.5 h-3.5 text-white/70" />
                    </button>
                    <button className="p-1.5 bg-black/60 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors rounded-sm">
                      <Target className="w-3.5 h-3.5 text-white/70" />
                    </button>
                  </div>

                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1541888941297-182037f3dc09?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125 opacity-20" />
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Controls Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center gap-2 p-5 rounded bg-surface-raised border border-border-subtle hover:border-primary/50 transition-all group">
              <Scan className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scan Map</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-5 rounded bg-surface-raised border border-border-subtle hover:border-primary/50 transition-all group">
              <Users className="w-4 h-4 text-success group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Registry</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-5 rounded bg-surface-raised border border-border-subtle hover:border-primary/50 transition-all group">
              <ShieldAlert className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Zones</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-5 rounded bg-surface-raised border border-border-subtle hover:border-primary/50 transition-all group">
              <Info className="w-4 h-4 text-primary/80 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Logs</span>
            </button>
          </div>
        </div>

        {/* Sidebar Diagnostics */}
        <div className="space-y-6">
          <Card className="bg-surface-top border-border-subtle">
            <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Correlation Matrix
            </h3>
            <div className="space-y-6 font-mono">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500 uppercase font-bold tracking-tight">Match Threshold</span>
                  <span className="text-primary font-bold">85.0%</span>
                </div>
                <div className="h-1 bg-surface-base rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%] shadow-[0_0_8px_#00d4ff]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500 uppercase font-bold tracking-tight">Signal Latency</span>
                  <span className="text-success font-bold">12ms</span>
                </div>
                <div className="h-1 bg-surface-base rounded-full overflow-hidden">
                  <div className="h-full bg-success w-[12%]" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="flex flex-col p-0 overflow-hidden border-border-subtle">
            <div className="p-4 bg-surface-raised border-b border-border-subtle flex justify-between items-center">
              <h3 className="text-[10px] font-bold text-danger uppercase tracking-widest">Recent Matrix Logs</h3>
              <div className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
            </div>
            <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto font-mono">
              {detectedFaces.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-[10px] font-bold text-slate-700 uppercase tracking-tighter">Awaiting digital signature...</p>
                </div>
              ) : (
                detectedFaces.map((face, i) => (
                  <motion.div 
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    key={face.id} 
                    className={cn(
                      "p-3 rounded border flex items-center gap-3",
                      face.type === 'registered' ? "bg-success/5 border-success/10" : "bg-danger/5 border-danger/10"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded flex items-center justify-center",
                      face.type === 'registered' ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                    )}>
                      {face.type === 'registered' ? <Users className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-200 uppercase truncate max-w-[120px]">{face.label.split(': ')[1] || face.label}</h4>
                      <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">{face.confidence}% Signal</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
