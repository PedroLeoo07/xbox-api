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
  const sizeMap = {
    sm: "24px",
    md: "40px",
    lg: "60px",
  };

  return (
    <div
      className={`spinner ${className}`}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
      }}
    />
  );
}
