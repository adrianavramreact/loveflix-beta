import type { ImageSourcePropType } from 'react-native';

// Mock catalog for the prototype. Titles follow the poster artwork; episode titles
// come from the design. Every series reuses the same five sample clips.

export type Episode = {
  id: string;
  seriesId: string;
  index: number;
  title: string;
  durationSec: number;
  video: number;
  thumbnail: ImageSourcePropType;
  isFree: boolean;
};

export type Series = {
  id: string;
  title: string;
  tagline: string;
  genres: string[];
  rating: number;
  episodeCount: number;
  minutesPerEpisode: number;
  isPro: boolean;
  poster: ImageSourcePropType;
  episodes: Episode[];
};

export type HomeSection = {
  title: string;
  rows: { title: string; seriesIds: string[] }[];
};

// Episodes 1–4 are free; the cliffhanger lock starts at episode 5.
const FREE_EPISODES = 4;

const EPISODE_TITLES = [
  'The Accidental Message',
  'Coffee and Contracts',
  'A Glimpse Behind the Mask',
  'The Gala Encounter',
  'Misunderstandings',
  'Midnight Confessions',
];

const CLIPS = [
  require('../../../assets/videos/ep-1.mp4'),
  require('../../../assets/videos/ep-2.mp4'),
  require('../../../assets/videos/ep-3.mp4'),
  require('../../../assets/videos/ep-4.mp4'),
  require('../../../assets/videos/ep-5.mp4'),
];

const CLIP_DURATION_SEC = 10;

function buildEpisodes(
  seriesId: string,
  poster: ImageSourcePropType,
  thumbnails: Record<number, ImageSourcePropType> = {},
): Episode[] {
  return EPISODE_TITLES.map((title, i) => {
    const index = i + 1;
    return {
      id: `${seriesId}-ep${index}`,
      seriesId,
      index,
      title,
      durationSec: CLIP_DURATION_SEC,
      video: CLIPS[i % CLIPS.length],
      thumbnail: thumbnails[index] ?? poster,
      isFree: index <= FREE_EPISODES,
    };
  });
}

type SeriesInput = Omit<Series, 'episodes'> & {
  thumbnails?: Record<number, ImageSourcePropType>;
};

function series({ thumbnails, ...input }: SeriesInput): Series {
  return { ...input, episodes: buildEpisodes(input.id, input.poster, thumbnails) };
}

const billionairesSecretEp1 = require('../../../assets/posters/billionaires-secret-ep1.jpg');

export const SERIES: Series[] = [
  series({
    id: 'billionaires-secret',
    title: "The Billionaire's Secret",
    tagline: "A CEO's dangerous secret contract.",
    genres: ['Romance', 'Drama', 'Billionaire'],
    rating: 4.8,
    episodeCount: 72,
    minutesPerEpisode: 2,
    isPro: false,
    poster: billionairesSecretEp1,
    thumbnails: {
      5: require('../../../assets/posters/billionaires-secret-ep5.jpg'),
      6: require('../../../assets/posters/billionaires-secret-ep6.jpg'),
    },
  }),
  series({
    id: 'the-ceo-and-i',
    title: 'The CEO and I',
    tagline: 'A forbidden empire. A dangerous love.',
    genres: ['Romance', 'Billionaire'],
    rating: 4.7,
    episodeCount: 50,
    minutesPerEpisode: 2,
    isPro: true,
    poster: require('../../../assets/posters/the-ceo-and-i.jpg'),
  }),
  series({
    id: 'my-secret-life',
    title: 'My Secret Life',
    tagline: 'A thriller of masks and lies.',
    genres: ['Drama', 'Mystery'],
    rating: 4.5,
    episodeCount: 30,
    minutesPerEpisode: 1,
    isPro: false,
    poster: require('../../../assets/posters/my-secret-life.jpg'),
  }),
  series({
    id: 'love-on-detours',
    title: 'Love on Detours',
    tagline: 'Two hearts, one tangled road.',
    genres: ['Romance'],
    rating: 4.6,
    episodeCount: 65,
    minutesPerEpisode: 2,
    isPro: true,
    poster: require('../../../assets/posters/love-on-detours.jpg'),
  }),
  series({
    id: 'blood-roses',
    title: 'Blood Roses',
    tagline: 'Every rose has its price.',
    genres: ['Romance', 'Drama'],
    rating: 4.6,
    episodeCount: 80,
    minutesPerEpisode: 2,
    isPro: true,
    poster: require('../../../assets/posters/blood-roses.jpg'),
  }),
  series({
    id: 'shadow-kiss',
    title: 'Shadow Kiss',
    tagline: 'A forbidden love that defies the darkness.',
    genres: ['Romance', 'Fantasy'],
    rating: 4.7,
    episodeCount: 45,
    minutesPerEpisode: 1.5,
    isPro: false,
    poster: require('../../../assets/posters/shadow-kiss.jpg'),
  }),
  series({
    id: 'dark-desire',
    title: 'Dark Desire',
    tagline: 'A thriller of consuming passion.',
    genres: ['Romance', 'Thriller'],
    rating: 4.5,
    episodeCount: 60,
    minutesPerEpisode: 2,
    isPro: true,
    poster: require('../../../assets/posters/dark-desire.jpg'),
  }),
  series({
    id: 'avenging-angel',
    title: 'Avenging Angel',
    tagline: 'She came back for justice.',
    genres: ['Action', 'Fantasy'],
    rating: 4.8,
    episodeCount: 90,
    minutesPerEpisode: 2.5,
    isPro: true,
    poster: require('../../../assets/posters/avenging-angel.jpg'),
  }),
  series({
    id: 'band-of-fate',
    title: 'Band of Fate',
    tagline: 'Bound by a promise they never made.',
    genres: ['Mystery', 'Drama'],
    rating: 4.4,
    episodeCount: 25,
    minutesPerEpisode: 1,
    isPro: false,
    poster: require('../../../assets/posters/band-of-fate.jpg'),
  }),
  series({
    id: 'second-chance',
    title: 'Second Chance',
    tagline: 'A new dawn. A new path.',
    genres: ['Romance', 'Drama'],
    rating: 4.6,
    episodeCount: 55,
    minutesPerEpisode: 2,
    isPro: true,
    poster: require('../../../assets/posters/second-chance.jpg'),
  }),
];

export const FEATURED_SERIES_ID = 'billionaires-secret';

export const GENRES = ['All', 'Romance', 'Drama', 'Action', 'Mystery'];

export const HOME_SECTIONS: HomeSection[] = [
  {
    title: 'Romance',
    rows: [
      {
        title: 'Trending Romance',
        seriesIds: ['the-ceo-and-i', 'my-secret-life', 'love-on-detours'],
      },
      { title: 'Forbidden Love', seriesIds: ['blood-roses', 'shadow-kiss', 'dark-desire'] },
    ],
  },
  {
    title: 'Popular Micro Dramas',
    rows: [
      { title: 'Most Watched', seriesIds: ['avenging-angel', 'band-of-fate', 'second-chance'] },
    ],
  },
];

export const AVATAR = require('../../../assets/posters/avatar.jpg');

export function getSeries(id: string): Series | undefined {
  return SERIES.find((s) => s.id === id);
}
