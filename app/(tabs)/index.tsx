import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StyleSheet, View, Text } from "react-native";
import { fetchPokemon } from '@/lib/api'
// import { Image } from 'expo-image'

const tilListPokemons = 151;

interface Pokemon {
  /** The pokemon name */
  name: string;
  /** Url string to get detailed data from that pokemon */
  url: string;
}

interface PokemonApiResponse {
  /** Total pokemons */
  count: number;
  next: string;
  previous: string | null;
  /** Array of pokemons */
  results: Pokemon[];
}

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  }
}

export default function TabOneScreen() {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);

  const { data: pokemonDetails } = useQuery<PokemonApiResponse>({
    queryKey: ['pokemons'],
    queryFn: () => fetchPokemon(1),
    // suspense: true,
    staleTime: 5 * 1000
  })


  return <View style={{ flex: 1, padding: 10 }}>
    <Text style={{ fontSize: 22 }}>Hello</Text>
    <View style={{ paddingVertical: 20 }}>
      {/* {pokemons?.map((item: Pokemon) => { */}
      {/*   return <View key={item.name}> *
      {/*     {/* <Image source={`item.`} /> */}
      {/*     <Text style={styles.textStyle}>{item.name}</Text> */}
      {/*   </View> */}
      {/* })} */}
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
    color: 'white'
  }
});
