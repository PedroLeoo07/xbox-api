import { useMemo } from "react";
import { XboxGame } from "@/types";

/**
 * Hook para memoização de filtros de jogos
 * Evita re-computação desnecessária
 */
export function useMemoizedFilter(
  games: XboxGame[],
  searchQuery: string,
  selectedGenre: string,
  selectedDeveloper: string,
) {
  return useMemo(() => {
    let filtered = games;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (game) =>
          game.name.toLowerCase().includes(query) ||
          game.developers.some((dev) => dev.toLowerCase().includes(query)) ||
          game.publishers.some((pub) => pub.toLowerCase().includes(query)),
      );
    }

    // Filter by genre
    if (selectedGenre) {
      const genre = selectedGenre.toLowerCase();
      filtered = filtered.filter((game) =>
        game.genre.some((g) => g.toLowerCase().includes(genre)),
      );
    }

    // Filter by developer
    if (selectedDeveloper) {
      const developer = selectedDeveloper.toLowerCase();
      filtered = filtered.filter((game) =>
        game.developers.some((dev) => dev.toLowerCase().includes(developer)),
      );
    }

    return filtered;
  }, [games, searchQuery, selectedGenre, selectedDeveloper]);
}
