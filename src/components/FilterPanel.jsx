import React from 'react';
import { RotateCcw, Filter, Check } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function FilterPanel({
  selectedCategory,
  onSelectCategory,
  selectedLocation,
  onSelectLocation,
  selectedPrice,
  onSelectPrice,
  selectedType,
  onSelectType,
  selectedDateRange,
  onSelectDateRange,
  locations = [],
  onReset,
}) {
  const priceOptions = [
    { label: 'All Prices', value: 'all' },
    { label: 'Free Only', value: 'free' },
    { label: 'Under $50', value: 'under-50' },
    { label: '$50 - $150', value: '50-150' },
    { label: '$150+', value: 'above-150' },
  ];

  const typeOptions = [
    { label: 'All Types', value: 'all' },
    { label: 'In-Person', value: 'In-Person' },
    { label: 'Workshop', value: 'Workshop' },
    { label: 'Conference', value: 'Conference' },
    { label: 'Hackathon', value: 'Hackathon' },
    { label: 'Outdoor', value: 'Outdoor' },
    { label: 'Sports', value: 'Sports' },
  ];

  const dateOptions = [
    { label: 'Any Date', value: 'all' },
    { label: 'This Month (Oct 2026)', value: 'oct-2026' },
    { label: 'Next Month (Nov 2026)', value: 'nov-2026' },
    { label: 'Dec 2026 & Beyond', value: 'dec-2026' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-mauve/25 shadow-soft space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-cream-surface">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-berry" />
          <h3 className="font-display font-bold text-base text-navy">Filter Events</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-berry hover:text-berry-hover flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Category Pills */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-3">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedCategory === 'all'
                ? 'bg-navy text-white shadow-sm'
                : 'bg-cream-surface text-navy hover:bg-cream'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-cream-surface text-navy hover:bg-cream'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Dropdowns/Selects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {/* Location Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-2">
            City / Location
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => onSelectLocation(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-mauve/30 text-navy text-xs font-medium focus:outline-none focus:ring-2 focus:ring-berry/40"
          >
            <option value="all">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-2">
            Ticket Price
          </label>
          <select
            value={selectedPrice}
            onChange={(e) => onSelectPrice(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-mauve/30 text-navy text-xs font-medium focus:outline-none focus:ring-2 focus:ring-berry/40"
          >
            {priceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Event Type Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-2">
            Format / Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => onSelectType(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-mauve/30 text-navy text-xs font-medium focus:outline-none focus:ring-2 focus:ring-berry/40"
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-2">
            Date Period
          </label>
          <select
            value={selectedDateRange}
            onChange={(e) => onSelectDateRange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-mauve/30 text-navy text-xs font-medium focus:outline-none focus:ring-2 focus:ring-berry/40"
          >
            {dateOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
