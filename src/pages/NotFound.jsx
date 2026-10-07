import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home, Sparkles } from 'lucide-react';
import Logo from '../components/Logo';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-mauve/25 shadow-card relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-peach/25 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-cream-surface text-berry mx-auto flex items-center justify-center mb-6 shadow-sm">
          <Compass className="w-8 h-8" />
        </div>

        <span className="font-mono text-sm font-bold uppercase tracking-widest text-berry bg-berry/10 px-3 py-1 rounded-full">
          404 Error
        </span>

        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-navy mt-4 mb-2">
          Looks like this event doesn't exist.
        </h1>

        <p className="text-xs sm:text-sm text-navy/70 leading-relaxed mb-8">
          The link you followed might be broken or the gathering has concluded. Let's get you back to discovering great experiences.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="spark-btn-primary w-full sm:w-auto text-xs py-3 px-6 shadow-berry-glow flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/events"
            className="spark-btn-secondary w-full sm:w-auto text-xs py-3 px-6 flex items-center justify-center gap-2"
          >
            <span>Explore Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
