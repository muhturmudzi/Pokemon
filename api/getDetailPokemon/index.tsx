import axios from 'axios'

import { detailPokemon } from 'types/pokemon.type'

export const getDetailPokemon = async (url: string): Promise<detailPokemon> => {
  try {
    // let file = [
    //   { name: "bulbasaur", owned: 5 },
    //   { name: "ivysaur", owned: 10 }
    // ]
    // const res = await axios({
    //   method: 'GET',
    //   url: `${url}`
    // })
    let file = [
      { name: "bulbasaur", owned: 5, nickname: 'coba dulu' },
      { name: "ivysaur", owned: 10, nickname: 'coba lagi ' }
    ]
    const res = await axios.get<detailPokemon>(url)
    file.forEach((pokemon: { name: string, nickname: string}) => {
      if (pokemon.name === res.data.name) {
        res.data.nickname = pokemon.nickname
      }
    })
    // res.data.results.map((pokemon: { owned: number}) => {
    //   pokemon.owned = 0

    //   return pokemon
    // })

    // res.data.results.forEach((pokemon: Pokemon) => {
    //   file.forEach(item => {
    //     if (item.name === pokemon.name) pokemon.owned = item.owned
    //   })
    // })

    return res.data
  } catch (error) {
    throw new Error(error)
  }
}