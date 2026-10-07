import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCheck, Clock, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function NotificationPanel({ isOpen, onClose }) {
  const panelRef = useRef(null);
  const { notifications, unreadNotificationsCount, markNotificationAsRead, markAllNotificationsAsRead } = useApp();

  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-elevated border border-mauve/25 z-50 overflow-hidden animate-slide-down"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-cream-surface bg-cream-light/50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-berry" />
          <h3 className="font-semibold text-navy text-sm">Notifications</h3>
          {unreadNotificationsCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-bold bg-berry text-white rounded-full">
              {unreadNotificationsCount} new
            </span>
          )}
        </div>
        {unreadNotificationsCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="text-xs font-medium text-berry hover:text-berry-hover flex items-center gap-1 transition"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto divide-y divide-cream-surface">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-mauve">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-40 text-navy" />
            <p className="text-sm">You have no notifications yet.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-4 transition hover:bg-cream-surface/60 cursor-pointer flex gap-3 ${
                !item.read ? 'bg-peach/10' : ''
              }`}
            >
              <div className="mt-1 shrink-0">
                <span
                  className={`block w-2 h-2 rounded-full ${
                    !item.read ? 'bg-berry ring-4 ring-berry/20' : 'bg-transparent'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="text-xs font-bold text-navy truncate">{item.title}</h4>
                  <span className="text-[10px] text-mauve-dark flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-navy/80 leading-relaxed">{item.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 bg-cream-light text-center border-t border-cream-surface">
        <Link
          to="/my-tickets"
          onClick={onClose}
          className="text-xs font-semibold text-navy hover:text-berry inline-flex items-center gap-1 transition"
        >
          View Registered Passes
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
