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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-3 ${className}`}>
      <div className="flex-1 relative group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted group-focus-within:text-xbox-green transition-colors">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7Z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full pl-11 pr-12 py-3 bg-glass border border-solid rounded-lg text-primary placeholder:text-dim transition-all focus:border-xbox-green focus:shadow-lg focus:ring-0"
          style={{
            backgroundColor: "var(--bg-glass)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <LoadingSpinner size="sm" />
          </div>
        )}
        {query && !isLoading && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onSearch("");
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-error transition-colors"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.3 5.71a1 1 0 0 0-1.4 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.88a1 1 0 0 0 1.41-1.41L13.41 12l4.88-4.89a1 1 0 0 0 0-1.4Z" />
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="btn btn-primary px-6"
      >
        {isLoading ? <LoadingSpinner size="sm" /> : "🔍"}
      </button>
    </form>
  );
}
