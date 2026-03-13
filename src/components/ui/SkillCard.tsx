import type { LucideIcon } from 'lucide-react';
import { Gamepad2, Box, Eye } from 'lucide-react';
import type { Skill } from '../../types';

const iconMap: Record<string, LucideIcon> = {
  Gamepad2,
  Box,
  Eye,
};

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const Icon = iconMap[skill.icon];

  return (
    <div className="card-hover group rounded-xl border border-white/5 bg-surface/50 p-6 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent/40 bg-accent/10 transition-all duration-300 group-hover:border-accent group-hover:bg-accent/20 group-hover:scale-110">
        {Icon && <Icon size={28} className="text-accent" />}
      </div>
      <h3 className="mb-2 text-lg font-light text-white">{skill.label}</h3>
      <p className="text-sm font-light text-white/55">{skill.description}</p>
    </div>
  );
}
