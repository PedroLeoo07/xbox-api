"use client";

import React from "react";
import { XboxGame } from "@/types";

interface GameCardProps {
  game: XboxGame;
  onClick?: () => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  const getAvailableRegions = () => {
    const regions = [];
    if (game.releaseDates?.NorthAmerica && game.releaseDates.NorthAmerica !== "Unreleased")
      regions.push("América do Norte");
    if (game.releaseDates?.Europe && game.releaseDates.Europe !== "Unreleased") 
      regions.push("Europa");
    if (game.releaseDates?.Japan && game.releaseDates.Japan !== "Unreleased") 
      regions.push("Japão");
    if (game.releaseDates?.Australia && game.releaseDates.Australia !== "Unreleased") 
      regions.push("Austrália");
    return regions;
  };

  const getEarliestReleaseDate = () => {
    if (!game.releaseDates) return null;
    
    const dates = [
      { region: "América do Norte", date: game.releaseDates.NorthAmerica },
      { region: "Europa", date: game.releaseDates.Europe },
      { region: "Japão", date: game.releaseDates.Japan },
      { region: "Austrália", date: game.releaseDates.Australia },
    ].filter((item) => 
      item.date && 
      item.date !== "Unreleased" && 
      item.date !== "TBA" && 
      item.date.trim() !== ""
    );

    if (dates.length === 0) return null;

    dates.sort((a, b) => a.date.localeCompare(b.date));
    return dates[0];
  };

  const earliestRelease = getEarliestReleaseDate();
  const availableRegions = getAvailableRegions();

  return (
    <div
      className={`card ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      <div className="card-header">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="card-title truncate">{game.name}</h3>
            <div className="text-sm text-muted">ID: {game.id}</div>
          </div>

          {game.genre && game.genre.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {game.genre.slice(0, 2).map((genre, index) => (
                <span key={index} className="badge badge-secondary text-xs">
                  {genre}
                </span>
              ))}
              {game.genre.length > 2 && (
                <span className="badge badge-secondary text-xs">
                  +{game.genre.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="card-content">
        <div className="grid grid-2 gap-3 text-sm">
          {game.developers && game.developers.length > 0 && (
            <div>
              <span className="text-muted">Desenvolvedor:</span>
              <div className="font-semibold truncate">
                {game.developers[0]}
                {game.developers.length > 1 && (
                  <span className="text-muted">
                    {" "}
                    +{game.developers.length - 1}
                  </span>
                )}
              </div>
            </div>
          )}

          {game.publishers && game.publishers.length > 0 && (
            <div>
              <span className="text-muted">Publisher:</span>
              <div className="font-semibold truncate">
                {game.publishers[0]}
                {game.publishers.length > 1 && (
                  <span className="text-muted">
                    {" "}
                    +{game.publishers.length - 1}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {earliestRelease && (
          <div className="mt-3 text-sm">
            <span className="text-muted">Primeiro lançamento:</span>
            <div className="font-semibold">
              {earliestRelease.date} ({earliestRelease.region})
            </div>
          </div>
        )}
      </div>

      {availableRegions.length > 0 && (
        <div className="card-footer">
          <div className="flex flex-wrap gap-1">
            <span className="text-sm text-muted mr-2">Disponível em:</span>
            {availableRegions.map((region, index) => (
              <span key={index} className="badge badge-success text-xs">
                {region}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
