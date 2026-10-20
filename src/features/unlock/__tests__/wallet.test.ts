import { EPISODE_PRICE, STARTING_COINS } from '@/features/unlock/domain/pricing';
import { useWallet } from '@/features/unlock/store/wallet';

const initialState = useWallet.getState();

beforeEach(() => {
  useWallet.setState(initialState, true);
});

describe('wallet', () => {
  it('starts with too few coins to unlock an episode', () => {
    expect(useWallet.getState().coins).toBe(STARTING_COINS);
    expect(useWallet.getState().unlock(['ep5'], EPISODE_PRICE)).toBe(false);
    expect(useWallet.getState().unlockedEpisodeIds).toEqual([]);
  });

  it('unlocks and charges once there are enough coins', () => {
    useWallet.getState().addCoins(EPISODE_PRICE);
    expect(useWallet.getState().unlock(['ep5'], EPISODE_PRICE)).toBe(true);
    expect(useWallet.getState().coins).toBe(STARTING_COINS);
    expect(useWallet.getState().unlockedEpisodeIds).toEqual(['ep5']);
  });
});
