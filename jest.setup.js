// Icons load a font through expo-font, which is not available in Jest.
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
}));

jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);

// expo-video needs the native player; tests only check the UI around it.
jest.mock('expo-video', () => ({
  useVideoPlayer: () => ({
    play: jest.fn(),
    pause: jest.fn(),
    addListener: () => ({ remove: jest.fn() }),
  }),
  VideoView: 'VideoView',
}));
