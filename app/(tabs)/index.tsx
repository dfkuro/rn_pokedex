// import EditScreenInfo from "@/components/EditScreenInfo";
import { StyleSheet } from "react-native";
import { View, Text, Button, YStack, XStack, Theme, H5 } from 'tamagui'


export default function TabOneScreen() {

  return <XStack fullscreen padding="$size.xl" alignSelf="center" backgroundColor="$bg">
    <YStack>
      <Text>Hello</Text>
    </YStack>
  </XStack>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    backgroundColor: 'pink'
  }
});
