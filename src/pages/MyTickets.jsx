import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ArrowRight, Sparkles } from 'lucide-react';
import TicketCard from '../components/TicketCard';
import EmptyState from '../components/EmptyState';
import { useApp } from '../context/AppContext';

export default function MyTickets() {
  const { tickets } = useApp();

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-berry/10 text-berry text-xs font-bold uppercase tracking-wider mb-2">
              <Ticket className="w-3.5 h-3.5" />
              Digital Passes
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight">
              My Event Tickets
            </h1>
            <p className="text-sm text-navy/70 mt-1">
              Your confirmed digital passes with entry barcodes, venue details, and download options.
            </p>
          </div>

          <Link
            to="/events"
            className="spark-btn-secondary text-xs py-2.5 px-5 self-start sm:self-auto shrink-0 flex items-center gap-2"
          >
            <span>Discover More Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Tickets Grid or Empty State */}
        {tickets.length === 0 ? (
          <EmptyState
            type="tickets"
            title="You haven't registered for any events yet"
            description="Explore our curated collection of summits, concerts, hackathons, and design workshops to claim your first pass."
            actionText="Browse Events"
            actionLink="/events"
          />
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
