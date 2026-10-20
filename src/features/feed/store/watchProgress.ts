import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type WatchProgressState = {
  lastEpisodeBySeries: Record<string, number>;
  setLastEpisode: (seriesId: string, episodeNumber: number) => void;
};

export const useWatchProgress = create<WatchProgressState>()(
  persist(
    (set, get) => ({
      lastEpisodeBySeries: {},
      setLastEpisode: (seriesId, episodeNumber) =>
        set({ lastEpisodeBySeries: { ...get().lastEpisodeBySeries, [seriesId]: episodeNumber } }),
    }),
    {
      name: 'loveflix-watch-progress',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
