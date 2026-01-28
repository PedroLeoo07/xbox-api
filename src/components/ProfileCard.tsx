"use client";

import React from "react";
import { XboxProfile } from "@/types";
import Image from "next/image";

interface ProfileCardProps {
  profile: XboxProfile;
  onClick?: () => void;
}

export default function ProfileCard({ profile, onClick }: ProfileCardProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className="card"
      onClick={onClick}
      onKeyPress={handleKeyPress}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          overflow: "hidden",
          background: "var(--bg-hover)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontWeight: 700,
        }}>
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={`${profile.gamertag} avatar`}
              width={64}
              height={64}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            profile.gamertag.charAt(0).toUpperCase()
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.25rem" }}>
            {profile.gamertag}
          </h3>
          {profile.realName && (
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              {profile.realName}
            </p>
          )}
        </div>
        {profile.accountTier && (
          <div style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            background: "linear-gradient(135deg, var(--xbox-green), var(--xbox-green-dark))",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}>
            {profile.accountTier}
          </div>
        )}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1rem",
        marginBottom: "1rem",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--xbox-green-light)",
            marginBottom: "0.25rem",
          }}>
            {profile.gamerScore.toLocaleString()}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Gamerscore
          </div>
        </div>
        {profile.tenure && (
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "var(--xbox-green-light)",
              marginBottom: "0.25rem",
            }}>
              {profile.tenure}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Anos no Xbox
            </div>
          </div>
        )}
      </div>

      {profile.bio && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {profile.bio}
          </p>
        </div>
      )}

      {profile.location && (
        <div style={{ marginTop: "0.75rem" }}>
          <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            📍 {profile.location}
          </span>
        </div>
      )}
    </div>
  );
}
                  backgroundColor: profile.preferredColor.secondaryColor,
                }}
                title="Cor secundária"
              />
              <div
                className="w-4 h-4 rounded-full border border-gray-600"
                style={{
                  backgroundColor: profile.preferredColor.tertiaryColor,
                }}
                title="Cor terciária"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
