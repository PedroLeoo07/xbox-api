import {
  ApiResponse,
  XboxProfile,
  XboxGame,
  Achievement,
  GameStats,
} from "@/types";

// Xbox Games API endpoint
const GAMES_API_URL = "https://api.sampleapis.com/xbox/games";

// Placeholder for other endpoints (for demo purposes)
const BASE_URL =
  process.env.NEXT_PUBLIC_XBOX_API_URL || "https://api.example.com";
const API_KEY = process.env.NEXT_PUBLIC_XBOX_API_KEY;

class XboxAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "XboxAPIError";
  }
}

async function fetchGamesAPI(): Promise<XboxGame[]> {
  try {
    const response = await fetch(GAMES_API_URL);

    if (!response.ok) {
      throw new XboxAPIError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof XboxAPIError) {
      throw error;
    }
    throw new XboxAPIError("Network error occurred while fetching games");
  }
}

async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const url = `${BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(API_KEY && { Authorization: `Bearer ${API_KEY}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new XboxAPIError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    return response;
  } catch (error) {
    if (error instanceof XboxAPIError) {
      throw error;
    }
    throw new XboxAPIError("Network error occurred");
  }
}

// Profile API
export const profileAPI = {
  async getProfile(gamertag: string): Promise<ApiResponse<XboxProfile>> {
    try {
      const response = await fetchWithAuth(
        `/profile/${encodeURIComponent(gamertag)}`,
      );
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        data: {} as XboxProfile,
        error:
          error instanceof Error ? error.message : "Failed to fetch profile",
      };
    }
  },

  async getProfileByXUID(xuid: string): Promise<ApiResponse<XboxProfile>> {
    try {
      const response = await fetchWithAuth(`/profile/xuid/${xuid}`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        data: {} as XboxProfile,
        error:
          error instanceof Error ? error.message : "Failed to fetch profile",
      };
    }
  },

  async searchProfiles(query: string): Promise<ApiResponse<XboxProfile[]>> {
    try {
      const response = await fetchWithAuth(
        `/profile/search?q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        data: [],
        error:
          error instanceof Error ? error.message : "Failed to search profiles",
      };
    }
  },
};

// Games API
export const gamesAPI = {
  async getAllGames(): Promise<ApiResponse<XboxGame[]>> {
    try {
      const data = await fetchGamesAPI();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : "Failed to fetch games",
      };
    }
  },

  async getGameById(id: number): Promise<ApiResponse<XboxGame | null>> {
    try {
      const allGames = await fetchGamesAPI();
      const game = allGames.find((g) => g.id === id);
      return {
        success: true,
        data: game || null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : "Failed to fetch game",
      };
    }
  },

  async searchGames(query: string): Promise<ApiResponse<XboxGame[]>> {
    try {
      const allGames = await fetchGamesAPI();
      const filteredGames = allGames.filter(
        (game) =>
          game.name.toLowerCase().includes(query.toLowerCase()) ||
          game.developers.some((dev) =>
            dev.toLowerCase().includes(query.toLowerCase()),
          ) ||
          game.publishers.some((pub) =>
            pub.toLowerCase().includes(query.toLowerCase()),
          ) ||
          game.genre.some((genre) =>
            genre.toLowerCase().includes(query.toLowerCase()),
          ),
      );
      return { success: true, data: filteredGames };
    } catch (error) {
      return {
        success: false,
        data: [],
        error:
          error instanceof Error ? error.message : "Failed to search games",
      };
    }
  },

  async getGamesByGenre(genre: string): Promise<ApiResponse<XboxGame[]>> {
    try {
      const allGames = await fetchGamesAPI();
      const filteredGames = allGames.filter((game) =>
        game.genre.some((g) => g.toLowerCase().includes(genre.toLowerCase())),
      );
      return { success: true, data: filteredGames };
    } catch (error) {
      return {
        success: false,
        data: [],
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch games by genre",
      };
    }
  },

  async getGamesByDeveloper(
    developer: string,
  ): Promise<ApiResponse<XboxGame[]>> {
    try {
      const allGames = await fetchGamesAPI();
      const filteredGames = allGames.filter((game) =>
        game.developers.some((dev) =>
          dev.toLowerCase().includes(developer.toLowerCase()),
        ),
      );
      return { success: true, data: filteredGames };
    } catch (error) {
      return {
        success: false,
        data: [],
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch games by developer",
      };
    }
  },

  async getRecentGames(limit: number = 20): Promise<ApiResponse<XboxGame[]>> {
    try {
      const allGames = await fetchGamesAPI();
      // Sort by ID (newer games have higher IDs) and limit results
      const recentGames = allGames.sort((a, b) => b.id - a.id).slice(0, limit);
      return { success: true, data: recentGames };
    } catch (error) {
      return {
        success: false,
        data: [],
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch recent games",
      };
    }
  },

  async getRandomGames(limit: number = 10): Promise<ApiResponse<XboxGame[]>> {
    try {
      const allGames = await fetchGamesAPI();
      // Shuffle array and get limited results
      const shuffled = allGames.sort(() => 0.5 - Math.random());
      const randomGames = shuffled.slice(0, limit);
      return { success: true, data: randomGames };
    } catch (error) {
      return {
        success: false,
        data: [],
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch random games",
      };
    }
  },
};

// Achievements API
export const achievementsAPI = {
  async getAchievements(
    xuid: string,
    titleId?: string,
  ): Promise<ApiResponse<Achievement[]>> {
    try {
      const endpoint = titleId
        ? `/achievements/${xuid}/${titleId}`
        : `/achievements/${xuid}`;
      const response = await fetchWithAuth(endpoint);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        data: [],
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch achievements",
      };
    }
  },

  async getAchievementDetails(
    xuid: string,
    achievementId: string,
  ): Promise<ApiResponse<Achievement>> {
    try {
      const response = await fetchWithAuth(
        `/achievements/${xuid}/details/${achievementId}`,
      );
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        data: {} as Achievement,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch achievement details",
      };
    }
  },

  async getRecentAchievements(
    xuid: string,
  ): Promise<ApiResponse<Achievement[]>> {
    try {
      const response = await fetchWithAuth(`/achievements/${xuid}/recent`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        data: [],
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch recent achievements",
      };
    }
  },
};

// Stats API
export const statsAPI = {
  async getGameStats(
    xuid: string,
    titleId: string,
  ): Promise<ApiResponse<GameStats[]>> {
    try {
      const response = await fetchWithAuth(`/stats/${xuid}/${titleId}`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        data: [],
        error:
          error instanceof Error ? error.message : "Failed to fetch game stats",
      };
    }
  },

  async getOverallStats(xuid: string): Promise<ApiResponse<GameStats[]>> {
    try {
      const response = await fetchWithAuth(`/stats/${xuid}`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        data: [],
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch overall stats",
      };
    }
  },
};

export { XboxAPIError };
