import React from "react";
import ResidentCard from "./ResidentCard";

/**
 * PUBLIC_INTERFACE
 * ResidentList renders a scrollable list of residents.
 */
export default function ResidentList({ residents, onSelect }) {
  if (!residents?.length) {
    return (
      <div className="rd-empty">
        <p>No residents found. Try adjusting your search.</p>
      </div>
    );
  }

  return (
    <ul className="rd-list" role="list">
      {residents.map((r) => (
        <li key={r.id} className="rd-list-item">
          <ResidentCard resident={r} onClick={() => onSelect(r)} />
        </li>
      ))}
    </ul>
  );
}
