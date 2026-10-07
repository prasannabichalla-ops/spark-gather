import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Cpu,
  Music,
  GraduationCap,
  Palette,
  Briefcase,
  Sparkles,
  Trophy,
  Users,
  Film,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';

const ICON_MAP = {
  Cpu,
  Music,
  GraduationCap,
  Palette,
  Briefcase,
  Sparkles,
  Trophy,
  Users,
  Film,
  HeartHandshake,
};

export default function CategoryCard({ category, active = false, onClick = null }) {
  const navigate = useNavigate();
  const IconComponent = ICON_MAP[category.icon] || Sparkles;

  const handleClick = () => {
    if (onClick) {
      onClick(category.id);
    } else {
      navigate(`/events?category=${category.id}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`group text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden ${
        active
          ? 'bg-navy text-white border-navy shadow-elevated scale-[1.02]'
          : 'bg-white hover:bg-cream-surface/60 border-mauve/25 shadow-soft hover:shadow-card hover:-translate-y-1 text-navy'
      }`}
    >
      {/* Background tint accent */}
      <div
        className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10 pointer-events-none transition-transform duration-300 group-hover:scale-125"
        style={{ backgroundColor: category.color || '#123C69' }}
      />

      <div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
            active
              ? 'bg-white/10 text-peach'
              : 'bg-cream-surface text-berry'
          }`}
          style={{ backgroundColor: !active ? category.bgColor : undefined }}
        >
          <IconComponent className="w-6 h-6" />
        </div>

        <h3
          className={`font-display font-bold text-base mb-1 transition-colors ${
            active ? 'text-white' : 'text-navy group-hover:text-berry'
          }`}
        >
          {category.name}
        </h3>

        <p
          className={`text-xs line-clamp-2 leading-relaxed ${
            active ? 'text-cream/80' : 'text-mauve-dark'
          }`}
        >
          {category.description}
        </p>
      </div>

      <div
        className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
          active ? 'border-white/10 text-peach' : 'border-cream-surface text-navy/60'
        }`}
      >
        <span>{category.count}+ Events</span>
        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-berry">
          Explore <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </button>
  );
}
