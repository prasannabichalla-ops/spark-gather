# Spark Gather — Frontend Event Discovery & Management Platform

> “Where Great Events Begin. Discover experiences, connect with people, and create unforgettable memories.”

Spark Gather is a modern, premium event discovery and event management web application crafted with React, Vite, Tailwind CSS, React Router, Lucide icons, Three.js interactive canvas effects, and comprehensive `localStorage` persistence.

---

## 🎨 Color System (Palette Guide)

- **#123C69 (Deep Navy)**: Major headings, primary navigation, dark sections, high-contrast UI
- **#EEE2DC (Warm Cream)**: Large surfaces, ambient backgrounds, warm borders
- **#EDC7B7 (Soft Peach)**: Highlights, accents, subtle warm badges
- **#BAB2B5 (Muted Mauve / Gray)**: Secondary UI elements, dividing borders, supporting typography
- **#AC3B61 (Berry / Magenta)**: Primary brand accent, important CTAs, selected states, glows

---

## 🚀 Key Features

1. **Home (`/`)**:
   - Hero with interactive Three.js constellation canvas background.
   - Quick category chips and live navigation.
   - Curated Featured Events grid with zoom hover, tags, and favorite toggles.
   - 10 clickable category cards linking to pre-filtered Explore views.
   - “Why Spark Gather” 4-pillar architectural section (Discover, Connect, Create, Experience).
   - Animated statistics counters (10K+ Events, 50K+ Attendees, 2K+ Organizers, 100+ Cities).
   - 4-step “How It Works” journey.
   - Realistic community testimonials.
   - Branded final CTA with secondary Three.js backdrop.

2. **Explore Events (`/events`)**:
   - Real-time search by title, category, city, and venue.
   - Multi-parameter filtering:
     - Categories (10 categories)
     - Locations & Cities
     - Ticket price tiers (Free, Under $50, $50-$150, $150+)
     - Event formats (In-Person, Workshop, Conference, Hackathon, Outdoor, Sports)
     - Date periods
   - Sorting by Recommended, Newest, Most Popular, Price Low-to-High, and Date.
   - Clean empty state with instant filter reset.

3. **Event Details (`/events/:id`)**:
   - Hero banner with badges, date, time, location, and capacity bar.
   - Full description, verified organizer card, key highlights, schedule agenda, and keynote speaker cards.
   - Interactive Registration with tier selection, instant ticket pass generation, and celebratory confetti.
   - Save / Favorite toggle and one-click shareable link copy.

4. **Create Event (`/create-event`)**:
   - Full event creation studio with client-side validation.
   - High-resolution imagery presets and custom URL inputs.
   - Draft vs. Published status.
   - Live integration with Explore Events and My Hosted Events.

5. **My Hosted Events (`/my-events`)**:
   - Tabbed view: Upcoming, Past, and Drafts.
   - Action controls: View public page, Edit modal (instant persistence), and Delete with safety modal.

6. **My Tickets (`/my-tickets`)**:
   - Digital airline/concert pass aesthetic with perforated divider and QR code visual.
   - View Pass inspection modal, PDF download simulation, and Cancel Registration flow.

7. **Saved Events (`/favorites`)**:
   - Collection of bookmarked experiences with empty state.

8. **User Profile (`/profile`)**:
   - Editable attendee details, bio, avatar, and headline.
   - Notification preferences and account security overview.

9. **About & Storytelling (`/about`)**:
   - Mission, Vision, and 4 Core Values.

10. **Contact & Concierge (`/contact`)**:
    - Working contact message form, support channels, and FAQs.

11. **Mock Authentication (`/login` & `/signup`)**:
    - Demo mode credentials, remember-me options, Google mock login, and form validation.

12. **Notification Dropdown**:
    - Navbar indicator badge, mark individual as read, mark all read.

13. **Custom Toast Notifications**:
    - Non-intrusive animated feedback for all state mutations.

---

## 🛠️ Tech Stack

- **React 19**
- **Vite 8**
- **Tailwind CSS 3.4**
- **React Router 7**
- **Lucide React**
- **Three.js**
- **Canvas Confetti**
- **Browser localStorage**

---

## 💻 Running the Project Locally

```bash
cd C:\Users\PRASANNA\.gemini\antigravity\scratch\spark-gather
npm run dev
```

Server will start on: `http://localhost:5173/`
