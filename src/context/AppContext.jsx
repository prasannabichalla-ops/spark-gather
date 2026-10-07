import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  initLocalStorage,
  getStoredEvents,
  getStoredCreatedEvents,
  saveCreatedEvent,
  deleteStoredEvent,
  getStoredFavorites,
  toggleStoredFavorite,
  getStoredTickets,
  addStoredTicket,
  removeStoredTicket,
  getStoredUser,
  saveStoredUser,
  getStoredAuth,
  setStoredAuth,
  getStoredNotifications,
  saveStoredNotifications,
} from '../utils/localStorage';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Initialize storage defaults on mount
  useEffect(() => {
    initLocalStorage();
  }, []);

  // State
  const [events, setEvents] = useState(() => getStoredEvents());
  const [createdEvents, setCreatedEvents] = useState(() => getStoredCreatedEvents());
  const [favorites, setFavorites] = useState(() => getStoredFavorites());
  const [tickets, setTickets] = useState(() => getStoredTickets());
  const [user, setUser] = useState(() => getStoredUser());
  const [auth, setAuth] = useState(() => getStoredAuth());
  const [notifications, setNotifications] = useState(() => getStoredNotifications());
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast Helper
  const addToast = ({ title, message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Favorites
  const isFavorite = (eventId) => favorites.includes(eventId);

  const toggleFavorite = (eventId) => {
    const updated = toggleStoredFavorite(eventId);
    setFavorites(updated);
    const ev = events.find((e) => e.id === eventId);
    const evTitle = ev ? ev.title : 'Event';

    if (updated.includes(eventId)) {
      addToast({
        title: 'Saved to Favorites',
        message: `"${evTitle}" has been added to your saved list.`,
        type: 'success',
      });
    } else {
      addToast({
        title: 'Removed from Favorites',
        message: `"${evTitle}" was removed from your saved list.`,
        type: 'info',
      });
    }
  };

  // Registration & Tickets
  const isRegistered = (eventId) => tickets.some((t) => t.eventId === eventId);

  const registerForEvent = (event, customTier = null) => {
    if (isRegistered(event.id)) {
      addToast({
        title: 'Already Registered',
        message: `You already hold a ticket for "${event.title}".`,
        type: 'info',
      });
      return false;
    }

    const ticketCode = `SG-${event.category.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTicket = {
      id: `tkt-${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      eventImage: event.image,
      category: event.category,
      categoryName: event.categoryName || event.category,
      date: event.date,
      displayDate: event.displayDate || event.date,
      time: event.time,
      location: event.location,
      venue: event.venue,
      attendeeName: user.name || 'Alex Rivera',
      attendeeEmail: user.email || 'alex.rivera@example.com',
      ticketType: customTier || event.ticketType || 'General Admission',
      ticketCode,
      registeredAt: new Date().toISOString(),
      price: event.price || 0,
    };

    const updatedTickets = addStoredTicket(newTicket);
    setTickets(updatedTickets);

    // Update attendees count in local state
    const updatedEvents = events.map((e) =>
      e.id === event.id ? { ...e, attendees: (e.attendees || 0) + 1 } : e
    );
    setEvents(updatedEvents);

    // Add notification
    const newNotification = {
      id: `notif-${Date.now()}`,
      title: 'Registration Confirmed',
      message: `Your ticket for "${event.title}" is ready in My Tickets.`,
      time: 'Just now',
      read: false,
      type: 'success',
    };
    const updatedNotifs = [newNotification, ...notifications];
    setNotifications(updatedNotifs);
    saveStoredNotifications(updatedNotifs);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#AC3B61', '#123C69', '#EDC7B7'],
      });
    } catch {
      // safe fallback
    }

    addToast({
      title: 'Registration Confirmed!',
      message: `You're all set for "${event.title}". Check "My Tickets" to view your pass.`,
      type: 'success',
    });

    return true;
  };

  const cancelRegistration = (ticketId) => {
    const ticketToRemove = tickets.find((t) => t.id === ticketId || t.eventId === ticketId);
    const updated = removeStoredTicket(ticketId);
    setTickets(updated);

    if (ticketToRemove) {
      // Decrement attendees in events
      setEvents((prev) =>
        prev.map((e) =>
          e.id === ticketToRemove.eventId ? { ...e, attendees: Math.max(0, (e.attendees || 1) - 1) } : e
        )
      );

      addToast({
        title: 'Registration Cancelled',
        message: `Your registration for "${ticketToRemove.eventTitle}" was cancelled.`,
        type: 'info',
      });
    }
  };

  // Event Creation & Management
  const createNewEvent = (eventData) => {
    const id = `evt-custom-${Date.now()}`;
    const newEvent = {
      ...eventData,
      id,
      attendees: 1,
      createdAt: new Date().toISOString(),
      featured: false,
    };

    const updatedCreated = saveCreatedEvent(newEvent);
    setCreatedEvents(updatedCreated);
    setEvents(getStoredEvents());

    addToast({
      title: 'Event Created Successfully!',
      message: `"${newEvent.title}" is now published and live on Explore Events.`,
      type: 'success',
    });

    return newEvent;
  };

  const updateExistingEvent = (eventId, updatedData) => {
    const fullUpdated = { ...updatedData, id: eventId, updatedAt: new Date().toISOString() };
    const updatedCreated = saveCreatedEvent(fullUpdated);
    setCreatedEvents(updatedCreated);
    setEvents(getStoredEvents());

    addToast({
      title: 'Event Updated',
      message: `Changes to "${fullUpdated.title}" were saved.`,
      type: 'success',
    });
  };

  const deleteExistingEvent = (eventId) => {
    const ev = events.find((e) => e.id === eventId);
    const updated = deleteStoredEvent(eventId);
    setEvents(updated);
    setCreatedEvents(getStoredCreatedEvents());

    addToast({
      title: 'Event Deleted',
      message: `"${ev?.title || 'Event'}" has been permanently removed.`,
      type: 'warning',
    });
  };

  // Profile Management
  const updateProfile = (userData) => {
    const updated = { ...user, ...userData };
    saveStoredUser(updated);
    setUser(updated);
    addToast({
      title: 'Profile Updated',
      message: 'Your personal information and preferences have been saved.',
      type: 'success',
    });
  };

  // Auth Mocks
  const login = (email, name = 'Alex Rivera') => {
    const newAuth = { isAuthenticated: true, email };
    setStoredAuth(newAuth);
    setAuth(newAuth);
    const updatedUser = { ...user, email, name: name || user.name };
    saveStoredUser(updatedUser);
    setUser(updatedUser);

    addToast({
      title: 'Welcome Back!',
      message: `Signed in successfully as ${updatedUser.name}.`,
      type: 'success',
    });
  };

  const signup = (name, email) => {
    const newAuth = { isAuthenticated: true, email };
    setStoredAuth(newAuth);
    setAuth(newAuth);
    const updatedUser = { ...user, name, email };
    saveStoredUser(updatedUser);
    setUser(updatedUser);

    addToast({
      title: 'Account Created!',
      message: `Welcome to Spark Gather, ${name}! Your profile is ready.`,
      type: 'success',
    });
  };

  const logout = () => {
    const newAuth = { isAuthenticated: false, email: '' };
    setStoredAuth(newAuth);
    setAuth(newAuth);
    addToast({
      title: 'Logged Out',
      message: 'You have been signed out. Come back soon!',
      type: 'info',
    });
  };

  // Notifications Management
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const markNotificationAsRead = (id) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    saveStoredNotifications(updated);
  };

  const markAllNotificationsAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    saveStoredNotifications(updated);
    addToast({
      title: 'Notifications Cleared',
      message: 'All notifications marked as read.',
      type: 'info',
    });
  };

  return (
    <AppContext.Provider
      value={{
        events,
        createdEvents,
        favorites,
        tickets,
        user,
        auth,
        notifications,
        unreadNotificationsCount,
        toasts,
        searchQuery,
        setSearchQuery,
        addToast,
        removeToast,
        isFavorite,
        toggleFavorite,
        isRegistered,
        registerForEvent,
        cancelRegistration,
        createNewEvent,
        updateExistingEvent,
        deleteExistingEvent,
        updateProfile,
        login,
        signup,
        logout,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
