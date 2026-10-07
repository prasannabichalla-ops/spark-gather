import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Image as ImageIcon,
  DollarSign,
  Users,
  Building,
  Mail,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useApp } from '../context/AppContext';

const PRESET_IMAGES = [
  { label: 'Tech & Code', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Concert & Music', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Design Atelier', url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Keynote Summit', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Outdoor Gathering', url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80' },
];

export default function CreateEvent() {
  const navigate = useNavigate();
  const { createNewEvent, addToast, user } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    category: 'technology',
    description: '',
    longDescription: '',
    date: '',
    startTime: '10:00 AM',
    endTime: '05:00 PM',
    location: '',
    venue: '',
    image: PRESET_IMAGES[0].url,
    ticketType: 'General Admission',
    price: 0,
    isFree: true,
    capacity: 200,
    organizer: user?.name || 'Alex Rivera',
    organizerRole: 'Event Host',
    contactEmail: user?.email || 'alex.rivera@example.com',
    eventType: 'In-Person',
    isDraft: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // clear error for field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Event Name is required';
    if (!formData.description.trim()) errs.description = 'Short description is required';
    if (!formData.date) errs.date = 'Event date is required';
    if (!formData.location.trim()) errs.location = 'City / Location is required';
    if (!formData.venue.trim()) errs.venue = 'Venue name is required';
    if (!formData.organizer.trim()) errs.organizer = 'Organizer name is required';
    if (!formData.contactEmail.trim() || !formData.contactEmail.includes('@')) {
      errs.contactEmail = 'Valid contact email is required';
    }
    if (!formData.isFree && (formData.price < 0 || isNaN(formData.price))) {
      errs.price = 'Please specify a valid ticket price';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (asDraft = false) => {
    if (!asDraft && !validate()) {
      addToast({
        title: 'Incomplete Form',
        message: 'Please resolve the highlighted fields before publishing.',
        type: 'warning',
      });
      return;
    }

    const categoryObj = CATEGORIES.find((c) => c.id === formData.category);
    const eventPayload = {
      ...formData,
      categoryName: categoryObj ? categoryObj.name : 'General',
      time: `${formData.startTime} - ${formData.endTime}`,
      price: formData.isFree ? 0 : Number(formData.price),
      capacity: Number(formData.capacity) || 100,
      isDraft: asDraft,
      displayDate: formData.date
        ? new Date(formData.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : 'TBD',
      highlights: [
        `Live access with ${formData.ticketType}`,
        `Networking reception hosted by ${formData.organizer}`,
        `Full venue access at ${formData.venue}`,
      ],
      schedule: [
        { time: formData.startTime, title: 'Check-in & Welcome Session' },
        { time: '12:30 PM', title: 'Keynote & Community Discussion' },
        { time: formData.endTime, title: 'Closing Networking & Wrap-up' },
      ],
      speakers: [
        {
          name: formData.organizer,
          role: formData.organizerRole || 'Event Host',
          avatar:
            user?.avatar ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        },
      ],
    };

    createNewEvent(eventPayload);
    navigate(asDraft ? '/my-events' : '/events');
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-berry/10 text-berry text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Host with Spark Gather
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight">
            Create an Event
          </h1>
          <p className="text-sm text-navy/70 mt-1">
            Publish your gathering to thousands of eager attendees. Complete the details below.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-mauve/25 shadow-card space-y-8">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-navy pb-2 border-b border-cream-surface">
              1. Basic Information
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                Event Name *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. NextGen Web & AI Summit 2026"
                className={`spark-input ${errors.title ? 'border-rose-400 ring-1 ring-rose-300' : ''}`}
              />
              {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="spark-input"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  Event Format / Type
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="spark-input"
                >
                  <option value="In-Person">In-Person</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Conference">Conference</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Festival">Festival</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                Short Description (Card Summary) *
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief 1-2 sentence hook for the event card"
                className={`spark-input ${errors.description ? 'border-rose-400 ring-1 ring-rose-300' : ''}`}
              />
              {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                Full Event Description
              </label>
              <textarea
                name="longDescription"
                rows={4}
                value={formData.longDescription}
                onChange={handleChange}
                placeholder="Elaborate on the topics covered, who should attend, and what makes this gathering unique..."
                className="spark-input resize-y"
              />
            </div>
          </div>

          {/* Section 2: Date, Time & Venue */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-navy pb-2 border-b border-cream-surface">
              2. Date & Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`spark-input ${errors.date ? 'border-rose-400 ring-1 ring-rose-300' : ''}`}
                />
                {errors.date && <p className="text-xs text-rose-500 mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  Start Time
                </label>
                <input
                  type="text"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  placeholder="e.g. 10:00 AM"
                  className="spark-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  End Time
                </label>
                <input
                  type="text"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  placeholder="e.g. 05:00 PM"
                  className="spark-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  City & State *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco, CA"
                  className={`spark-input ${errors.location ? 'border-rose-400 ring-1 ring-rose-300' : ''}`}
                />
                {errors.location && <p className="text-xs text-rose-500 mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  Venue Name *
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="e.g. Moscone Center, Level 2"
                  className={`spark-input ${errors.venue ? 'border-rose-400 ring-1 ring-rose-300' : ''}`}
                />
                {errors.venue && <p className="text-xs text-rose-500 mt-1">{errors.venue}</p>}
              </div>
            </div>
          </div>

          {/* Section 3: Visual Imagery */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-navy pb-2 border-b border-cream-surface">
              3. Event Banner Image
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="spark-input"
              />
            </div>

            <div>
              <label className="block text-xs text-mauve-dark mb-2">Or select from high-res presets:</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, image: preset.url }))}
                    className={`relative rounded-xl overflow-hidden border aspect-video transition ${
                      formData.image === preset.url
                        ? 'border-berry ring-2 ring-berry/40'
                        : 'border-mauve/30 hover:opacity-90'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-navy/80 text-[10px] text-white py-0.5 truncate px-1 text-center font-medium">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Tickets & Capacity */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-navy pb-2 border-b border-cream-surface">
              4. Tickets & Capacity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  Ticket Tier Name
                </label>
                <input
                  type="text"
                  name="ticketType"
                  value={formData.ticketType}
                  onChange={handleChange}
                  placeholder="e.g. General Admission"
                  className="spark-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  Price ($ USD)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    disabled={formData.isFree}
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    className="spark-input disabled:bg-cream-surface/60"
                  />
                  <div className="mt-1.5 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isFree"
                      name="isFree"
                      checked={formData.isFree}
                      onChange={handleChange}
                      className="accent-berry"
                    />
                    <label htmlFor="isFree" className="text-xs text-navy/80 cursor-pointer">
                      Free Event
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  Maximum Attendees
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  className="spark-input"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Organizer Information */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-navy pb-2 border-b border-cream-surface">
              5. Organizer Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  Organizer / Host Name *
                </label>
                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  className={`spark-input ${errors.organizer ? 'border-rose-400 ring-1 ring-rose-300' : ''}`}
                />
                {errors.organizer && <p className="text-xs text-rose-500 mt-1">{errors.organizer}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  Contact Email *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className={`spark-input ${errors.contactEmail ? 'border-rose-400 ring-1 ring-rose-300' : ''}`}
                />
                {errors.contactEmail && <p className="text-xs text-rose-500 mt-1">{errors.contactEmail}</p>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-cream-surface flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              className="spark-btn-secondary w-full sm:w-auto text-xs py-3 px-6"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(false)}
              className="spark-btn-primary w-full sm:w-auto text-xs py-3 px-8 shadow-berry-glow"
            >
              Publish & Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
