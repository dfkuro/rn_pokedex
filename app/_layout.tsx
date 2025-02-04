import { DevToolsBubble } from "react-native-react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as  Clipboard from 'expo-clipboard';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from 'react-native'
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
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				</Stack>
			</ThemeProvider>
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
