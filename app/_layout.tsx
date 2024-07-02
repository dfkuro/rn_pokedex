import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TamaguiProvider, createTamagui } from "tamagui";
// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useColorScheme } from "@/components/useColorScheme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { config } from "@tamagui/config/v3";

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)/login",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  // const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </TamaguiProvider>
  );

  // return (
  //  <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
  //    <SafeAreaView style={{ flex: 1 }}>
  //      <Stack>
  //        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
  //      </Stack>
  //      {/* <Stack> */}
  //      {/*   <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
  //      {/*   <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
  //      {/* </Stack> */}
  //   </SafeAreaView>
  //  </ThemeProvider>
  //);
}
