import { View, StyleSheet, Text } from 'react-native'
import { Image } from 'expo-image'

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

const PokemonItem = ({ pokemon }: { pokemon: Pokemon }) => {
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['
  return (
    <View
      key={pokemon.name}
      style={{
        width: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={styles.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
        source={pokemon.details.sprites.other['official-artwork'].front_default}
      />
      <Text style={styles.textStyle}>
        {pokemon.details.id}.- {pokemon.name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 90,
    height: 90,
    backgroundColor: '#0553',
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
})

export default PokemonItem
