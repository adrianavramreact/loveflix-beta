export const STARTING_COINS = 15;

export const EPISODE_PRICE = 85;
export const SEASON_PRICE = 150;

export type CoinPack = {
  id: string;
  coins: number;
  bonus: number;
  price: string;
  badge?: 'popular' | 'bestValue';
};

export const COIN_PACKS: CoinPack[] = [
  { id: 'pack-300', coins: 300, bonus: 0, price: '€2.99' },
  { id: 'pack-800', coins: 800, bonus: 50, price: '€6.99', badge: 'popular' },
  { id: 'pack-2500', coins: 2500, bonus: 200, price: '€19.99' },
  { id: 'pack-6000', coins: 6000, bonus: 1000, price: '€49.99', badge: 'bestValue' },
];

export const DEFAULT_PACK_ID = 'pack-800';
