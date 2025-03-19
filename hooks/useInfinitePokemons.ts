import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPokemons } from '../lib/pokeapi'

export const useInfinitePokemons = (limit: number = 50) => {
  return useInfiniteQuery({
    queryKey: ['pokemons'], // Unique key for the query
    queryFn: ({ pageParam }) => fetchPokemons(limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // if there is not results or next is null, undefined is returned
      if (!lastPage.next) return undefined
      // Next offset is based on the pages quantity
      return allPages.length * limit
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
