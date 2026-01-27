"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`loading ${size === "lg" ? "loading-lg" : ""} ${className}`}
    />
  );
}
