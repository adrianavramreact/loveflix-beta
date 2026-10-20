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
  feed: {
    watch: 'Watch',
    pause: 'Pause',
    like: 'Like',
    unlike: 'Unlike',
    share: 'Share',
    shareEpisode: 'Share episode',
    coinMark: '1',
    videoUnavailable: 'Video unavailable',
    noEpisodes: 'No episodes yet.',
    unlockEpisode: (index: number) => `Unlock Episode ${index}`,
    episodeTag: (index: number) => `Ep ${index}`,
    duration: (formatted: string) => `${SEPARATOR.trimStart()}${formatted}`,
    shareMessage: (seriesTitle: string, index: number) =>
      `Watch ${seriesTitle}, episode ${index}, on LoveFlix`,
  },
  unlock: {
    locked: 'Locked',
    episodeLabel: (index: number) => `Episode ${index}`,
    title: 'Continue the romance',
    subtitle: 'Unlock all episodes and discover what happens next in their journey.',
    episodeOption: 'Unlock Episode',
    episodeOptionDetail: 'One-time access',
    seasonOption: 'Unlock Full Season',
    seasonOptionDetail: (from: number, to: number) =>
      from === to ? `Episode ${from}` : `Episodes ${from} - ${to}`,
    bestValue: 'Best Value',
    coins: (amount: number) => `${amount} Coins`,
    unlockNow: 'Unlock Now',
    maybeLater: 'Maybe Later',
  },
};
