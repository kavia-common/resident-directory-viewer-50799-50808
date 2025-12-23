import React from "react";

/**
 * PUBLIC_INTERFACE
 * ResidentCard renders a concise resident summary row.
 */
export default function ResidentCard({ resident, onClick }) {
  const { name, apartment, email, avatar } = resident;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <button
      type="button"
      className="rd-card"
      onClick={onClick}
      aria-label={`View details for ${name} in apartment ${apartment}`}
    >
      <div className="rd-avatar" aria-hidden="true">
        {avatar ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={avatar} alt={`${name} avatar`} />
        ) : (
          <span className="rd-avatar-fallback">{initials}</span>
        )}
      </div>
      <div className="rd-card-content">
        <div className="rd-card-title">{name}</div>
        <div className="rd-card-subtitle">{apartment}</div>
        <div className="rd-card-meta">{email}</div>
      </div>
    </button>
  );
}
