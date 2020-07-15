import { useQuery } from "react-query"
import { api } from "../utils/api"
import { Pokemon } from "../types/Pokemon"

const POKEMON_CACHE_KEY = "/pokemon"

export const usePokemon = (name: string) => {
  return useQuery([POKEMON_CACHE_KEY, name], (...args) =>
    api.get<Pokemon>(args.join("/"))
  )
}
