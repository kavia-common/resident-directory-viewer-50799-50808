import React, { useEffect, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * ResidentDetail shows selected resident information in a modal dialog.
 */
export default function ResidentDetail({ resident, isOpen, onClose }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Focus management: move focus into modal when opened, restore on close
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const previouslyFocused = document.activeElement;
      closeBtnRef.current?.focus();

      function onKeyDown(e) {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        }
        // Basic focus trap
        if (e.key === "Tab") {
          const focusable = dialogRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }

      function onBackdropClick(e) {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }

      const current = dialogRef.current;
      current.addEventListener("keydown", onKeyDown);
      current.addEventListener("click", onBackdropClick);

      return () => {
        current.removeEventListener("keydown", onKeyDown);
        current.removeEventListener("click", onBackdropClick);
        if (previouslyFocused && previouslyFocused.focus) {
          previouslyFocused.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !resident) return null;

  const { name, apartment, phone, email, avatar } = resident;

  return (
    <div
      className="rd-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resident-detail-title"
      aria-describedby="resident-detail-desc"
      ref={dialogRef}
    >
      <div className="rd-modal">
        <div className="rd-modal-header">
          <h2 id="resident-detail-title">{name}</h2>
          <button
            type="button"
            className="rd-btn rd-btn-ghost"
            onClick={onClose}
            aria-label="Close resident details"
            ref={closeBtnRef}
          >
            ✕
          </button>
        </div>
        <div id="resident-detail-desc" className="rd-modal-body">
          <div className="rd-detail-avatar">
            {avatar ? (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img src={avatar} alt={`${name} avatar`} />
            ) : (
              <div className="rd-detail-avatar-fallback">{name[0]}</div>
            )}
          </div>
          <div className="rd-detail-grid">
            <div className="rd-detail-row">
              <span className="rd-detail-label">Name</span>
              <span className="rd-detail-value">{name}</span>
            </div>
            <div className="rd-detail-row">
              <span className="rd-detail-label">Apartment</span>
              <span className="rd-detail-value">{apartment}</span>
            </div>
            <div className="rd-detail-row">
              <span className="rd-detail-label">Phone</span>
              <a className="rd-detail-value rd-link" href={`tel:${phone}`}>
                {phone}
              </a>
            </div>
            <div className="rd-detail-row">
              <span className="rd-detail-label">Email</span>
              <a className="rd-detail-value rd-link" href={`mailto:${email}`}>
                {email}
              </a>
            </div>
          </div>
        </div>
        <div className="rd-modal-footer">
          <button
            type="button"
            className="rd-btn rd-btn-primary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
