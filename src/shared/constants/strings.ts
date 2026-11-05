const SEPARATOR = ' • ';

export const strings = {
  roles: {
    button: 'button',
    header: 'header',
    radio: 'radio',
  } as const,
  common: {
    separator: SEPARATOR,
    notInPrototype: 'Not part of this prototype.',
  },
  error: {
    title: 'Something went wrong',
    message: 'This screen could not be shown. Please try again.',
    retry: 'Try again',
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
    episodeCount: (count: number) => `${count} Eps`,
    minutesPerEpisode: (minutes: number) => `${minutes}m/ep`,
    stats: (rating: number, episodeCount: number) =>
      `★ ${rating}${SEPARATOR}${episodeCount} Episodes`,
    a11y: {
      search: 'Search',
      notifications: 'Notifications',
      yourProfile: 'Your profile',
      addToList: 'Add to my list',
      watchSeries: (title: string) => `Watch ${title}`,
      showGenre: (genre: string) => `Show ${genre}`,
      openSeries: (title: string) => `Open ${title}`,
    },
  },
  feed: {
    watch: 'Watch',
    pause: 'Pause',
    share: 'Share',
    coinMark: '1',
    videoUnavailable: 'Video unavailable',
    noEpisodes: 'No episodes yet.',
    unlockEpisode: (index: number) => `Unlock Episode ${index}`,
    episodeTag: (index: number) => `Ep ${index}`,
    duration: (formatted: string) => `${SEPARATOR.trimStart()}${formatted}`,
    shareMessage: (seriesTitle: string, index: number) =>
      `Watch ${seriesTitle}, episode ${index}, on LoveFlix`,
    a11y: {
      back: 'Back',
      like: 'Like',
      unlike: 'Unlike',
      shareEpisode: 'Share episode',
    },
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
    a11y: {
      optionLabel: (title: string, price: number) => `${title}, ${price} Coins`,
      optionHint: 'Then tap Unlock Now below.',
    },
  },
  topup: {
    title: 'Unlock Episode',
    seasonTitle: 'Unlock Season',
    episodeStatus: (from: number, to: number) =>
      `${from === to ? `Episode ${from}` : `Episodes ${from} - ${to}`}${SEPARATOR}Locked`,
    unlockFor: (price: number) => `Unlock for ${price} Coins`,
    yourBalance: 'Your Balance',
    rechargeCoins: 'Recharge Coins',
    bonus: (amount: number) => `+ ${amount} Bonus`,
    popular: 'Popular',
    buyCoins: (coins: number) => `Buy ${coins} Coins`,
    forPrice: (price: string) => `for ${price}`,
    secure: 'Secure',
    simulated: 'Purchases are simulated in this prototype. No payment is made.',
    a11y: {
      back: 'Back',
      packLabel: (coins: number, price: string) => `${coins} coins for ${price}`,
      packHint: 'Then tap Buy below to pay.',
    },
  },
};
