import React from "react";

// PUBLIC_INTERFACE
export default function Header() {
  /** Header for the Resident Directory app with title and optional description. */
  return (
    <header
      className="rd-header"
      role="banner"
      style={{
        backgroundColor: "#374151",
        color: "#ffffff",
        borderBottom: "1px solid #4b5563"
      }}
    >
      <div className="rd-container rd-header-inner">
        <h1 className="rd-title">Resident Directory</h1>
        <p className="rd-subtitle">Search and view resident details</p>
      </div>
    </header>
  );
}
