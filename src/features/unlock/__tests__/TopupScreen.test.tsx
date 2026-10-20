import { fireEvent, render, screen } from '@testing-library/react-native';

import { COIN_PACKS, EPISODE_PRICE, STARTING_COINS } from '@/features/unlock/domain/pricing';
import { TopupScreen } from '@/features/unlock/screens/TopupScreen';
import { strings } from '@/shared/constants/strings';
import { getSeries } from '@/shared/data/catalog';

const series = getSeries('billionaires-secret')!;
const [firstPack, secondPack] = COIN_PACKS;

async function renderScreen() {
  const onSelectPack = jest.fn();
  const onBuy = jest.fn();
  await render(
    <TopupScreen
      seriesTitle={series.title}
      option="episode"
      episodeFrom={5}
      episodeTo={5}
      thumbnail={series.poster}
      unlockPrice={EPISODE_PRICE}
      balance={STARTING_COINS}
      packs={COIN_PACKS}
      selectedPack={firstPack}
      onSelectPack={onSelectPack}
      onBuy={onBuy}
      onBack={jest.fn()}
    />,
  );
  return { onSelectPack, onBuy };
}

describe('TopupScreen', () => {
  it('shows the title', async () => {
    await renderScreen();
    expect(screen.getByRole('header', { name: strings.topup.title })).toBeTruthy();
  });

  it('lets the user pick a coin pack', async () => {
    const { onSelectPack } = await renderScreen();
    await fireEvent.press(
      screen.getByRole('radio', {
        name: strings.topup.packLabel(secondPack.coins, secondPack.price),
      }),
    );
    expect(onSelectPack).toHaveBeenCalledWith(secondPack.id);
  });

  it('buys the selected pack', async () => {
    const { onBuy } = await renderScreen();
    await fireEvent.press(
      screen.getByRole('button', { name: strings.topup.buyCoins(firstPack.coins) }),
    );
    expect(onBuy).toHaveBeenCalled();
  });
});
