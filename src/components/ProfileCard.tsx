'use client';

import { XboxProfile } from '@/types';
import Image from 'next/image';

interface ProfileCardProps {
  profile: XboxProfile;
  onClick?: () => void;
}

export default function ProfileCard({ profile, onClick }: ProfileCardProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div 
      className={`card ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="avatar avatar-lg">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={`${profile.gamertag} avatar`}
                width={100}
                height={100}
                className="avatar avatar-lg"
              />
            ) : (
              <div className="avatar avatar-lg flex items-center justify-center text-2xl font-bold">
                {profile.gamertag.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="card-title">{profile.gamertag}</h3>
            {profile.realName && (
              <p className="card-subtitle">{profile.realName}</p>
            )}
          </div>
          {profile.accountTier && (
            <div className="badge badge-success">{profile.accountTier}</div>
          )}
        </div>
      </div>

      <div className="card-content">
        <div className="grid grid-2 gap-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {profile.gamerScore.toLocaleString()}
            </div>
            <div className="text-muted text-sm">Gamerscore</div>
          </div>
          {profile.tenure && (
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {profile.tenure}
              </div>
              <div className="text-muted text-sm">Anos no Xbox</div>
            </div>
          )}
        </div>

        {profile.bio && (
          <div className="mt-3">
            <p className="text-sm text-muted">{profile.bio}</p>
          </div>
        )}

        {profile.location && (
          <div className="mt-2">
            <span className="text-sm text-muted">📍 {profile.location}</span>
          </div>
        )}
      </div>

      {profile.preferredColor && (
        <div className="card-footer">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">Cores favoritas:</span>
            <div className="flex gap-1">
              <div
                className="w-4 h-4 rounded-full border border-gray-600"
                style={{ backgroundColor: profile.preferredColor.primaryColor }}
                title="Cor primária"
              />
              <div
                className="w-4 h-4 rounded-full border border-gray-600"
                style={{ backgroundColor: profile.preferredColor.secondaryColor }}
                title="Cor secundária"
              />
              <div
                className="w-4 h-4 rounded-full border border-gray-600"
                style={{ backgroundColor: profile.preferredColor.tertiaryColor }}
                title="Cor terciária"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}