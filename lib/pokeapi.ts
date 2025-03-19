/** Just brings in the pokemon data */
export async function fetchPokemons(limit: number = 50, offset: number = 25) {
  if (limit > 100) limit = 100
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
  const data = await response.json()

  data.results = await Promise.all(
    data.results.map(async (item: any) => {
      const pokemonNumber = item.url.split('/').reverse()[1]

      const pokemonDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
      item.details = await pokemonDetails.json()

      const pokemonSpecie = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`,
      )
      item.specie = await pokemonSpecie.json()

      return item
    }),
  )
  return data
}

export async function fetchPokemon(number: number) {
  if (!number) return Promise.reject(new Error('No Pokemon number provided'))
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
  return await response.json()
}
