import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware';

export const safeStorage: StateStorage = {
  getItem: (key) => AsyncStorage.getItem(key).catch(() => null),
  setItem: (key, value) => AsyncStorage.setItem(key, value).catch(() => undefined),
  removeItem: (key) => AsyncStorage.removeItem(key).catch(() => undefined),
};
