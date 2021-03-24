import React, { useState } from 'react'
import { useQuery } from 'react-query'

import { getListPokemon } from 'api/getListPokemon'
import { getDetailPokemon } from 'api/getDetailPokemon'

import { detailPokemon } from 'types/pokemon.type'

import PokemonCard from 'components/PokemonCard'
import DetailPokemon from 'components/DetailPokemon'

const TaskList: React.FC = () => {
  const { isLoading, isError, error, data } = useQuery('pokemons', getListPokemon)

  const [showDetailPokemon, setshowDetailPokemon] = useState(false)
  const [dataDetailPokemon, setDataDetailPokemon] = useState<detailPokemon>()

  if (isLoading) {
    return (
      <div>Is Loading...</div>
    )
  }

  if (isError) {
    return (
      <div>Is Error... {error}</div>
    )
  }

  
  const callback = async (url: string) => {
    const res = await getDetailPokemon(url)
    const item: detailPokemon = {
      id: res.id,
      name: res.name,
      nickname: res.nickname,
      height: res.height,
      weight: res.weight,
      abilities: res.abilities,
      types: res.types,
      moves: res.moves.length > 4 ? res.moves.splice(0, 4) : res.moves
    }
    setshowDetailPokemon(true)
    setDataDetailPokemon(item)
  }

  return (
    <div>
      <p className="text-white text-xl mb-2 subpixel-antialiased tracking-wide font-bold">Pokemon List</p>
      <section className="flex flex-col overflow-x-hiden overflow-y-auto h-taskList rounded">
        
        {data?.results.map(pokemon => {
          return (
              <PokemonCard 
                key={pokemon.name}
                name={pokemon.name}
                owned={pokemon.owned}
                url={pokemon.url}
                callBack={(url) => callback(url)}
              />
          )
        })}

      </section>
      <DetailPokemon tipe="detail" datas={dataDetailPokemon} inProp={showDetailPokemon} onClose={() => setshowDetailPokemon(false)} />
    </div>
  )
}

export default TaskList