"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  description,
  trend,
  gradient = "from-xbox-green to-xbox-green-dark",
}: StatCardProps) {
  return (
    <div className="card group cursor-default">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform`}
            >
              {icon}
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted uppercase tracking-wide">
                {title}
              </h3>
              {description && (
                <p className="text-xs text-dim mt-1">{description}</p>
              )}
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                {typeof value === "number" ? value.toLocaleString() : value}
              </div>

              {trend && (
                <div
                  className={`flex items-center gap-1 text-sm ${
                    trend.isPositive ? "text-success" : "text-error"
                  }`}
                >
                  <span>{trend.isPositive ? "↗️" : "↘️"}</span>
                  <span>{Math.abs(trend.value)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
