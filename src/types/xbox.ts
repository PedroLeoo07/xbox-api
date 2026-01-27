// Xbox API Types - Based on real API structure from https://api.sampleapis.com/xbox/games
export interface XboxGame {
  id: number;
  name: string;
  genre: string[];
  developers: string[];
  publishers: string[];
  releaseDates: {
    Japan: string;
    NorthAmerica: string;
    Europe: string;
    Australia: string;
  };
}

export interface XboxProfile {
  xuid: string;
  gamertag: string;
  gamerScore: number;
  accountTier: string;
  xboxOneRep: string;
  preferredColor: {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
  };
  realName?: string;
  bio?: string;
  location?: string;
  tenure?: number;
  watermarks?: string[];
  avatar?: string;
  gameDisplayPicRaw?: string;
}

export interface Achievement {
  id: string;
  serviceConfigId: string;
  name: string;
  titleAssociations: Array<{
    name: string;
    id: number;
  }>;
  progressState: string;
  progression: {
    achievementState: string;
    requirements: Array<{
      id: string;
      current: string | null;
      target: string;
    }>;
    timeUnlocked: string;
  };
  mediaAssets: Array<{
    name: string;
    type: string;
    url: string;
  }>;
  platform: string;
  isSecret: boolean;
  description: string;
  lockedDescription: string;
  productId: string;
  achievementType: string;
  participationType: string;
  timeWindow: {
    startDate: string;
    endDate: string;
  };
  rewards: Array<{
    name: string;
    description: string;
    value: string;
    type: string;
    valueType: string;
  }>;
  estimatedTime: string;
  deeplink: string;
  isRevoked: boolean;
}

export interface GameStats {
  xuid: string;
  scid: string;
  titleId: string;
  name: string;
  type: string;
  scidname: string;
  displayName: string;
  titleName: string;
  titleType: string;
  platform: string;
  version: string;
  uri: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}
