import { useQuery } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, View, Text } from "react-native";
import { fetchPokemons } from '@/lib/pokeapi'
import { Image } from 'expo-image'

interface Pokemon {
  /** The pokemon name */
  name: string;
  /** Url string to get detailed data from that pokemon */
  url: string;
  /** Details for the pokemon */
  details: {
    id: number;
    base_experience: number;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
      other: {
        'official-artwork': {
          front_default: string;
        }
      }
    }
  };
}

interface PokemonApiResponse {
  /** Total pokemons */
  count: number;
  next: string;
  previous: string | null;
  /** Array of pokemons */
  results: Pokemon[];
}

export default function TabOneScreen() {
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const { data, isLoading, error } = useQuery<PokemonApiResponse>({
    queryKey: ['pokemons'],
    queryFn: () => fetchPokemons(100),
    // suspense: true,
    staleTime: 5 * 1000
  })

  if (isLoading) return <Text>is isLoading</Text>
  if (error) return <Text>Error</Text>

  const PokemonItem = ({ pokemon }: { pokemon: Pokemon }) => {
    return <View
      key={pokemon.name}
      style={{
        width: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        style={styles.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
        source={pokemon.details.sprites.other['official-artwork'].front_default}
      />
      <Text style={styles.textStyle}>{pokemon.name}</Text>
    </View>
  }


  const renderItem = ({ item }: { item: Pokemon }) => <PokemonItem pokemon={item} />

  return <View style={{ flex: 1, padding: 10 }}>
    <View style={{ paddingVertical: 20, flex: 1 }}>
      <FlashList
        scrollEnabled
        numColumns={3}
        data={data?.results}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        estimatedItemSize={200}
      />
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    backgroundColor: 'pink'
  },
  textStyle: {
    color: 'white',
    textAlign: 'center'
  },
  image: {
    flex: 1,
    width: 95,
    height: 95,
    backgroundColor: '#0553'
  }
});
