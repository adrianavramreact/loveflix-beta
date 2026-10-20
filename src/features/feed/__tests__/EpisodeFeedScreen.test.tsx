import { fireEvent, render, screen } from '@testing-library/react-native';

import { EpisodeFeedScreen } from '@/features/feed/screens/EpisodeFeedScreen';
import { getSeries } from '@/shared/data/catalog';

const series = getSeries('billionaires-secret')!;
const items = series.episodes.map((episode) => ({ episode, locked: !episode.isFree }));

async function renderFeed(onUnlock = jest.fn()) {
  await render(
    <EpisodeFeedScreen
      seriesTitle={series.title}
      items={items}
      initialIndex={0}
      onUnlock={onUnlock}
      onBack={jest.fn()}
      onActiveIndexChange={jest.fn()}
    />,
  );
  return onUnlock;
}

describe('EpisodeFeedScreen', () => {
  it('shows the series title on the episode cards', async () => {
    await renderFeed();
    expect(screen.getAllByRole('header', { name: series.title })).toHaveLength(items.length);
  });

  it('asks to unlock a locked episode', async () => {
    const onUnlock = await renderFeed();
    await fireEvent.press(screen.getAllByLabelText('Unlock Episode 5')[0]);
    expect(onUnlock).toHaveBeenCalledWith('billionaires-secret-ep5');
  });
});
