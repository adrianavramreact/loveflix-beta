import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { safeStorage } from '@/shared/storage/safeStorage';

type LikesState = {
  likedEpisodeIds: string[];
  toggleLike: (episodeId: string) => void;
};

export const useLikes = create<LikesState>()(
  persist(
    (set, get) => ({
      likedEpisodeIds: [],
      toggleLike: (episodeId) => {
        const { likedEpisodeIds } = get();
        set({
          likedEpisodeIds: likedEpisodeIds.includes(episodeId)
            ? likedEpisodeIds.filter((id) => id !== episodeId)
            : [...likedEpisodeIds, episodeId],
        });
      },
    }),
    {
      name: 'loveflix-likes',
      storage: createJSONStorage(() => safeStorage),
    },
  ),
);
