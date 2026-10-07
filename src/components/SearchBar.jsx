import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  onToggleFilters,
  filtersActiveCount = 0,
}) {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search events, categories, locations..."
          className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-mauve/30 text-navy placeholder-navy/40 focus:outline-none focus:ring-2 focus:ring-berry/40 focus:border-berry shadow-soft transition text-sm sm:text-base font-medium"
        />
        <Search className="w-5 h-5 text-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mauve hover:text-navy p-1 rounded-lg"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {onToggleFilters && (
        <button
          onClick={onToggleFilters}
          className="relative px-4 py-3.5 rounded-2xl bg-white border border-mauve/30 hover:border-berry text-navy hover:text-berry font-semibold text-sm transition shadow-soft flex items-center gap-2 shrink-0"
          aria-label="Filter events"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {filtersActiveCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-berry text-white text-xs font-bold flex items-center justify-center">
              {filtersActiveCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
