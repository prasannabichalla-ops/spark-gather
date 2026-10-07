import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, Award, MapPin } from 'lucide-react';

const STATS_DATA = [
  { id: 1, target: 10, suffix: 'K+', label: 'Curated Events', icon: Calendar, sublabel: 'Across 10 categories' },
  { id: 2, target: 50, suffix: 'K+', label: 'Active Attendees', icon: Users, sublabel: 'Connecting monthly' },
  { id: 3, target: 2, suffix: 'K+', label: 'Vetted Organizers', icon: Award, sublabel: 'High quality experiences' },
  { id: 4, target: 100, suffix: '+', label: 'Global Cities', icon: MapPin, sublabel: 'From local hubs to world capitals' },
];

function StatItem({ item, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 1600;
    const frameRate = 30;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    const step = item.target / totalFrames;
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      start += step;
      if (currentFrame >= totalFrames) {
        setCount(item.target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [isVisible, item.target]);

  const Icon = item.icon;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-mauve/25 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col items-center text-center group">
      <div className="w-12 h-12 rounded-xl bg-cream-surface text-berry group-hover:bg-berry group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6" />
      </div>

      <div className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight mb-1">
        {count}
        <span className="text-berry">{item.suffix}</span>
      </div>

      <div className="font-bold text-sm text-navy mb-1">{item.label}</div>
      <p className="text-xs text-mauve-dark">{item.sublabel}</p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-cream/40 border-y border-mauve/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-berry bg-berry/10 px-3 py-1 rounded-full">
            Impact in Numbers
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mt-3">
            Scale That Powers Unforgettable Moments
          </h2>
          <p className="text-sm text-navy/70 mt-2">
            From intimate boutique design workshops to 10,000-person tech expos, Spark Gather connects communities effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS_DATA.map((item) => (
            <StatItem key={item.id} item={item} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
