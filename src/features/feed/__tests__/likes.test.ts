import { useLikes } from '@/features/feed/store/likes';

describe('likes', () => {
  it('likes an episode and takes the like back', () => {
    useLikes.getState().toggleLike('ep1');
    expect(useLikes.getState().likedEpisodeIds).toEqual(['ep1']);
    useLikes.getState().toggleLike('ep1');
    expect(useLikes.getState().likedEpisodeIds).toEqual([]);
  });
});
