import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Edit,
  Trash2,
  Eye,
  PlusCircle,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import Modal from '../components/Modal';
import EmptyState from '../components/EmptyState';
import { useApp } from '../context/AppContext';

export default function MyEvents() {
  const { events, createdEvents, deleteExistingEvent, updateExistingEvent } = useApp();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past' | 'draft'
  const [deleteModalEvent, setDeleteModalEvent] = useState(null);
  const [editModalEvent, setEditModalEvent] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    location: '',
    venue: '',
    date: '',
    price: 0,
    description: '',
  });

  // User's events are created events, or if none, we can show created events + some organizer events
  const myEventsList = createdEvents.length > 0
    ? createdEvents
    : events.filter((e) => e.organizer?.toLowerCase().includes('alex') || e.id.includes('custom'));

  // Separate into Upcoming, Past, Draft
  const currentDate = new Date().toISOString().split('T')[0];

  const drafts = myEventsList.filter((e) => e.isDraft);
  const upcoming = myEventsList.filter((e) => !e.isDraft && (e.date >= currentDate || !e.date));
  const past = myEventsList.filter((e) => !e.isDraft && e.date < currentDate);

  const currentList =
    activeTab === 'upcoming' ? upcoming : activeTab === 'past' ? past : drafts;

  const handleOpenEdit = (event) => {
    setEditModalEvent(event);
    setEditForm({
      title: event.title,
      location: event.location,
      venue: event.venue,
      date: event.date,
      price: event.price || 0,
      description: event.description,
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editModalEvent) return;
    updateExistingEvent(editModalEvent.id, {
      ...editModalEvent,
      ...editForm,
      price: Number(editForm.price),
    });
    setEditModalEvent(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteModalEvent) {
      deleteExistingEvent(deleteModalEvent.id);
      setDeleteModalEvent(null);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              Organizer Dashboard
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight">
              My Hosted Events
            </h1>
            <p className="text-sm text-navy/70 mt-1">
              Manage your published experiences, check registration numbers, and update drafts.
            </p>
          </div>

          <Link
            to="/create-event"
            className="spark-btn-primary text-xs py-3 px-5 self-start sm:self-auto shrink-0 shadow-berry-glow"
          >
            <PlusCircle className="w-4 h-4" />
            Host New Event
          </Link>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center gap-2 border-b border-mauve/20 mb-8 pb-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'upcoming'
                ? 'bg-navy text-white shadow-sm'
                : 'text-navy hover:bg-cream-surface'
            }`}
          >
            <span>Upcoming Events</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'upcoming' ? 'bg-berry text-white' : 'bg-cream text-navy'
              }`}
            >
              {upcoming.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'past'
                ? 'bg-navy text-white shadow-sm'
                : 'text-navy hover:bg-cream-surface'
            }`}
          >
            <span>Past Events</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'past' ? 'bg-berry text-white' : 'bg-cream text-navy'
              }`}
            >
              {past.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('draft')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'draft'
                ? 'bg-navy text-white shadow-sm'
                : 'text-navy hover:bg-cream-surface'
            }`}
          >
            <span>Drafts</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'draft' ? 'bg-berry text-white' : 'bg-cream text-navy'
              }`}
            >
              {drafts.length}
            </span>
          </button>
        </div>

        {/* Events List or Empty State */}
        {currentList.length === 0 ? (
          <EmptyState
            type="events"
            title={
              activeTab === 'draft'
                ? 'No draft events found'
                : activeTab === 'past'
                ? 'No past events to display'
                : 'You have not published any upcoming events yet'
            }
            description="Create an engaging summit, festival, or meetup to start connecting attendees."
            actionText="Create an Event"
            actionLink="/create-event"
          />
        ) : (
          <div className="space-y-4">
            {currentList.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-mauve/25 shadow-soft hover:shadow-card transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Event Thumbnail & Meta */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-cream-surface border border-mauve/20">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-berry/10 text-berry">
                        {event.categoryName || event.category}
                      </span>
                      {event.isDraft ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Draft Mode
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Published
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-base sm:text-lg text-navy truncate">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-navy/70 mt-1">
                      <span className="flex items-center gap-1 font-semibold text-navy">
                        <Calendar className="w-3.5 h-3.5 text-berry" />
                        {event.displayDate || event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-navy" />
                        {event.venue || event.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-mauve-dark mt-2 font-medium">
                      <span>
                        <strong className="text-navy">{event.attendees || 0}</strong> Registered
                      </span>
                      <span>•</span>
                      <span>
                        Capacity: <strong className="text-navy">{event.capacity || 100}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Price: <strong className="text-navy">{event.price === 0 ? 'Free' : `$${event.price}`}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <Link
                    to={`/events/${event.id}`}
                    className="p-2.5 rounded-xl bg-cream-surface hover:bg-cream text-navy transition shadow-xs"
                    title="View public details"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleOpenEdit(event)}
                    className="p-2.5 rounded-xl bg-white border border-mauve/30 text-navy hover:text-berry hover:border-berry transition shadow-xs"
                    title="Edit event details"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteModalEvent(event)}
                    className="p-2.5 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition shadow-xs"
                    title="Delete event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteModalEvent)}
        onClose={() => setDeleteModalEvent(null)}
        title="Delete Event?"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs">
            <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
            <div>
              <p className="font-bold">This action cannot be undone.</p>
              <p className="mt-0.5">
                Deleting <strong>"{deleteModalEvent?.title}"</strong> will remove it from discovery and cancel all associated tickets.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={() => setDeleteModalEvent(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-navy bg-cream-surface hover:bg-cream-dark/20 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Event Modal */}
      <Modal
        isOpen={Boolean(editModalEvent)}
        onClose={() => setEditModalEvent(null)}
        title={`Edit: ${editModalEvent?.title}`}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1">
              Event Title
            </label>
            <input
              type="text"
              required
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="spark-input text-xs py-2.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={editForm.date}
                onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                className="spark-input text-xs py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1">
                Ticket Price ($)
              </label>
              <input
                type="number"
                min="0"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                className="spark-input text-xs py-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1">
                City / Location
              </label>
              <input
                type="text"
                required
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                className="spark-input text-xs py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1">
                Venue
              </label>
              <input
                type="text"
                required
                value={editForm.venue}
                onChange={(e) => setEditForm({ ...editForm, venue: e.target.value })}
                className="spark-input text-xs py-2.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1">
              Summary Description
            </label>
            <textarea
              rows={3}
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="spark-input text-xs py-2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setEditModalEvent(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-navy bg-cream-surface hover:bg-cream-dark/20 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="spark-btn-primary text-xs py-2 px-6"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
