export const fetchPokemons = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon').then((res) =>
    res.json()
  )
  return res
}

export const fetchPokemon = async (pokemonNumber: number) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`).then((res) =>
    res.json()
  )
  return res
}
