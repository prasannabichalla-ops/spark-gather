import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpDown, Grid, List, Sparkles, FilterX } from 'lucide-react';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import EmptyState from '../components/EmptyState';
import { useApp } from '../context/AppContext';

export default function ExploreEvents() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { events, searchQuery, setSearchQuery } = useApp();

  // Filters State
  const [showFilters, setShowFilters] = useState(true);
  const [search, setSearch] = useState(() => searchParams.get('search') || searchQuery || '');
  const [category, setCategory] = useState(() => searchParams.get('category') || 'all');
  const [location, setLocation] = useState(() => searchParams.get('location') || 'all');
  const [price, setPrice] = useState('all');
  const [eventType, setEventType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  // Sync from query params on URL change
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setCategory(urlCategory);
    }
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearch(urlSearch);
    }
  }, [searchParams]);

  // Extract distinct locations for dropdown
  const uniqueLocations = useMemo(() => {
    const locSet = new Set();
    events.forEach((e) => {
      if (e.location) {
        locSet.add(e.location);
      }
    });
    return Array.from(locSet).sort();
  }, [events]);

  // Active filters count
  const filtersCount = useMemo(() => {
    let count = 0;
    if (category !== 'all') count++;
    if (location !== 'all') count++;
    if (price !== 'all') count++;
    if (eventType !== 'all') count++;
    if (dateRange !== 'all') count++;
    return count;
  }, [category, location, price, eventType, dateRange]);

  // Handle Search Input Change
  const handleSearchChange = (val) => {
    setSearch(val);
    setSearchQuery(val);
  };

  const handleClearSearch = () => {
    setSearch('');
    setSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSearchQuery('');
    setCategory('all');
    setLocation('all');
    setPrice('all');
    setEventType('all');
    setDateRange('all');
    setSortBy('recommended');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredEvents = useMemo(() => {
    return events
      .filter((ev) => {
        // Search Filter (Title, description, category, location, venue)
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = ev.title.toLowerCase().includes(q);
          const matchDesc = ev.description.toLowerCase().includes(q);
          const matchCat = (ev.categoryName || ev.category).toLowerCase().includes(q);
          const matchLoc = ev.location.toLowerCase().includes(q);
          const matchVenue = (ev.venue || '').toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat && !matchLoc && !matchVenue) {
            return false;
          }
        }

        // Category Filter
        if (category !== 'all' && ev.category !== category) {
          return false;
        }

        // Location Filter
        if (location !== 'all' && ev.location !== location) {
          return false;
        }

        // Price Filter
        if (price === 'free' && ev.price !== 0 && ev.price !== 'Free') {
          return false;
        }
        if (price === 'under-50' && (typeof ev.price !== 'number' || ev.price >= 50)) {
          return false;
        }
        if (price === '50-150' && (typeof ev.price !== 'number' || ev.price < 50 || ev.price > 150)) {
          return false;
        }
        if (price === 'above-150' && (typeof ev.price !== 'number' || ev.price < 150)) {
          return false;
        }

        // Event Type Filter
        if (eventType !== 'all' && ev.eventType !== eventType) {
          return false;
        }

        // Date Period Filter
        if (dateRange === 'oct-2026' && !ev.date.startsWith('2026-10')) {
          return false;
        }
        if (dateRange === 'nov-2026' && !ev.date.startsWith('2026-11')) {
          return false;
        }
        if (dateRange === 'dec-2026' && !ev.date.startsWith('2026-12')) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'recommended') {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
        if (sortBy === 'newest') {
          return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
        }
        if (sortBy === 'popular') {
          return (b.attendees || 0) - (a.attendees || 0);
        }
        if (sortBy === 'price-low') {
          const priceA = typeof a.price === 'number' ? a.price : 0;
          const priceB = typeof b.price === 'number' ? b.price : 0;
          return priceA - priceB;
        }
        if (sortBy === 'date') {
          return new Date(a.date) - new Date(b.date);
        }
        return 0;
      });
  }, [events, search, category, location, price, eventType, dateRange, sortBy]);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-berry/10 text-berry text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Experiences
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-navy tracking-tight">
            Explore Events
          </h1>
          <p className="text-base text-navy/70 mt-2 max-w-2xl">
            Find your next experience. Discover tech summits, cultural fests, workshops, and concerts near you or across the world.
          </p>
        </div>

        {/* Search & Filter Bar Controls */}
        <div className="space-y-4 mb-8">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            onToggleFilters={() => setShowFilters(!showFilters)}
            filtersActiveCount={filtersCount}
          />

          {/* Collapsible Filter Panel */}
          {showFilters && (
            <FilterPanel
              selectedCategory={category}
              onSelectCategory={(cat) => {
                setCategory(cat);
                const newParams = new URLSearchParams(searchParams);
                if (cat === 'all') newParams.delete('category');
                else newParams.set('category', cat);
                setSearchParams(newParams);
              }}
              selectedLocation={location}
              onSelectLocation={setLocation}
              selectedPrice={price}
              onSelectPrice={setPrice}
              selectedType={eventType}
              onSelectType={setEventType}
              selectedDateRange={dateRange}
              onSelectDateRange={setDateRange}
              locations={uniqueLocations}
              onReset={handleResetFilters}
            />
          )}
        </div>

        {/* Results Bar: Count & Sorting */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-b border-mauve/20 mb-8">
          <div className="text-sm font-semibold text-navy">
            Showing <span className="text-berry font-bold">{filteredEvents.length}</span>{' '}
            {filteredEvents.length === 1 ? 'event' : 'events'}
            {category !== 'all' && (
              <span className="text-mauve-dark font-normal">
                {' '}in <span className="capitalize text-navy font-medium">{category}</span>
              </span>
            )}
            {search && (
              <span className="text-mauve-dark font-normal">
                {' '}for <span className="text-navy font-medium">"{search}"</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-xs font-bold uppercase tracking-wider text-mauve-dark flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-mauve/30 text-navy text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-berry/40"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>

        {/* Events Grid or Empty State */}
        {filteredEvents.length === 0 ? (
          <EmptyState
            type="search"
            title="No events found"
            description="We couldn't find any events matching your selected filters. Try broadening your criteria or reset your filters."
            actionText="Reset All Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
