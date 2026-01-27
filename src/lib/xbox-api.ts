import {
  ApiResponse,
  XboxProfile,
  XboxGame,
  Achievement,
  GameStats,
} from "@/types";

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
  async getRecentGames(xuid: string): Promise<ApiResponse<XboxGame[]>> {
    try {
      const response = await fetchWithAuth(`/games/recent/${xuid}`);
      const data = await response.json();
      return { success: true, data };
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

  async getGameDetails(titleId: string): Promise<ApiResponse<XboxGame>> {
    try {
      const response = await fetchWithAuth(`/games/details/${titleId}`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        data: {} as XboxGame,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch game details",
      };
    }
  },

  async searchGames(query: string): Promise<ApiResponse<XboxGame[]>> {
    try {
      const response = await fetchWithAuth(
        `/games/search?q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        data: [],
        error:
          error instanceof Error ? error.message : "Failed to search games",
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
