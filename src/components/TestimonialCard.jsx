import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-mauve/25 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between h-full relative group">
      <div>
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4 text-amber-500">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Content */}
        <p className="text-sm text-navy/85 leading-relaxed italic mb-6">
          "{testimonial.content}"
        </p>
      </div>

      <div className="pt-4 border-t border-cream-surface flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-berry/20"
          />
          <div>
            <h4 className="font-bold text-sm text-navy leading-tight">{testimonial.name}</h4>
            <p className="text-xs text-mauve-dark leading-tight">{testimonial.role}</p>
            <p className="text-[11px] text-berry font-medium mt-0.5">{testimonial.company}</p>
          </div>
        </div>

        <Quote className="w-6 h-6 text-mauve/30 group-hover:text-berry/30 transition-colors shrink-0" />
      </div>
    </div>
  );
}
