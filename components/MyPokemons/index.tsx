import React, { useState } from 'react'
import { useQuery } from 'react-query'

import { getListMyPokemon } from 'api/getMyPokemons'
import { getDetailPokemon } from 'api/getDetailPokemon'

import { detailPokemon } from 'types/pokemon.type'

import MyPokemonCard from 'components/MyPokemonCard'
import DetailPokemon from 'components/DetailPokemon'

const TaskList: React.FC = () => {
  const { isLoading, isError, error, data } = useQuery('myPokemons', getListMyPokemon)

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

  const callback = async (id: number, nickname: string) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    const res = await getDetailPokemon(url)
    
    const item: detailPokemon = {
      id: res.id,
      name: res.name,
      nickname: nickname,
      height: res.height,
      weight: res.weight,
      abilities: res.abilities,
      types: res.types,
      moves: res.moves.length > 4 ? res.moves.splice(0, 4) : res.moves
    }
    console.log('data id nya yg diklik', id)
    setshowDetailPokemon(true)
    setDataDetailPokemon(item)
  }
  
  return (
    <div>
      <p className="text-white text-xl mb-2 subpixel-antialiased tracking-wide font-bold">My Pokemons</p>
      <section className="flex flex-col overflow-x-hiden overflow-y-auto h-taskList rounded">

        {data?.results.map(pokemon => {
          return (
            <MyPokemonCard 
              key={pokemon.nickname}
              name={pokemon.name}
              nickname={pokemon.nickname}
              id={pokemon.id}
              isDelete={pokemon.isDelete}
              callBack={(id, nickname) => callback(id, nickname)}
            />
          )
        })}

      </section>
      <DetailPokemon tipe="myDetail" datas={dataDetailPokemon} inProp={showDetailPokemon} onClose={() => setshowDetailPokemon(false)} />
    </div>
  )
}

export default TaskList