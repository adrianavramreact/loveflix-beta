import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STARTING_COINS } from '@/features/unlock/domain/pricing';
import { canAfford } from '@/features/unlock/domain/rules';

type WalletState = {
  coins: number;
  unlockedEpisodeIds: string[];
  unlock: (episodeIds: string[], price: number) => boolean;
  addCoins: (amount: number) => void;
};

export const useWallet = create<WalletState>()(
  persist(
    (set, get) => ({
      coins: STARTING_COINS,
      unlockedEpisodeIds: [],
      unlock: (episodeIds, price) => {
        const { coins, unlockedEpisodeIds } = get();
        if (!canAfford(coins, price)) return false;
        set({
          coins: coins - price,
          unlockedEpisodeIds: [...unlockedEpisodeIds, ...episodeIds],
        });
        return true;
      },
      addCoins: (amount) => set({ coins: get().coins + amount }),
    }),
    {
      name: 'loveflix-wallet',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
