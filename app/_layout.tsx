import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import { useWatchProgress } from '@/features/feed';
import { useWallet } from '@/features/unlock';
import { colors } from '@/shared/theme/tokens';

function storesHydrated() {
  return useWallet.persist.hasHydrated() && useWatchProgress.persist.hasHydrated();
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const [hydrated, setHydrated] = useState(storesHydrated);

  useEffect(() => {
    const update = () => setHydrated(storesHydrated());
    const unsubscribeWallet = useWallet.persist.onFinishHydration(update);
    const unsubscribeProgress = useWatchProgress.persist.onFinishHydration(update);
    update();
    return () => {
      unsubscribeWallet();
      unsubscribeProgress();
    };
  }, []);

  if (!fontsLoaded || !hydrated) return null;

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
      >
        <Stack.Screen name="unlock/[episodeId]" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
    </>
  );
}
