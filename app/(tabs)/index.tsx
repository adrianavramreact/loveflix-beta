import { router } from 'expo-router';

import { getLastEpisode } from '@/features/feed';
import { HomeScreen, type HomeRow } from '@/features/home';
import {
  AVATAR,
  FEATURED_SERIES_ID,
  GENRES,
  HOME_SECTIONS,
  type Series,
  getSeries,
} from '@/shared/data/catalog';

function getFeaturedSeries(): Series {
  const series = getSeries(FEATURED_SERIES_ID);
  if (!series) {
    throw new Error(`Featured series "${FEATURED_SERIES_ID}" is missing from the catalog`);
  }
  return series;
}

const featured = getFeaturedSeries();

const rows: HomeRow[] = HOME_SECTIONS.flatMap((section) =>
  section.rows.map((row, i) => ({
    title: row.title,
    sectionTitle: i === 0 ? section.title : undefined,
    series: row.seriesIds.map(getSeries).filter((s): s is Series => s !== undefined),
  })),
);

export default function HomeRoute() {
  const openFeed = (seriesId: string) =>
    router.push({
      pathname: '/feed/[seriesId]',
      params: { seriesId, ep: String(getLastEpisode(seriesId)) },
    });

  return (
    <HomeScreen
      featured={featured}
      rows={rows}
      genres={GENRES}
      avatar={AVATAR}
      onPlay={openFeed}
      onOpenSeries={openFeed}
    />
  );
}
