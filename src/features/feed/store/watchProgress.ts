import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type WatchProgressState = {
  lastIndexBySeries: Record<string, number>;
  setLastIndex: (seriesId: string, index: number) => void;
};

export const useWatchProgress = create<WatchProgressState>()(
  persist(
    (set, get) => ({
      lastIndexBySeries: {},
      setLastIndex: (seriesId, index) =>
        set({ lastIndexBySeries: { ...get().lastIndexBySeries, [seriesId]: index } }),
    }),
    {
      name: 'loveflix-watch-progress',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
