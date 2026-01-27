"use client";

import { XboxGame } from "@/types";
import Image from "next/image";

interface GameCardProps {
  game: XboxGame;
  onClick?: () => void;
  showLastPlayed?: boolean;
}

export default function GameCard({
  game,
  onClick,
  showLastPlayed = false,
}: GameCardProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  const formatLastPlayed = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Ontem";
    if (diffDays <= 7) return `${diffDays} dias atrás`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} semanas atrás`;
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div
      className={`card ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      <div className="card-header">
        <div className="flex gap-3">
          {game.displayImage && (
            <div className="flex-shrink-0">
              <Image
                src={game.displayImage}
                alt={`${game.name} cover`}
                width={80}
                height={80}
                className="rounded border border-gray-600"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="card-title truncate">{game.name}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {game.type && (
                <span className="badge badge-secondary">{game.type}</span>
              )}
              {game.category && (
                <span className="badge badge-secondary">{game.category}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card-content">
        {game.description && (
          <p className="text-sm text-muted line-clamp-3 mb-3">
            {game.description}
          </p>
        )}

        <div className="grid grid-2 gap-2 text-sm">
          {game.publisherName && (
            <div>
              <span className="text-muted">Publisher:</span>
              <div className="font-semibold">{game.publisherName}</div>
            </div>
          )}
          {game.developerName && (
            <div>
              <span className="text-muted">Developer:</span>
              <div className="font-semibold">{game.developerName}</div>
            </div>
          )}
        </div>

        {game.releaseDate && (
          <div className="mt-2 text-sm">
            <span className="text-muted">Lançamento:</span>
            <span className="ml-2">
              {new Date(game.releaseDate).toLocaleDateString("pt-BR")}
            </span>
          </div>
        )}

        {showLastPlayed && game.titleHistory && (
          <div className="mt-2 text-sm">
            <span className="text-muted">Última vez jogado:</span>
            <span className="ml-2 text-success">
              {formatLastPlayed(game.titleHistory.timestamp)}
            </span>
          </div>
        )}
      </div>

      {game.devices && game.devices.length > 0 && (
        <div className="card-footer">
          <div className="flex flex-wrap gap-1">
            <span className="text-sm text-muted mr-2">Disponível em:</span>
            {game.devices.map((device, index) => (
              <span key={index} className="badge badge-secondary text-xs">
                {device}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
