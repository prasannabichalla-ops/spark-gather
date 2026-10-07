import { INITIAL_EVENTS } from '../data/events';

const STORAGE_KEYS = {
  EVENTS: 'spark_gather_events',
  FAVORITES: 'spark_gather_favorites',
  TICKETS: 'spark_gather_tickets',
  CREATED_EVENTS: 'spark_gather_created_events',
  USER: 'spark_gather_user',
  AUTH: 'spark_gather_auth',
  NOTIFICATIONS: 'spark_gather_notifications',
};

// Initial mock user
export const DEFAULT_USER = {
  id: 'usr-spark-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  title: 'Community Builder & Design Enthusiast',
  location: 'San Francisco, CA',
  bio: 'Passionate about live tech summits, immersive sound installations, and connecting creative communities across the globe.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  notificationsEmail: true,
  notificationsPush: true,
  notificationsReminders: true,
  joinedDate: 'March 2025',
};

// Initial mock notifications
export const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Registration Confirmed',
    message: 'Your registration for "TechNova 2026: Global Developer Summit" is confirmed. See you in San Francisco!',
    time: '2 hours ago',
    read: false,
    type: 'success',
  },
  {
    id: 'notif-2',
    title: 'New Workshop Near You',
    message: 'Creative Design Workshop: Editorial & Visual Systems was just added in your region.',
    time: 'Yesterday',
    read: false,
    type: 'info',
  },
  {
    id: 'notif-3',
    title: 'Upcoming Event Reminder',
    message: 'Your registered event "Campus Music Fest: Echoes & Starlight" starts in 2 weeks!',
    time: '3 days ago',
    read: true,
    type: 'alert',
  },
];

// Helper safe JSON parse
function getFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function setToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

// Seed initial state if needed
export function initLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    setToStorage(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
    // Seed initial favorites (e.g., event 1 and 3)
    setToStorage(STORAGE_KEYS.FAVORITES, ['evt-1', 'evt-3']);
  }
  if (!localStorage.getItem(STORAGE_KEYS.TICKETS)) {
    // Seed a couple of default registered tickets for Alex Rivera
    const initialTickets = [
      {
        id: 'tkt-spark-901',
        eventId: 'evt-1',
        eventTitle: 'TechNova 2026: Global Developer Summit',
        date: '2026-11-14',
        displayDate: 'Nov 14, 2026',
        time: '09:00 AM - 06:00 PM EST',
        location: 'San Francisco, CA',
        venue: 'Moscone West Convention Hall, Hall B',
        attendeeName: 'Alex Rivera',
        attendeeEmail: 'alex.rivera@example.com',
        ticketType: 'General Admission',
        ticketCode: 'SG-NOVA-882194',
        registeredAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        price: 199,
      },
      {
        id: 'tkt-spark-902',
        eventId: 'evt-3',
        eventTitle: 'Campus Music Fest: Echoes & Starlight',
        date: '2026-10-24',
        displayDate: 'Oct 24, 2026',
        time: '04:00 PM - 11:30 PM PST',
        location: 'Austin, TX',
        venue: 'Zilker Park Open Amphitheatre',
        attendeeName: 'Alex Rivera',
        attendeeEmail: 'alex.rivera@example.com',
        ticketType: 'Festival Pass',
        ticketCode: 'SG-ECHO-441092',
        registeredAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        price: 35,
      },
    ];
    setToStorage(STORAGE_KEYS.TICKETS, initialTickets);
  }
  if (!localStorage.getItem(STORAGE_KEYS.USER)) {
    setToStorage(STORAGE_KEYS.USER, DEFAULT_USER);
  }
  if (!localStorage.getItem(STORAGE_KEYS.AUTH)) {
    setToStorage(STORAGE_KEYS.AUTH, { isAuthenticated: true, email: DEFAULT_USER.email });
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    setToStorage(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CREATED_EVENTS)) {
    // Empty or custom user created events
    setToStorage(STORAGE_KEYS.CREATED_EVENTS, []);
  }
}

// Events
export function getStoredEvents() {
  const events = getFromStorage(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  const created = getStoredCreatedEvents();
  // Merge created events if not already included
  const combined = [...created, ...events.filter(e => !created.some(c => c.id === e.id))];
  return combined;
}

export function saveStoredEvents(events) {
  setToStorage(STORAGE_KEYS.EVENTS, events);
}

// Created events
export function getStoredCreatedEvents() {
  return getFromStorage(STORAGE_KEYS.CREATED_EVENTS, []);
}

export function saveCreatedEvent(event) {
  const current = getStoredCreatedEvents();
  const existingIdx = current.findIndex(e => e.id === event.id);
  let updated;
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = event;
  } else {
    updated = [event, ...current];
  }
  setToStorage(STORAGE_KEYS.CREATED_EVENTS, updated);

  // Also update main events cache
  const allEvents = getFromStorage(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  const allIdx = allEvents.findIndex(e => e.id === event.id);
  if (allIdx >= 0) {
    allEvents[allIdx] = event;
  } else {
    allEvents.unshift(event);
  }
  setToStorage(STORAGE_KEYS.EVENTS, allEvents);
  return updated;
}

export function deleteStoredEvent(eventId) {
  const created = getStoredCreatedEvents().filter(e => e.id !== eventId);
  setToStorage(STORAGE_KEYS.CREATED_EVENTS, created);

  const events = getFromStorage(STORAGE_KEYS.EVENTS, INITIAL_EVENTS).filter(e => e.id !== eventId);
  setToStorage(STORAGE_KEYS.EVENTS, events);
  return events;
}

// Favorites
export function getStoredFavorites() {
  return getFromStorage(STORAGE_KEYS.FAVORITES, ['evt-1', 'evt-3']);
}

export function toggleStoredFavorite(eventId) {
  const favorites = getStoredFavorites();
  let updated;
  if (favorites.includes(eventId)) {
    updated = favorites.filter(id => id !== eventId);
  } else {
    updated = [...favorites, eventId];
  }
  setToStorage(STORAGE_KEYS.FAVORITES, updated);
  return updated;
}

// Tickets / Registrations
export function getStoredTickets() {
  return getFromStorage(STORAGE_KEYS.TICKETS, []);
}

export function addStoredTicket(ticket) {
  const tickets = getStoredTickets();
  const updated = [ticket, ...tickets];
  setToStorage(STORAGE_KEYS.TICKETS, updated);
  return updated;
}

export function removeStoredTicket(ticketId) {
  const tickets = getStoredTickets().filter(t => t.id !== ticketId && t.eventId !== ticketId);
  setToStorage(STORAGE_KEYS.TICKETS, tickets);
  return tickets;
}

// User & Auth
export function getStoredUser() {
  return getFromStorage(STORAGE_KEYS.USER, DEFAULT_USER);
}

export function saveStoredUser(userData) {
  setToStorage(STORAGE_KEYS.USER, userData);
  return userData;
}

export function getStoredAuth() {
  return getFromStorage(STORAGE_KEYS.AUTH, { isAuthenticated: true, email: DEFAULT_USER.email });
}

export function setStoredAuth(authState) {
  setToStorage(STORAGE_KEYS.AUTH, authState);
  return authState;
}

// Notifications
export function getStoredNotifications() {
  return getFromStorage(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS);
}

export function saveStoredNotifications(notifs) {
  setToStorage(STORAGE_KEYS.NOTIFICATIONS, notifs);
  return notifs;
}
