import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Mail,
  MapPin,
} from 'lucide-react';
import Logo from './Logo';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useApp();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      addToast({
        title: 'Invalid Email',
        message: 'Please enter a valid email address to subscribe.',
        type: 'warning',
      });
      return;
    }
    setSubscribed(true);
    addToast({
      title: 'Subscribed to Spark Digest',
      message: 'You will receive curated weekly event highlights in your inbox.',
      type: 'success',
    });
    setEmailInput('');
  };

  return (
    <footer className="bg-navy text-white pt-16 pb-12 mt-20 border-t border-navy-light/40 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-berry/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-peach/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white/10 backdrop-blur-md inline-block p-2 rounded-2xl">
              <Logo size="md" className="text-white brightness-125" />
            </div>
            <p className="text-cream/80 text-sm leading-relaxed max-w-sm">
              Spark Gather is the modern discovery and event management platform built for curious minds, vibrant creators, and intentional community gatherers.
            </p>
            <div className="pt-2 flex items-center gap-3 text-cream/70">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-berry hover:text-white flex items-center justify-center transition border border-white/10"
                aria-label="X / Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-berry hover:text-white flex items-center justify-center transition border border-white/10"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-berry hover:text-white flex items-center justify-center transition border border-white/10"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-berry hover:text-white flex items-center justify-center transition border border-white/10"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-peach">Platform</h4>
            <ul className="space-y-2.5 text-sm text-cream/80">
              <li>
                <Link to="/events" className="hover:text-white transition">
                  Explore Events
                </Link>
              </li>
              <li>
                <Link to="/create-event" className="hover:text-white transition">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/my-events" className="hover:text-white transition">
                  My Events
                </Link>
              </li>
              <li>
                <Link to="/my-tickets" className="hover:text-white transition">
                  My Tickets
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-white transition">
                  Saved Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-peach">Company</h4>
            <ul className="space-y-2.5 text-sm text-cream/80">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Our Mission
                </Link>
              </li>
              <li>
                <span className="text-cream/50 cursor-not-allowed">Privacy Policy</span>
              </li>
              <li>
                <span className="text-cream/50 cursor-not-allowed">Terms of Service</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-peach">Stay Inspired</h4>
            <p className="text-xs text-cream/80 leading-relaxed">
              Subscribe to the weekly Spark Digest. Receive handpicked tech summits, cultural fests, and workshops directly.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-white/10 rounded-xl text-xs text-peach">
                <CheckCircle className="w-4 h-4 text-peach" />
                <span>You're subscribed! Keep an eye on your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-white/10 border border-white/20 px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-cream/50 focus:outline-none focus:ring-2 focus:ring-berry w-full"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-berry hover:bg-berry-hover text-white rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-1 shadow-sm"
                >
                  Join
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="text-[11px] text-cream/60 flex items-center gap-1 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-peach" />
              <span>Zero spam. Curated experiences only.</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>© 2026 Spark Gather. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Discover experiences. Connect with people.</span>
            <span className="text-peach/80">Made with craft for live gatherings.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
