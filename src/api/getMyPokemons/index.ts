import { MyPokemons } from 'types/pokemon.type'

export const getListMyPokemon = async (): Promise<MyPokemons> => {
  try {
    const data = await localStorage.getItem('MyPokemons')
    
    const result = {
      results: data? JSON.parse(data) : []
    }
    return result
  } catch (error) {
    throw new Error(error)
  }
}