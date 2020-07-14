import { usePaginatedQuery } from "react-query"
import { api } from "../utils/api"
import { PokemonItem } from "../types/PokemonItem"

const POKEMON_LIST_CACHE_KEY = "/pokemon"

interface Pagination {
  limit: number
  page: number
}

interface PokemonList {
  count: number
  next: string
  pervious: string
  results: PokemonItem[]
}

export const usePokemonList = (pagination?: Pagination) => {
  const { limit = 20, page = 1 } = pagination ?? {}
  return usePaginatedQuery(
    [POKEMON_LIST_CACHE_KEY, page, limit],
    (key, page, limit) =>
      api.get<PokemonList>(key, {
        params: {
          limit: limit,
          offset: page * limit,
        },
      })
  )
}
