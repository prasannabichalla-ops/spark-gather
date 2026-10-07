import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import EmptyState from '../components/EmptyState';
import { useApp } from '../context/AppContext';

export default function Favorites() {
  const { events, favorites } = useApp();

  const savedEvents = events.filter((e) => favorites.includes(e.id));

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-berry/10 text-berry text-xs font-bold uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 fill-berry" />
              Saved Collection
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight">
              My Saved Events
            </h1>
            <p className="text-sm text-navy/70 mt-1">
              Events you have bookmarked to revisit, share, or register for later.
            </p>
          </div>

          <Link
            to="/events"
            className="spark-btn-secondary text-xs py-2.5 px-5 self-start sm:self-auto shrink-0 flex items-center gap-2"
          >
            <span>Explore More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid or Empty State */}
        {savedEvents.length === 0 ? (
          <EmptyState
            type="favorites"
            title="No saved events yet"
            description="When you find an experience that catches your eye, tap the heart icon to save it here for later."
            actionText="Explore Events"
            actionLink="/events"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {savedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
