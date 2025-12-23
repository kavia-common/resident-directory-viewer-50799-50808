import React, { useMemo, useState } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ResidentList from "./components/ResidentList";
import ResidentDetail from "./components/ResidentDetail";
import { residents as mockResidents } from "./data/residents";

// PUBLIC_INTERFACE
function App() {
  /** Root app component for the Resident Directory UI (frontend-only). */
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [isDetailOpen, setDetailOpen] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!normalizedQuery) return mockResidents;
    return mockResidents.filter((r) => {
      const name = r.name?.toLowerCase() || "";
      const apt = r.apartment?.toLowerCase() || "";
      return name.includes(normalizedQuery) || apt.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const onSelectResident = (r) => {
    setSelected(r);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
  };

  return (
    <div className="rd-app" style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Header />
      <main className="rd-main" role="main">
        <section className="rd-toolbar">
          <SearchBar
            value={query}
            onChange={setQuery}
            onClear={() => setQuery("")}
          />
          <p className="rd-result-count" aria-live="polite">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </p>
        </section>
        <section className="rd-content">
          <div className="rd-list-wrap" aria-label="Resident list">
            <ResidentList residents={filtered} onSelect={onSelectResident} />
          </div>
        </section>
      </main>
      <ResidentDetail resident={selected} isOpen={isDetailOpen} onClose={closeDetail} />
    </div>
  );
}

export default App;
