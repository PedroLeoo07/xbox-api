// Backup data for Xbox Games API
// This data will be used if the external API fails or returns poor quality data

import { XboxGame } from '@/types';

export const backupGames: XboxGame[] = [
  {
    id: 1001,
    name: "Halo Infinite",
    genre: ["First-Person Shooter", "Action", "Sci-Fi"],
    developers: ["343 Industries"],
    publishers: ["Microsoft Studios", "Xbox Game Studios"],
    releaseDates: {
      Japan: "Dec 8, 2021",
      NorthAmerica: "Dec 8, 2021", 
      Europe: "Dec 8, 2021",
      Australia: "Dec 8, 2021"
    }
  },
  {
    id: 1002,
    name: "Forza Horizon 5",
    genre: ["Racing", "Sports", "Open World"],
    developers: ["Playground Games"],
    publishers: ["Microsoft Studios", "Xbox Game Studios"],
    releaseDates: {
      Japan: "Nov 9, 2021",
      NorthAmerica: "Nov 9, 2021",
      Europe: "Nov 9, 2021", 
      Australia: "Nov 9, 2021"
    }
  },
  {
    id: 1003,
    name: "Microsoft Flight Simulator",
    genre: ["Simulation", "Aviation"],
    developers: ["Asobo Studio"],
    publishers: ["Microsoft Studios"],
    releaseDates: {
      Japan: "Aug 18, 2020",
      NorthAmerica: "Aug 18, 2020",
      Europe: "Aug 18, 2020",
      Australia: "Aug 18, 2020"
    }
  },
  {
    id: 1004,
    name: "Sea of Thieves",
    genre: ["Action", "Adventure", "Multiplayer", "Pirate"],
    developers: ["Rare"],
    publishers: ["Microsoft Studios"],
    releaseDates: {
      Japan: "Mar 20, 2018",
      NorthAmerica: "Mar 20, 2018",
      Europe: "Mar 20, 2018",
      Australia: "Mar 20, 2018"
    }
  },
  {
    id: 1005,
    name: "Gears 5",
    genre: ["Third-Person Shooter", "Action"],
    developers: ["The Coalition"],
    publishers: ["Microsoft Studios"],
    releaseDates: {
      Japan: "Sep 10, 2019",
      NorthAmerica: "Sep 10, 2019",
      Europe: "Sep 10, 2019",
      Australia: "Sep 10, 2019"
    }
  },
  {
    id: 1006,
    name: "Age of Empires IV",
    genre: ["Real-Time Strategy", "Historical"],
    developers: ["Relic Entertainment"],
    publishers: ["Microsoft Studios"],
    releaseDates: {
      Japan: "Oct 28, 2021",
      NorthAmerica: "Oct 28, 2021",
      Europe: "Oct 28, 2021",
      Australia: "Oct 28, 2021"
    }
  },
  {
    id: 1007,
    name: "Ori and the Will of the Wisps",
    genre: ["Platform", "Adventure", "Metroidvania"],
    developers: ["Moon Studios"],
    publishers: ["Microsoft Studios"],
    releaseDates: {
      Japan: "Mar 11, 2020",
      NorthAmerica: "Mar 11, 2020",
      Europe: "Mar 11, 2020",
      Australia: "Mar 11, 2020"
    }
  },
  {
    id: 1008,
    name: "Psychonauts 2",
    genre: ["Platform", "Adventure", "Puzzle"],
    developers: ["Double Fine Productions"],
    publishers: ["Microsoft Studios"],
    releaseDates: {
      Japan: "Aug 25, 2021",
      NorthAmerica: "Aug 25, 2021",
      Europe: "Aug 25, 2021",
      Australia: "Aug 25, 2021"
    }
  },
  {
    id: 1009,
    name: "Grounded",
    genre: ["Survival", "Adventure", "Multiplayer"],
    developers: ["Obsidian Entertainment"],
    publishers: ["Microsoft Studios"],
    releaseDates: {
      Japan: "Sep 27, 2022",
      NorthAmerica: "Sep 27, 2022",
      Europe: "Sep 27, 2022",
      Australia: "Sep 27, 2022"
    }
  },
  {
    id: 1010,
    name: "Starfield",
    genre: ["RPG", "Space", "Adventure", "Sci-Fi"],
    developers: ["Bethesda Game Studios"],
    publishers: ["Bethesda Softworks", "Microsoft Studios"],
    releaseDates: {
      Japan: "Sep 6, 2023",
      NorthAmerica: "Sep 6, 2023",
      Europe: "Sep 6, 2023",
      Australia: "Sep 6, 2023"
    }
  },
  {
    id: 1011,
    name: "Halo: The Master Chief Collection",
    genre: ["First-Person Shooter", "Action", "Collection"],
    developers: ["343 Industries", "Bungie"],
    publishers: ["Microsoft Studios"],
    releaseDates: {
      Japan: "Nov 11, 2014",
      NorthAmerica: "Nov 11, 2014",
      Europe: "Nov 11, 2014",
      Australia: "Nov 11, 2014"
    }
  },
  {
    id: 1012,
    name: "Minecraft",
    genre: ["Sandbox", "Survival", "Creative"],
    developers: ["Mojang Studios"],
    publishers: ["Microsoft Studios"],
    releaseDates: {
      Japan: "Nov 18, 2011",
      NorthAmerica: "Nov 18, 2011",
      Europe: "Nov 18, 2011",
      Australia: "Nov 18, 2011"
    }
  }
];

export const getGenreList = (): string[] => {
  const genres = new Set<string>();
  backupGames.forEach(game => {
    game.genre.forEach(g => genres.add(g));
  });
  return Array.from(genres).sort();
};

export const getDeveloperList = (): string[] => {
  const developers = new Set<string>();
  backupGames.forEach(game => {
    game.developers.forEach(dev => developers.add(dev));
  });
  return Array.from(developers).sort();
};