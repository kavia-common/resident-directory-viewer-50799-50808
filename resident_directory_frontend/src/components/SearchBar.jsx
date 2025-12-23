import React from "react";

/**
 * PUBLIC_INTERFACE
 * SearchBar provides a labeled text input with clear support.
 */
export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="rd-searchbar" role="search">
      <label htmlFor="resident-search" className="sr-only">
        Search residents by name or apartment
      </label>
      <div className="rd-searchbar-inputwrap">
        <input
          id="resident-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name or apartment..."
          aria-label="Search residents by name or apartment"
          className="rd-input"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="rd-btn rd-btn-secondary rd-btn-clear"
            aria-label="Clear search"
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
