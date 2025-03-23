import { StyleSheet, View, Text, ActivityIndicator, TextInput } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { useInfinitePokemons } from '@/hooks/useInfinitePokemons'
import PokemonItem from '@/components/PokemonItem'
import { useState, useMemo } from 'react'

interface Pokemon {
  /** The pokemon name */
  name: string
  /** Url string to get detailed data from that pokemon */
  url: string
  /** Details for the pokemon */
  details: {
    id: number
    base_experience: number
    height: number
    weight: number
    sprites: {
      front_default: string
      other: {
        'official-artwork': {
          front_default: string
        }
      }
    }
  }
}

export default function TabOneScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isLoading, isError } =
    useInfinitePokemons()

  // Flat data for an unique array
  const allPokemons = data?.pages.flatMap((page) => page.results) ?? []

  const filteredPokemons = useMemo(() => {
    return allPokemons.filter((pokemon: Pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [allPokemons, searchQuery])

  if (isError) return <Text>Error al cargar los pokemons</Text>
  if (isLoading) return <ActivityIndicator size="large" />

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search pokemon..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
      />
      <View style={{ paddingVertical: 20, flex: 1 }}>
        <FlashList
          scrollEnabled
          numColumns={3}
          data={filteredPokemons}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          estimatedItemSize={200}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage && searchQuery === '') fetchNextPage()
          }}
          ListFooterComponent={() =>
            isFetchingNextPage ? (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
              </View>
            ) : null
          }
        />
      </View>
    </View>
  )
}

const renderItem = ({ item }: { item: Pokemon }) => <PokemonItem pokemon={item} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: 'pink',
  },
  searchInput: {
    height: 35,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
})
