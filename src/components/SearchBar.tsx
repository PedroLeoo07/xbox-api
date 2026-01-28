"use client";

import React, { useState } from "react";
import LoadingSpinner from "./ui/LoadingSpinner";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Buscar...",
  isLoading = false,
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem" }} className={className}>
      <div style={{ flex: 1, position: "relative" }}>
        <div style={{
          position: "absolute",
          left: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--text-muted)",
        }}>
          🔍
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          style={{ paddingLeft: "3rem" }}
          disabled={isLoading}
        />
        {query && !isLoading && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onSearch("");
            }}
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: "1.25rem",
            }}
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="btn btn-primary"
        style={{ minWidth: "120px" }}
      >
        {isLoading ? <LoadingSpinner size="sm" /> : "Buscar"}
      </button>
    </form>
  );
}
