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
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <div className="flex-1 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="form-input pr-10"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <LoadingSpinner size="sm" />
          </div>
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
