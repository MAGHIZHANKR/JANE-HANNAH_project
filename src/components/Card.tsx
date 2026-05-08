import { ReactNode, ComponentType, HTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../lib/utils';

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export default function Card({ children, className, glow = false, ...props }: CardProps) {
  return (
    <motion.div
      {...props}
      initial={props.initial || { opacity: 0, y: 10 }}
      whileInView={props.whileInView || { opacity: 1, y: 0 }}
      viewport={props.viewport || { once: true }}
      className={cn(
        "bg-surface-top border border-border-subtle rounded-lg p-6 relative overflow-hidden group",
        className
      )}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: ComponentType<{ className?: string }>;
  color?: string;
}

export function StatCard({ title, value, change, icon: Icon, color = "primary" }: StatCardProps) {
  const textColorMap: Record<string, string> = {
    primary: "text-primary",
    success: "text-success",
    danger: "text-danger",
    amber: "text-amber-400",
  };

  return (
    <Card className="hover:border-slate-700 transition-colors">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
          {change && (
            <span className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded",
              change.startsWith('+') ? "text-success bg-success/10" : "text-danger bg-danger/10"
            )}>
              {change}
            </span>
          )}
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold text-white font-mono tracking-tighter">{value}</h3>
          <Icon className={cn("w-5 h-5 opacity-50", textColorMap[color] || "text-primary")} />
        </div>
        <div className="h-[2px] w-10 bg-primary mt-auto" />
      </div>
    </Card>
  );
}
