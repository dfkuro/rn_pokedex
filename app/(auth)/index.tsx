import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, View, Image } from "tamagui";

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "purple",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <StatusBar style="light" backgroundColor="purple" />
      <Image
        mb={50}
        alignSelf="center"
        source={{
          uri: "https://cdn.pixabay.com/photo/2020/09/16/18/39/icon-5577198_1280.png",
        }}
        width={300}
        height={300}
      />
      <Button>Log In</Button>
    </View>
  );
}
