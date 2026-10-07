import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Heart, ArrowUpRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function EventCard({ event }) {
  const { isFavorite, toggleFavorite } = useApp();
  const [imageError, setImageError] = useState(false);
  const favorited = isFavorite(event.id);

  // Fallback image using subtle gradient & pattern
  const fallbackSrc = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';

  const formatPrice = (price) => {
    if (price === 0 || price === '0' || price === 'Free') return 'Free';
    return `$${price}`;
  };

  return (
    <div className="spark-card group flex flex-col h-full overflow-hidden bg-white relative">
      {/* Image Container with zoom interaction */}
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-surface">
        <img
          src={imageError ? fallbackSrc : event.image}
          alt={event.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay for card contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-black/20 pointer-events-none" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/90 backdrop-blur-md text-navy shadow-sm">
            {event.categoryName || event.category}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${
              event.price === 0 || event.price === 'Free'
                ? 'bg-emerald-600 text-white'
                : 'bg-navy/90 text-white'
            }`}
          >
            {formatPrice(event.price)}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(event.id);
          }}
          className="absolute bottom-3 right-3 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-navy backdrop-blur-md transition-all shadow-sm hover:scale-110 active:scale-95"
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorited ? 'text-berry fill-berry' : 'text-navy hover:text-berry'
            }`}
          />
        </button>

        {/* Date Tag on lower left of image */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 text-xs font-semibold text-white bg-navy/80 backdrop-blur-md px-2.5 py-1 rounded-lg">
          <Calendar className="w-3.5 h-3.5 text-peach" />
          <span>{event.displayDate || event.date}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Location & Time Subheaders */}
          <div className="flex items-center gap-4 text-xs text-mauve-dark mb-2.5 font-medium">
            <span className="flex items-center gap-1 truncate max-w-[140px]">
              <MapPin className="w-3.5 h-3.5 text-berry shrink-0" />
              <span className="truncate">{event.location}</span>
            </span>
            <span className="flex items-center gap-1 truncate">
              <Clock className="w-3.5 h-3.5 text-navy shrink-0" />
              <span className="truncate">{event.time?.split('-')[0] || event.time}</span>
            </span>
          </div>

          {/* Event Title */}
          <h3 className="font-display font-bold text-base sm:text-lg text-navy leading-snug mb-2 group-hover:text-berry transition-colors line-clamp-2">
            <Link to={`/events/${event.id}`}>
              {event.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-navy/70 line-clamp-2 leading-relaxed mb-4">
            {event.description}
          </p>
        </div>

        {/* Card Footer: Attendees & Action Button */}
        <div className="pt-3 border-t border-cream-surface flex items-center justify-between gap-2 mt-auto">
          <div className="text-[11px] text-navy/60 font-medium">
            <span className="font-bold text-navy">{event.attendees || 0}</span> attending
          </div>

          <Link
            to={`/events/${event.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy group-hover:text-berry bg-cream-surface/70 group-hover:bg-berry/10 px-3.5 py-1.5 rounded-lg transition-colors"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
