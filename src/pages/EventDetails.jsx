import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  CheckCircle2,
  Ticket,
  Users,
  Building,
  ArrowLeft,
  Sparkles,
  Info,
  CalendarPlus,
} from 'lucide-react';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    events,
    isFavorite,
    toggleFavorite,
    isRegistered,
    registerForEvent,
    addToast,
    user,
  } = useApp();

  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Standard Pass');
  const [attendeeName, setAttendeeName] = useState(user?.name || 'Alex Rivera');
  const [attendeeEmail, setAttendeeEmail] = useState(user?.email || 'alex.rivera@example.com');

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="font-display font-bold text-2xl text-navy mb-2">Event Not Found</h2>
        <p className="text-sm text-navy/70 mb-6">
          The event you're looking for might have been moved or removed.
        </p>
        <Link to="/events" className="spark-btn-primary text-sm py-2.5 px-6">
          Browse All Events
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(event.id);
  const registered = isRegistered(event.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      title: 'Link Copied!',
      message: `Event link for "${event.title}" copied to clipboard.`,
      type: 'info',
    });
  };

  const handleRegisterConfirm = (e) => {
    e.preventDefault();
    const success = registerForEvent(event, selectedTier);
    if (success) {
      setRegisterModalOpen(false);
    }
  };

  const formatPrice = (price) => {
    if (price === 0 || price === '0' || price === 'Free') return 'Free';
    return `$${price}`;
  };

  const capacityPct = Math.min(
    100,
    Math.round(((event.attendees || 0) / (event.capacity || 100)) * 100)
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-xs font-bold text-navy hover:text-berry transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore Events
          </Link>
        </div>

        {/* Hero Banner Image */}
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[21/8] bg-cream-surface mb-8 border border-mauve/25 shadow-card">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-black/20" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-navy shadow-sm backdrop-blur-md">
              {event.categoryName || event.category}
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-navy/80 text-peach shadow-sm backdrop-blur-md">
              {event.eventType || 'In-Person'}
            </span>
          </div>

          {/* Action floating buttons top right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(event.id)}
              className="p-3 rounded-full bg-white/90 hover:bg-white text-navy backdrop-blur-md shadow-sm transition hover:scale-105 active:scale-95"
              aria-label={favorited ? 'Saved in favorites' : 'Save to favorites'}
            >
              <Heart
                className={`w-5 h-5 ${
                  favorited ? 'text-berry fill-berry' : 'text-navy hover:text-berry'
                }`}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-full bg-white/90 hover:bg-white text-navy backdrop-blur-md shadow-sm transition hover:scale-105 active:scale-95"
              aria-label="Share event"
            >
              <Share2 className="w-5 h-5 text-navy hover:text-berry" />
            </button>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-peach mb-2">
              <Calendar className="w-4 h-4 text-peach" />
              <span>{event.displayDate || event.date}</span>
              <span>•</span>
              <Clock className="w-4 h-4 text-peach" />
              <span>{event.time}</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Main Content Layout (2 columns: Details vs Registration Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Full Description, Highlights, Schedule, Speakers */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Metadata Bar */}
            <div className="bg-white rounded-2xl p-5 border border-mauve/25 shadow-soft grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-cream-surface text-berry flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-mauve-dark">
                    Date & Time
                  </span>
                  <p className="text-xs font-bold text-navy">{event.displayDate || event.date}</p>
                  <p className="text-[11px] text-navy/70">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-cream-surface text-navy flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-mauve-dark">
                    Location & Venue
                  </span>
                  <p className="text-xs font-bold text-navy">{event.location}</p>
                  <p className="text-[11px] text-navy/70 truncate max-w-[170px]">{event.venue}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-cream-surface text-berry flex items-center justify-center shrink-0">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-mauve-dark">
                    Ticket Type
                  </span>
                  <p className="text-xs font-bold text-navy">
                    {formatPrice(event.price)}
                  </p>
                  <p className="text-[11px] text-navy/70">{event.ticketType || 'Standard Access'}</p>
                </div>
              </div>
            </div>

            {/* About the Event */}
            <div className="bg-white rounded-3xl p-7 border border-mauve/25 shadow-soft space-y-4">
              <h2 className="font-display font-bold text-2xl text-navy">About This Event</h2>
              <p className="text-sm text-navy/80 leading-relaxed whitespace-pre-line">
                {event.longDescription || event.description}
              </p>
            </div>

            {/* Key Event Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="bg-white rounded-3xl p-7 border border-mauve/25 shadow-soft space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-berry" />
                  <h2 className="font-display font-bold text-2xl text-navy">Event Highlights</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {event.highlights.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-cream-surface/50 border border-mauve/20"
                    >
                      <CheckCircle2 className="w-4 h-4 text-berry shrink-0 mt-0.5" />
                      <span className="text-xs text-navy/90 font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Schedule / Agenda */}
            {event.schedule && event.schedule.length > 0 && (
              <div className="bg-white rounded-3xl p-7 border border-mauve/25 shadow-soft space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-navy" />
                  <h2 className="font-display font-bold text-2xl text-navy">Schedule & Agenda</h2>
                </div>
                <div className="divide-y divide-cream-surface pt-2">
                  {event.schedule.map((item, idx) => (
                    <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                      <span className="font-mono text-xs font-bold text-berry bg-berry/10 px-2.5 py-1 rounded-lg shrink-0 w-28 text-center">
                        {item.time}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-navy">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="bg-white rounded-3xl p-7 border border-mauve/25 shadow-soft space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-berry" />
                  <h2 className="font-display font-bold text-2xl text-navy">Keynote Speakers</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {event.speakers.map((sp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3.5 p-4 rounded-2xl bg-cream-surface/60 border border-mauve/20"
                    >
                      <img
                        src={sp.avatar}
                        alt={sp.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-berry/20"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-navy">{sp.name}</h4>
                        <p className="text-xs text-mauve-dark">{sp.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organizer Card */}
            <div className="bg-cream-surface/50 rounded-3xl p-6 border border-mauve/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={
                    event.organizerAvatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
                  }
                  alt={event.organizer}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-navy/20"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-mauve-dark">
                    Presented By
                  </span>
                  <h4 className="font-display font-bold text-base text-navy">{event.organizer}</h4>
                  <p className="text-xs text-navy/70">{event.organizerRole || 'Official Host'}</p>
                </div>
              </div>

              <Link
                to="/contact"
                className="spark-btn-secondary text-xs py-2 px-4 whitespace-nowrap"
              >
                Contact Organizer
              </Link>
            </div>
          </div>

          {/* Right Column: Sticky Ticket Box & Registration Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-7 border border-mauve/30 shadow-card space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-mauve-dark">
                  Registration Fee
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-navy">
                    {formatPrice(event.price)}
                  </span>
                  {event.price > 0 && (
                    <span className="text-xs text-mauve-dark">/ attendee</span>
                  )}
                </div>
              </div>

              {/* Capacity Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-navy mb-2">
                  <span>Capacity Filled</span>
                  <span>{capacityPct}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-cream-surface overflow-hidden">
                  <div
                    className="h-full bg-berry rounded-full transition-all duration-500"
                    style={{ width: `${capacityPct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-mauve-dark mt-1.5">
                  <span>{event.attendees || 0} Registered</span>
                  <span>{event.capacity || 100} Total Seats</span>
                </div>
              </div>

              {/* CTA Registration Button */}
              {registered ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    You're Registered for this event!
                  </div>
                  <Link
                    to="/my-tickets"
                    className="spark-btn-navy w-full text-xs py-3 text-center"
                  >
                    View Your Ticket Pass
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => setRegisterModalOpen(true)}
                  className="spark-btn-primary w-full text-sm py-3.5"
                >
                  Register Now
                </button>
              )}

              {/* Secondary Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cream-surface">
                <button
                  onClick={() => toggleFavorite(event.id)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    favorited
                      ? 'bg-berry/10 border-berry text-berry'
                      : 'bg-white border-mauve/30 text-navy hover:bg-cream-surface'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-berry' : ''}`} />
                  <span>{favorited ? 'Saved' : 'Save Event'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="py-2 px-3 rounded-xl bg-white border border-mauve/30 text-navy hover:bg-cream-surface text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Perks list */}
              <div className="pt-2 text-xs text-navy/70 space-y-2 border-t border-cream-surface">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-berry" />
                  <span>Instant digital pass with QR code</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-berry" />
                  <span>Cancel registration anytime in My Tickets</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-berry" />
                  <span>Email confirmation & calendar invite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Register Modal */}
      <Modal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        title={`Register: ${event.title}`}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleRegisterConfirm} className="space-y-4">
          <div className="bg-cream-surface/60 p-4 rounded-2xl border border-mauve/20 text-xs text-navy">
            <div className="font-bold text-navy text-sm mb-1">{event.title}</div>
            <div>{event.displayDate || event.date} • {event.time}</div>
            <div className="text-mauve-dark">{event.venue}, {event.location}</div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
              Select Ticket Tier
            </label>
            <div className="space-y-2">
              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  selectedTier === 'Standard Pass'
                    ? 'border-berry bg-berry/5 text-navy font-semibold'
                    : 'border-mauve/30 hover:bg-cream-surface'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tier"
                    value="Standard Pass"
                    checked={selectedTier === 'Standard Pass'}
                    onChange={() => setSelectedTier('Standard Pass')}
                    className="accent-berry"
                  />
                  <span className="text-xs">Standard Pass ({event.ticketType || 'General'})</span>
                </div>
                <span className="text-xs font-bold text-navy">{formatPrice(event.price)}</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  selectedTier === 'VIP Delegate Pass'
                    ? 'border-berry bg-berry/5 text-navy font-semibold'
                    : 'border-mauve/30 hover:bg-cream-surface'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tier"
                    value="VIP Delegate Pass"
                    checked={selectedTier === 'VIP Delegate Pass'}
                    onChange={() => setSelectedTier('VIP Delegate Pass')}
                    className="accent-berry"
                  />
                  <span className="text-xs">VIP Delegate (Lounge & Priority Seating)</span>
                </div>
                <span className="text-xs font-bold text-berry">
                  {event.price === 0 ? 'Free Priority' : `$${(typeof event.price === 'number' ? event.price : 50) + 40}`}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
              Attendee Full Name
            </label>
            <input
              type="text"
              required
              value={attendeeName}
              onChange={(e) => setAttendeeName(e.target.value)}
              className="spark-input text-xs py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
              Confirmation Email Address
            </label>
            <input
              type="email"
              required
              value={attendeeEmail}
              onChange={(e) => setAttendeeEmail(e.target.value)}
              className="spark-input text-xs py-2.5"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setRegisterModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-navy bg-cream-surface hover:bg-cream-dark/20 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="spark-btn-primary text-xs py-2 px-6"
            >
              Confirm Registration
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
