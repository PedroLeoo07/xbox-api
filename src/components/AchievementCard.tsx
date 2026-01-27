'use client';

import { Achievement } from '@/types';
import Image from 'next/image';

interface AchievementCardProps {
  achievement: Achievement;
  onClick?: () => void;
}

export default function AchievementCard({ achievement, onClick }: AchievementCardProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  const isUnlocked = achievement.progression.achievementState === 'Achieved';
  const progressPercent = isUnlocked ? 100 : 0;

  const getAchievementIcon = () => {
    const iconAsset = achievement.mediaAssets?.find(
      asset => asset.name === 'Icon' || asset.type === 'Icon'
    );
    return iconAsset?.url;
  };

  const formatUnlockDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getGamerscoreValue = () => {
    const gamerscore = achievement.rewards?.find(
      reward => reward.type === 'Gamerscore'
    );
    return gamerscore?.value || '0';
  };

  return (
    <div 
      className={`card ${onClick ? 'cursor-pointer' : ''} ${
        isUnlocked ? 'border-success' : ''
      }`}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      <div className="card-header">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            {getAchievementIcon() ? (
              <Image
                src={getAchievementIcon()!}
                alt={achievement.name}
                width={60}
                height={60}
                className={`rounded ${!isUnlocked ? 'grayscale opacity-50' : ''}`}
              />
            ) : (
              <div className={`
                w-15 h-15 rounded flex items-center justify-center text-2xl
                ${isUnlocked ? 'bg-success text-white' : 'bg-gray-600 text-gray-400'}
              `}>
                🏆
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`card-title ${!isUnlocked ? 'opacity-60' : ''}`}>
              {achievement.name}
            </h3>
            <p className={`card-subtitle ${!isUnlocked ? 'opacity-60' : ''}`}>
              {isUnlocked ? achievement.description : achievement.lockedDescription}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className={`badge ${isUnlocked ? 'badge-success' : 'badge-secondary'}`}>
              {getGamerscoreValue()}G
            </div>
            {isUnlocked && (
              <div className="text-xs text-success">✓ Desbloqueado</div>
            )}
          </div>
        </div>
      </div>

      {achievement.progression.requirements && achievement.progression.requirements.length > 0 && (
        <div className="card-content">
          <div className="space-y-2">
            {achievement.progression.requirements.map((req, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between text-muted mb-1">
                  <span>Progresso</span>
                  <span>
                    {req.current || '0'} / {req.target}
                  </span>
                </div>
                <div className="progress">
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${Math.min(
                        100, 
                        ((parseInt(req.current || '0') / parseInt(req.target)) * 100)
                      )}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card-footer">
        <div className="flex justify-between items-center text-sm">
          <div className="flex gap-2">
            {achievement.isSecret && (
              <span className="badge badge-warning">Secreto</span>
            )}
            {achievement.achievementType && (
              <span className="badge badge-secondary">
                {achievement.achievementType}
              </span>
            )}
          </div>
          {isUnlocked && achievement.progression.timeUnlocked && (
            <div className="text-muted">
              {formatUnlockDate(achievement.progression.timeUnlocked)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}