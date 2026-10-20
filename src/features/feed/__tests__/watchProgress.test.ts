import { useWatchProgress } from '@/features/feed/store/watchProgress';

describe('watch progress', () => {
  it('remembers the last index per series', () => {
    useWatchProgress.getState().setLastIndex('series-a', 2);
    useWatchProgress.getState().setLastIndex('series-b', 1);
    expect(useWatchProgress.getState().lastIndexBySeries).toEqual({
      'series-a': 2,
      'series-b': 1,
    });
  });
});
