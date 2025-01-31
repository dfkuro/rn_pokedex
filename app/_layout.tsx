import { DevToolsBubble } from "react-native-react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as  Clipboard from 'expo-clipboard';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from "tamagui";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import tamaguiConfig from '../tamagui.config'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  const onCopy = async (text: string) => {
    try {
      // This words for expo
      await Clipboard.setStringAsync(text)
      return true
    } catch {
      return true
    }
  }

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;


  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </ThemeProvider>
      </TamaguiProvider>
      <DevToolsBubble onCopy={onCopy} />
    </QueryClientProvider>
  );
}
