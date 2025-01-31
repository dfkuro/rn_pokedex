// import EditScreenInfo from "@/components/EditScreenInfo";
import { useQuery } from '@tanstack/react-query';
import { StyleSheet } from "react-native";
import { View, Text, Button, YStack, XStack, Theme, H5 } from 'tamagui'
import { fetchPokemons } from '@/lib/api'


export default function TabOneScreen() {
  const { data } = useQuery<any[]>({
    queryKey: ['stream-hydrate-pokemons'],
    queryFn: () => fetchPokemons(),
    // suspense: true,
    staleTime: 5 * 1000
  })

  type dataPokemon = {
    /** The pokemon name */
    name: string,
    /** Url string to get detailed data from that pokemon */
    url: string
  }

  return <XStack fullscreen padding="$size.xl" alignSelf="center" backgroundColor="$bg">
    <YStack>
      <Text style={{ fontSize: 22 }}>Hello</Text>
      <View style={{ paddingVertical: 20 }}>
        {data?.results.map((item: dataPokemon) => {
          return <Text key={item.name}>{item.name}</Text>
        })}
      </View>
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
