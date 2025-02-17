import { DevToolsBubble } from "react-native-react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as  Clipboard from 'expo-clipboard';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

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
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
        <StatusBar style={colorScheme || 'dark'} />
      </ThemeProvider>
      <DevToolsBubble onCopy={onCopy} />
    </QueryClientProvider>
  );
}
