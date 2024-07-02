import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <>
      <StatusBar style="dark" backgroundColor="pink" />
      <View style={{ height: "100%", backgroundColor: "pink" }}>
        <Text>Hello there</Text>
      </View>
    </>
  );
}
