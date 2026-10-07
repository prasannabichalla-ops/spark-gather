import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  Heart,
  PlusCircle,
  Menu,
  X,
  User,
  Ticket,
  Calendar,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import Logo from './Logo';
import NotificationPanel from './NotificationPanel';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [navSearchInput, setNavSearchInput] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    auth,
    logout,
    unreadNotificationsCount,
    favorites,
    tickets,
    setSearchQuery,
  } = useApp();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
    setProfileDropdownOpen(false);
    setSearchModalOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearchInput.trim()) {
      setSearchQuery(navSearchInput.trim());
      navigate(`/events?search=${encodeURIComponent(navSearchInput.trim())}`);
      setSearchModalOpen(false);
      setNavSearchInput('');
    } else {
      navigate('/events');
      setSearchModalOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Explore Events', path: '/events' },
    { label: 'Create Event', path: '/create-event', highlight: true },
    { label: 'My Events', path: '/my-events' },
    { label: 'My Tickets', path: '/my-tickets', badge: tickets.length },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-cream-light/95 backdrop-blur-md shadow-card border-b border-mauve/20 py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-mauve/25 shadow-soft">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-navy text-white shadow-sm'
                        : item.highlight
                        ? 'text-berry hover:bg-berry/10'
                        : 'text-navy/80 hover:text-navy hover:bg-cream-surface'
                    }`
                  }
                >
                  {item.label}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-4 h-4 rounded-full bg-berry text-[10px] text-white flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Search Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2.5 rounded-xl bg-white border border-mauve/30 text-navy hover:text-berry hover:border-berry/40 transition shadow-soft flex items-center gap-2"
                aria-label="Search events"
                title="Search events"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline text-xs font-medium text-navy/60 pr-2">
                  Search...
                </span>
                <kbd className="hidden md:inline-flex text-[10px] px-1.5 py-0.5 rounded bg-cream-surface text-navy/70 border border-mauve/30">
                  ⌘K
                </kbd>
              </button>

              {/* Favorites Link */}
              <Link
                to="/favorites"
                className="relative p-2.5 rounded-xl bg-white border border-mauve/30 text-navy hover:text-berry hover:border-berry/40 transition shadow-soft"
                aria-label="View Saved Events"
                title="Saved Events"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.length > 0 ? 'text-berry fill-berry/20' : ''
                  }`}
                />
                {favorites.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-berry text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Notifications Toggle */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setProfileDropdownOpen(false);
                  }}
                  className="relative p-2.5 rounded-xl bg-white border border-mauve/30 text-navy hover:text-berry hover:border-berry/40 transition shadow-soft"
                  aria-label="Toggle notifications"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-berry text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                <NotificationPanel
                  isOpen={notificationsOpen}
                  onClose={() => setNotificationsOpen(false)}
                />
              </div>

              {/* Auth / Profile Area */}
              {auth?.isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(!profileDropdownOpen);
                      setNotificationsOpen(false);
                    }}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white border border-mauve/30 hover:border-navy/40 transition shadow-soft"
                    aria-label="User menu"
                  >
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={user?.name || 'User Avatar'}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-berry/30"
                    />
                    <span className="hidden sm:inline text-xs font-semibold text-navy max-w-[90px] truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className="hidden sm:inline w-3.5 h-3.5 text-navy/60" />
                  </button>

                  {/* Profile Dropdown */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-mauve/25 z-50 p-2 animate-slide-down">
                      <div className="px-3 py-2.5 border-b border-cream-surface mb-1">
                        <p className="text-xs font-bold text-navy truncate">{user?.name}</p>
                        <p className="text-[11px] text-mauve-dark truncate">{user?.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-navy hover:bg-cream-surface transition"
                      >
                        <User className="w-4 h-4 text-berry" />
                        My Profile
                      </Link>

                      <Link
                        to="/my-events"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-navy hover:bg-cream-surface transition"
                      >
                        <Calendar className="w-4 h-4 text-navy" />
                        Manage Events
                      </Link>

                      <Link
                        to="/my-tickets"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-navy hover:bg-cream-surface transition"
                      >
                        <Ticket className="w-4 h-4 text-berry" />
                        My Tickets ({tickets.length})
                      </Link>

                      <Link
                        to="/create-event"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-berry hover:bg-berry/10 transition"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Host New Event
                      </Link>

                      <div className="border-t border-cream-surface mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-navy hover:bg-white transition"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-berry hover:bg-berry-hover transition shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2.5 rounded-xl bg-white border border-mauve/30 text-navy hover:text-berry transition shadow-soft"
                aria-label="Open mobile navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed inset-x-0 top-[65px] bg-cream-light/98 backdrop-blur-xl border-b border-mauve/30 shadow-elevated p-6 z-50 animate-slide-down max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between ${
                      isActive
                        ? 'bg-navy text-white'
                        : item.highlight
                        ? 'bg-berry/10 text-berry'
                        : 'text-navy hover:bg-white'
                    }`
                  }
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-berry text-white text-xs font-bold">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}

              <div className="pt-4 mt-2 border-t border-mauve/20 flex flex-col gap-2">
                <Link
                  to="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-navy bg-white border border-mauve/30 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-berry" />
                    Saved Events
                  </span>
                  <span className="text-xs bg-berry/15 text-berry px-2 py-0.5 rounded-full font-bold">
                    {favorites.length}
                  </span>
                </Link>

                {auth?.isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold text-navy bg-white border border-mauve/30 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-navy" />
                      View Profile ({user?.name})
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-2.5 rounded-xl text-sm font-semibold text-navy bg-white border border-mauve/30"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-berry"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-navy/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-elevated border border-mauve/30 w-full max-w-xl overflow-hidden p-6 animate-slide-down">
            <div className="flex items-center justify-between pb-4 border-b border-cream-surface mb-4">
              <h3 className="font-bold text-navy text-base">Quick Search Spark Gather</h3>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="text-mauve hover:text-navy p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Search events, topics, tech conferences, concerts, cities..."
                value={navSearchInput}
                onChange={(e) => setNavSearchInput(e.target.value)}
                className="spark-input pl-11 pr-24 text-sm"
              />
              <Search className="w-5 h-5 text-navy/40 absolute left-3.5 top-3.5" />
              <button
                type="submit"
                className="absolute right-2 top-2 px-3 py-1.5 bg-berry text-white text-xs font-semibold rounded-lg hover:bg-berry-hover transition"
              >
                Explore
              </button>
            </form>
            <div className="mt-4 pt-3 border-t border-cream-surface flex items-center justify-between text-xs text-mauve-dark">
              <span>Popular: AI Summit, Jazz, Hackathons, Design</span>
              <span>Press Enter to explore</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
