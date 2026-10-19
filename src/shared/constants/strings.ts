// Separator between pieces of metadata, e.g. "Romance • Drama" or "★ 4.8 • 72 Episodes".
const SEPARATOR = ' • ';

export const strings = {
  common: {
    separator: SEPARATOR,
    notInPrototype: 'Not part of this prototype.',
  },
  tabs: {
    home: 'Home',
    discover: 'Discover',
    romance: 'Romance',
    library: 'Library',
    profile: 'Profile',
  },
  home: {
    spotlight: 'Spotlight',
    watchNow: 'Watch Now',
    seeAll: 'See all',
    pro: 'PRO',
    search: 'Search',
    notifications: 'Notifications',
    yourProfile: 'Your profile',
    addToList: 'Add to my list',
    watchSeries: (title: string) => `Watch ${title}`,
    showGenre: (genre: string) => `Show ${genre}`,
    openSeries: (title: string) => `Open ${title}`,
    episodeCount: (count: number) => `${count} Eps`,
    minutesPerEpisode: (minutes: number) => `${minutes}m/ep`,
    stats: (rating: number, episodeCount: number) =>
      `★ ${rating}${SEPARATOR}${episodeCount} Episodes`,
  },
};
