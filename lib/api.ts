export const fetchPokemons = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon').then((res) => res.json())
  return res
}

export const fetchPokemon = async (number: number) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`).then((res) => res.json())
  return res
}
