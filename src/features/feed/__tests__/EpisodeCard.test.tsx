import { fireEvent, render, screen } from '@testing-library/react-native';

import { EpisodeCard } from '@/features/feed/components/EpisodeCard';
import { strings } from '@/shared/constants/strings';
import { getSeries } from '@/shared/data/catalog';

const series = getSeries('billionaires-secret')!;
const lockedEpisode = series.episodes.find((episode) => !episode.isFree)!;

async function renderCard(onUnlock = jest.fn()) {
  await render(
    <EpisodeCard
      index={lockedEpisode.index - 1}
      episode={lockedEpisode}
      seriesTitle={series.title}
      locked
      active
      nearActive
      height={800}
      onUnlock={onUnlock}
      onEnded={jest.fn()}
    />,
  );
  return onUnlock;
}

describe('EpisodeCard', () => {
  it('shows the series title', async () => {
    await renderCard();
    expect(screen.getByRole('header', { name: series.title })).toBeTruthy();
  });

  it('asks to unlock a locked episode', async () => {
    const onUnlock = await renderCard();
    await fireEvent.press(
      screen.getAllByLabelText(strings.feed.unlockEpisode(lockedEpisode.index))[0],
    );
    expect(onUnlock).toHaveBeenCalledWith(lockedEpisode.id);
  });
});
