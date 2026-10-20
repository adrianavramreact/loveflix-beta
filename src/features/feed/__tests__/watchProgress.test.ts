import { useWatchProgress } from '@/features/feed/store/watchProgress';

describe('watch progress', () => {
  it('remembers the last episode per series', () => {
    useWatchProgress.getState().setLastEpisode('series-a', 3);
    useWatchProgress.getState().setLastEpisode('series-b', 2);
    expect(useWatchProgress.getState().lastEpisodeBySeries).toEqual({
      'series-a': 3,
      'series-b': 2,
    });
  });
});
