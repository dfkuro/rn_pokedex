import { useQuery } from '@tanstack/react-query';
import { StyleSheet, View, Text, FlatList, ListRenderItem } from "react-native";
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

interface ItemType {
  index: number;
  item: Pokemon;
  separators: {}
}


export default function TabOneScreen() {
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const { data, isLoading, error } = useQuery<PokemonApiResponse>({
    queryKey: ['pokemons'],
    queryFn: () => fetchPokemons(7),
    // suspense: true,
    staleTime: 5 * 1000
  })
  if (isLoading) return <> <Text>is isLoading</Text> </>
  if (error) return <Text>Error</Text>

  const PokemonItem = ({ listElement }: { listElement: ItemType }) => {
    const { item: pokemon } = listElement
    return <View
      key={pokemon.name}
      style={{
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


  const renderItem: ListRenderItem<Pokemon> = (item) => <PokemonItem listElement={item} />
  return <View style={{ flex: 1, padding: 10 }}>
    <View style={{ paddingVertical: 20 }} >
      <FlatList<Pokemon>
        scrollEnabled
        numColumns={5}
        columnWrapperStyle={{
          justifyContent: "space-between"
        }}
        data={data?.results}
        renderItem={renderItem}
        keyExtractor={item => item.name}
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
    width: 70,
    height: 70,
    backgroundColor: '#0553'
  }
});
