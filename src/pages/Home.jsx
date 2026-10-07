import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Users2,
  CalendarCheck,
  Zap,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Calendar,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import ThreeBackground from '../components/ThreeBackground';
import EventCard from '../components/EventCard';
import CategoryCard from '../components/CategoryCard';
import StatsSection from '../components/StatsSection';
import TestimonialCard from '../components/TestimonialCard';
import { CATEGORIES } from '../data/categories';
import { TESTIMONIALS } from '../data/testimonials';
import { useApp } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { events } = useApp();

  // Pick top 6 featured events
  const featuredEvents = events.filter((e) => e.featured).slice(0, 6);
  // If less than 6 featured, backfill
  const displayEvents =
    featuredEvents.length >= 6 ? featuredEvents : events.slice(0, 6);

  const whyPillars = [
    {
      title: 'Discover',
      tagline: 'High-signal experiences curated for curious minds.',
      desc: 'No endless noise or low-quality listings. Every conference, live concert, and hands-on workshop is chosen for depth and craft.',
      icon: Compass,
      color: 'bg-navy text-white',
    },
    {
      title: 'Connect',
      tagline: 'Gather with peers who share your creative drive.',
      desc: 'Meet future co-founders, collaborators, fellow musicians, and designers. Spark Gather bridges digital discovery to real-world community.',
      icon: Users2,
      color: 'bg-berry text-white',
    },
    {
      title: 'Create',
      tagline: 'Empowering organizers with modern hosting tools.',
      desc: 'Publish your gathering in minutes with digital passes, attendee management, and real-time registration tracking without technical friction.',
      icon: Zap,
      color: 'bg-navy text-white',
    },
    {
      title: 'Experience',
      tagline: 'Frictionless check-in and lasting memories.',
      desc: 'Instant digital passes with scannable QR tokens, calendar sync, and updates keep you fully immersed in the moment.',
      icon: CalendarCheck,
      color: 'bg-berry text-white',
    },
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Discover an Event',
      desc: 'Browse across 10 distinct categories, filter by city or date, and find experiences matching your ambitions.',
    },
    {
      step: '02',
      title: 'Explore Details',
      desc: 'Review comprehensive event itineraries, keynote speakers, venue blueprints, and community discussions.',
    },
    {
      step: '03',
      title: 'Register or Save',
      desc: 'Claim your official digital pass in one click or bookmark it to your personalized saved collection.',
    },
    {
      step: '04',
      title: 'Experience the Event',
      desc: 'Arrive with your digital ticket, connect with attendees, and be part of an unforgettable collective moment.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ============================================================ */}
      {/* HERO SECTION WITH THREE.JS BACKGROUND                       */}
      {/* ============================================================ */}
      <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
        {/* Subtle Three.js interactive canvas */}
        <ThreeBackground variant="hero" />

        {/* Ambient Gradient Overlays for contrast & warmth */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-light/60 via-cream-light/80 to-cream-light pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-mauve/30 shadow-soft mb-8 animate-fade-in backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-berry animate-pulse" />
            <span className="text-xs font-bold text-navy tracking-wide">
              The Next Era of Live Experiences
            </span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-navy tracking-tight leading-[1.08] mb-6">
            Where Great Events <br />
            <span className="text-berry relative inline-block">
              Begin.
              <svg
                viewBox="0 0 280 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-2.5 left-0 w-full text-peach pointer-events-none"
              >
                <path
                  d="M3 14C70 4 200 4 277 14"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-navy/80 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Discover experiences, connect with people, and create unforgettable memories across technology, music, culture, and beyond.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-14">
            <Link
              to="/events"
              className="spark-btn-primary w-full sm:w-auto px-8 py-3.5 text-base shadow-berry-glow"
            >
              Explore Events
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/create-event"
              className="spark-btn-secondary w-full sm:w-auto px-7 py-3.5 text-base"
            >
              Create an Event
            </Link>
          </div>

          {/* Quick Category Chips under Hero */}
          <div className="pt-4 border-t border-mauve/20 max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-mauve-dark mb-3">
              Popular right now
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => navigate(`/events?category=${cat.id}`)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/80 hover:bg-white text-navy border border-mauve/30 hover:border-berry transition shadow-xs"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURED EVENTS SECTION                                     */}
      {/* ============================================================ */}
      <section className="py-20 bg-cream-surface/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-berry bg-berry/10 px-3 py-1 rounded-full">
                Curated Highlights
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy mt-3">
                Discover What's Happening
              </h2>
              <p className="text-sm sm:text-base text-navy/70 mt-1">
                Find experiences worth showing up for.
              </p>
            </div>

            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm font-bold text-berry hover:text-berry-hover group"
            >
              <span>Browse All Events ({events.length})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CATEGORIES SECTION                                          */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-navy bg-navy/10 px-3 py-1 rounded-full">
              Explore by Interest
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy mt-3">
              Tailored For Every Passion
            </h2>
            <p className="text-sm sm:text-base text-navy/70 mt-2">
              From high-level AI conferences to open-air jazz concerts and creative design labs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WHY SPARK GATHER (4 PILLARS)                                */}
      {/* ============================================================ */}
      <section className="py-20 bg-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-berry bg-berry/10 px-3 py-1 rounded-full">
              Why Spark Gather
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy mt-3">
              Crafted for Memorable Gatherings
            </h2>
            <p className="text-sm sm:text-base text-navy/70 mt-2">
              We reimagined event discovery from first principles: elevated aesthetics, verified hosts, and frictionless digital ticketing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-7 border border-mauve/25 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl ${pillar.color} flex items-center justify-center mb-6 shadow-sm`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-display font-bold text-xl text-navy mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-berry mb-3">{pillar.tagline}</p>
                    <p className="text-xs text-navy/75 leading-relaxed">{pillar.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-cream-surface text-xs font-semibold text-navy/40 group-hover:text-navy transition">
                    Pillar 0{index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ANIMATED STATISTICS SECTION                                 */}
      {/* ============================================================ */}
      <StatsSection />

      {/* ============================================================ */}
      {/* HOW IT WORKS (4 STEPS)                                      */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-navy bg-navy/10 px-3 py-1 rounded-full">
              Simple Journey
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy mt-3">
              How Spark Gather Works
            </h2>
            <p className="text-sm sm:text-base text-navy/70 mt-2">
              From discovering an experience to scanning your pass at the door in four intuitive steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {howItWorksSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-cream-surface/50 rounded-3xl p-7 border border-mauve/20 relative flex flex-col justify-between"
              >
                <div>
                  <div className="font-display font-extrabold text-3xl text-berry/30 mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-lg text-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-navy/75 leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-6 pt-3 flex items-center gap-1.5 text-xs text-berry font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Step {idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TESTIMONIALS SECTION                                        */}
      {/* ============================================================ */}
      <section className="py-20 bg-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-berry bg-berry/10 px-3 py-1 rounded-full">
              Voices of our Community
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy mt-3">
              Loved by Attendees & Organizers
            </h2>
            <p className="text-sm sm:text-base text-navy/70 mt-2">
              Hear why top community architects and live event fans choose Spark Gather.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL CTA SECTION (WITH THREE.JS EFFECT)                    */}
      {/* ============================================================ */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        {/* Subtle secondary Three.js background */}
        <ThreeBackground variant="cta" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-peach" />
            <span className="text-xs font-semibold text-cream">Join Thousands of Creators</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-6">
            Ready to create something <br />
            <span className="text-peach">unforgettable?</span>
          </h2>

          <p className="text-base sm:text-lg text-cream/80 max-w-xl mx-auto mb-10 leading-relaxed">
            Whether you want to explore cutting-edge hackathons or host your own 500-person summit, your journey starts here.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/events"
              className="w-full sm:w-auto px-8 py-3.5 bg-berry hover:bg-berry-hover text-white rounded-xl font-bold text-sm transition shadow-berry-glow flex items-center justify-center gap-2"
            >
              Explore Events
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/create-event"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2"
            >
              Create an Event
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
