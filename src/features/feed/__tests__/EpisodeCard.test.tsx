import { fireEvent, render, screen } from '@testing-library/react-native';

import { EpisodeCard } from '@/features/feed/components/EpisodeCard';
import { strings } from '@/shared/constants/strings';
import { getSeries } from '@/shared/data/catalog';

const series = getSeries('billionaires-secret')!;
const lockedEpisode = series.episodes.find((episode) => !episode.isFree)!;

async function renderCard({ onUnlock = jest.fn(), onToggleLike = jest.fn(), liked = false } = {}) {
  await render(
    <EpisodeCard
      index={lockedEpisode.index - 1}
      episode={lockedEpisode}
      seriesTitle={series.title}
      locked
      liked={liked}
      active
      nearActive
      height={800}
      onUnlock={onUnlock}
      onToggleLike={onToggleLike}
      onEnded={jest.fn()}
    />,
  );
  return { onUnlock, onToggleLike };
}

describe('EpisodeCard', () => {
  it('shows the series title', async () => {
    await renderCard();
    expect(screen.getByRole('header', { name: series.title })).toBeTruthy();
  });

  it('asks to unlock a locked episode', async () => {
    const { onUnlock } = await renderCard();
    await fireEvent.press(
      screen.getAllByLabelText(strings.feed.unlockEpisode(lockedEpisode.index))[0],
    );
    expect(onUnlock).toHaveBeenCalledWith(lockedEpisode.id);
  });

  it('likes the episode', async () => {
    const { onToggleLike } = await renderCard();
    await fireEvent.press(screen.getByRole('button', { name: strings.feed.like }));
    expect(onToggleLike).toHaveBeenCalledWith(lockedEpisode.id);
  });

  it('shows a liked episode as liked', async () => {
    await renderCard({ liked: true });
    expect(screen.getByRole('button', { name: strings.feed.unlike })).toBeTruthy();
  });
});
