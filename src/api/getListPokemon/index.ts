import axios from 'axios'

import { getListMyPokemon } from 'api/getMyPokemons'

import { Pokemons, Pokemon } from 'types/pokemon.type'

export const getListPokemon = async (): Promise<Pokemons> => {
  try {
    const myPokemon = await getListMyPokemon()
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
    res.data.results.map((pokemon: { owned: number}) => {
      pokemon.owned = 0

      return pokemon
    })

    res.data.results.forEach((pokemon: Pokemon) => {
      myPokemon.results.forEach(item => {
        if (item.name === pokemon.name && item.isDelete === false) {
          pokemon.owned = pokemon.owned + 1
        }
      })
    })
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}