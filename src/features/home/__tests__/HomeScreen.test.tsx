import { fireEvent, render, screen } from '@testing-library/react-native';

import { strings } from '@/shared/constants/strings';
import { AVATAR, GENRES, SERIES } from '@/shared/data/catalog';
import { HomeScreen } from '@/features/home/screens/HomeScreen';

const featured = SERIES[0];

async function renderHome(onPlay = jest.fn()) {
  await render(
    <HomeScreen
      featured={featured}
      rows={[{ title: 'Trending Romance', sectionTitle: 'Romance', series: SERIES.slice(1, 4) }]}
      genres={GENRES}
      avatar={AVATAR}
      onPlay={onPlay}
      onOpenSeries={jest.fn()}
    />,
  );
  return onPlay;
}

describe('HomeScreen', () => {
  it('shows the featured series as the main heading', async () => {
    await renderHome();
    expect(screen.getByRole(strings.roles.header, { name: featured.title })).toBeTruthy();
  });

  it('plays the featured series from the hero button', async () => {
    const onPlay = await renderHome();
    fireEvent.press(screen.getByLabelText(strings.home.a11y.watchSeries(featured.title)));
    expect(onPlay).toHaveBeenCalledWith(featured.id);
  });
});
