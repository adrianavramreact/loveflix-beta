import { fireEvent, render, screen } from '@testing-library/react-native';

import { EPISODE_PRICE, SEASON_PRICE } from '@/features/unlock/domain/pricing';
import { ContinueTheRomanceScreen } from '@/features/unlock/screens/ContinueTheRomanceScreen';
import { strings } from '@/shared/constants/strings';
import { getSeries } from '@/shared/data/catalog';

const series = getSeries('billionaires-secret')!;

async function renderScreen(props: { onSelect?: jest.Mock; onUnlock?: jest.Mock } = {}) {
  const onSelect = props.onSelect ?? jest.fn();
  const onUnlock = props.onUnlock ?? jest.fn();
  await render(
    <ContinueTheRomanceScreen
      episodeIndex={5}
      thumbnail={series.poster}
      showSeason
      seasonFrom={5}
      seasonTo={6}
      episodePrice={EPISODE_PRICE}
      seasonPrice={SEASON_PRICE}
      selected="season"
      onSelect={onSelect}
      onUnlock={onUnlock}
      onMaybeLater={jest.fn()}
    />,
  );
  return { onSelect, onUnlock };
}

describe('ContinueTheRomanceScreen', () => {
  it('shows the title', async () => {
    await renderScreen();
    expect(screen.getByRole('header', { name: strings.unlock.title })).toBeTruthy();
  });

  it('lets the user pick the single episode', async () => {
    const { onSelect } = await renderScreen();
    await fireEvent.press(
      screen.getByRole('radio', { name: new RegExp(strings.unlock.episodeOption) }),
    );
    expect(onSelect).toHaveBeenCalledWith('episode');
  });

  it('unlocks with the selected option', async () => {
    const { onUnlock } = await renderScreen();
    await fireEvent.press(screen.getByRole('button', { name: strings.unlock.unlockNow }));
    expect(onUnlock).toHaveBeenCalled();
  });
});
