import {
  Gamepad2, Code2, Terminal, Box, Layers, Eye, MousePointer2,
  type LucideIcon,
} from 'lucide-react';
import { techStack, type TechCategory } from '../../data/site';

const iconMap: Record<string, LucideIcon> = {
  Gamepad2, Code2, Terminal, Box, Layers, Eye, MousePointer2,
};

const categoryColor: Record<TechCategory, string> = {
  engine:   'border-violet-500/30 bg-violet-500/10 text-violet-300',
  language: 'border-blue-500/30  bg-blue-500/10  text-blue-300',
  tool:     'border-accent/30    bg-accent/10    text-accent',
  design:   'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
};

export function TechBadges() {
  return (
    <div className="mt-14 border-t border-white/5 pt-10">
      <p className="mb-5 text-center text-xs font-light uppercase tracking-[0.25em] text-white/30">
        Technologies & Tools
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {techStack.map(({ label, icon, category }) => {
          const Icon = iconMap[icon];
          return (
            <span
              key={label}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-light transition-all duration-300 hover:scale-105 ${categoryColor[category]}`}
            >
              {Icon && <Icon size={14} />}
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
