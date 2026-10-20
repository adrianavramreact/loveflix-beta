import { render, screen } from '@testing-library/react-native';

import { EpisodeFeedScreen } from '@/features/feed/screens/EpisodeFeedScreen';
import { strings } from '@/shared/constants/strings';

describe('EpisodeFeedScreen', () => {
  it('shows a message when the series has no episodes', async () => {
    await render(
      <EpisodeFeedScreen
        seriesTitle=""
        items={[]}
        initialIndex={0}
        onUnlock={jest.fn()}
        onBack={jest.fn()}
        onActiveIndexChange={jest.fn()}
      />,
    );
    expect(screen.getByText(strings.feed.noEpisodes)).toBeTruthy();
  });
});
