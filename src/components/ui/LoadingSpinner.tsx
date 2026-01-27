"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClass = size === "lg" ? "spinner-lg" : "spinner";
  
  return (
    <div className={`${sizeClass} ${className}`} />
  );
}
