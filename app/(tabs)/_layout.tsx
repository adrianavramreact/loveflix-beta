import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';

import { colors, fonts } from '../../src/shared/theme/tokens';

type IconName = ComponentProps<typeof Ionicons>['name'];

const TABS: { name: string; title: string; icon: IconName }[] = [
  { name: 'index', title: 'Home', icon: 'home-outline' },
  { name: 'discover', title: 'Discover', icon: 'compass-outline' },
  { name: 'romance', title: 'Romance', icon: 'heart-outline' },
  { name: 'library', title: 'Library', icon: 'bookmark-outline' },
  { name: 'profile', title: 'Profile', icon: 'person-outline' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
        tabBarLabelStyle: { fontFamily: fonts.bodyMedium },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} color={color as string} size={size} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
