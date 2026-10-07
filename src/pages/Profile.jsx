import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Ticket,
  Heart,
  Bell,
  Settings,
  Shield,
  CheckCircle2,
  Save,
  Camera,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { user, updateProfile, favorites, tickets } = useApp();

  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'settings' | 'notifications'
  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Rivera',
    email: user?.email || 'alex.rivera@example.com',
    title: user?.title || 'Community Builder & Design Enthusiast',
    location: user?.location || 'San Francisco, CA',
    bio:
      user?.bio ||
      'Passionate about live tech summits, immersive sound installations, and connecting creative communities across the globe.',
    avatar:
      user?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    notificationsEmail: user?.notificationsEmail ?? true,
    notificationsPush: user?.notificationsPush ?? true,
    notificationsReminders: user?.notificationsReminders ?? true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Profile Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-mauve/25 shadow-card mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left relative overflow-hidden">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-peach/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative group shrink-0">
            <img
              src={formData.avatar}
              alt={formData.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-berry/20 shadow-md"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-navy">
                {formData.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-berry/10 text-berry">
                Verified Attendee
              </span>
            </div>

            <p className="text-xs font-semibold text-berry mb-2">{formData.title}</p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-mauve-dark mb-4">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-navy" />
                {formData.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-berry" />
                {formData.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-navy" />
                Member since 2025
              </span>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                to="/my-tickets"
                className="px-3.5 py-1.5 rounded-xl bg-cream-surface hover:bg-cream border border-mauve/20 text-xs font-bold text-navy flex items-center gap-1.5 transition"
              >
                <Ticket className="w-3.5 h-3.5 text-berry" />
                <span>{tickets.length} Registered Passes</span>
              </Link>

              <Link
                to="/favorites"
                className="px-3.5 py-1.5 rounded-xl bg-cream-surface hover:bg-cream border border-mauve/20 text-xs font-bold text-navy flex items-center gap-1.5 transition"
              >
                <Heart className="w-3.5 h-3.5 text-berry fill-berry/20" />
                <span>{favorites.length} Saved Events</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-mauve/20 mb-8 pb-1">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'personal'
                ? 'bg-navy text-white shadow-sm'
                : 'text-navy hover:bg-cream-surface'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Personal Information</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'notifications'
                ? 'bg-navy text-white shadow-sm'
                : 'text-navy hover:bg-cream-surface'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notification Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-navy text-white shadow-sm'
                : 'text-navy hover:bg-cream-surface'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Account Settings</span>
          </button>
        </div>

        {/* Tab Content Form */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-10 border border-mauve/25 shadow-soft space-y-6">
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-navy pb-2 border-b border-cream-surface">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="spark-input text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="spark-input text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                    Headline / Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="spark-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                    Location / City
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="spark-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  Avatar Photo URL
                </label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="spark-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1.5">
                  About Me / Bio
                </label>
                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  className="spark-input text-xs resize-y"
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-navy pb-2 border-b border-cream-surface">
                Notification Preferences
              </h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-2xl border border-mauve/20 bg-cream-surface/40 hover:bg-cream-surface cursor-pointer">
                  <div>
                    <h4 className="font-bold text-xs text-navy">Email Confirmations & Updates</h4>
                    <p className="text-xs text-mauve-dark">
                      Receive booking receipts, event venue changes, and host announcements.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name="notificationsEmail"
                    checked={formData.notificationsEmail}
                    onChange={handleChange}
                    className="w-4 h-4 accent-berry"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl border border-mauve/20 bg-cream-surface/40 hover:bg-cream-surface cursor-pointer">
                  <div>
                    <h4 className="font-bold text-xs text-navy">Push Reminders</h4>
                    <p className="text-xs text-mauve-dark">
                      24-hour and 2-hour alerts prior to registered event start times.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name="notificationsPush"
                    checked={formData.notificationsPush}
                    onChange={handleChange}
                    className="w-4 h-4 accent-berry"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl border border-mauve/20 bg-cream-surface/40 hover:bg-cream-surface cursor-pointer">
                  <div>
                    <h4 className="font-bold text-xs text-navy">Curated Weekly Digest</h4>
                    <p className="text-xs text-mauve-dark">
                      Handpicked events in your city across tech, music, and creative arts.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name="notificationsReminders"
                    checked={formData.notificationsReminders}
                    onChange={handleChange}
                    className="w-4 h-4 accent-berry"
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-navy pb-2 border-b border-cream-surface">
                Account & Security Settings
              </h3>

              <div className="p-4 rounded-2xl bg-cream-surface/50 border border-mauve/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-navy">Password & Authentication</h4>
                    <p className="text-xs text-mauve-dark">Last changed 2 months ago</p>
                  </div>
                  <span className="text-xs text-berry font-bold">Encrypted</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cream-surface/50 border border-mauve/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-navy">Local Storage Session</h4>
                    <p className="text-xs text-mauve-dark">All event data and ticket passes safely preserved locally in browser.</p>
                  </div>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-cream-surface flex justify-end">
            <button
              type="submit"
              className="spark-btn-primary text-xs py-3 px-8 shadow-berry-glow flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
