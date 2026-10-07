import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarX2, Heart, Ticket, Search, RefreshCw } from 'lucide-react';

export default function EmptyState({
  type = 'search',
  title,
  description,
  actionText,
  actionLink,
  onAction,
}) {
  let Icon = Search;
  let defaultTitle = 'No events found';
  let defaultDesc = 'Try adjusting your filters, location, or search terms to discover more events.';
  let defaultActionText = 'Reset Filters';

  if (type === 'favorites') {
    Icon = Heart;
    defaultTitle = 'No saved events yet';
    defaultDesc = 'When you find experiences you love, tap the heart icon to save them for later.';
    defaultActionText = 'Explore Events';
  } else if (type === 'tickets') {
    Icon = Ticket;
    defaultTitle = "You haven't registered for any events yet";
    defaultDesc = 'Discover exciting upcoming summits, concerts, and workshops, and claim your digital ticket.';
    defaultActionText = 'Discover Experiences';
  } else if (type === 'events') {
    Icon = CalendarX2;
    defaultTitle = 'No created events yet';
    defaultDesc = 'Ready to gather your community? Create your first event in minutes with custom ticketing.';
    defaultActionText = 'Create an Event';
  }

  return (
    <div className="bg-white rounded-3xl border border-mauve/25 p-10 sm:p-14 text-center max-w-lg mx-auto shadow-soft my-8">
      <div className="w-16 h-16 rounded-2xl bg-cream-surface text-berry mx-auto flex items-center justify-center mb-5 shadow-sm">
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="font-display font-bold text-xl text-navy mb-2">
        {title || defaultTitle}
      </h3>

      <p className="text-sm text-navy/70 leading-relaxed mb-6 max-w-sm mx-auto">
        {description || defaultDesc}
      </p>

      {onAction ? (
        <button
          onClick={onAction}
          className="spark-btn-primary text-sm py-2.5 px-6 inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          {actionText || defaultActionText}
        </button>
      ) : actionLink ? (
        <Link
          to={actionLink}
          className="spark-btn-primary text-sm py-2.5 px-6 inline-flex items-center gap-2"
        >
          {actionText || defaultActionText}
        </Link>
      ) : (
        <Link
          to="/events"
          className="spark-btn-primary text-sm py-2.5 px-6 inline-flex items-center gap-2"
        >
          {actionText || defaultActionText}
        </Link>
      )}
    </div>
  );
}
