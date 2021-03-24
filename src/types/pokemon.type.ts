export interface Pokemons {
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
  owned: number;
}

export interface MyPokemons {
  results: MyPokemon[];
}

export interface MyPokemon {
  id: number;
  name: string;
  nickname: string;
  isDelete: boolean;
}

export interface detailPokemon {
  id: number;
  name: string;
  nickname: string;
  height: number;
  weight: number;
  abilities: abilities[];
  types: types[];
  moves: moves[];
}

interface moves {
  move: move;
}

interface move {
  name: string
}

interface types {
  type: type;
}

interface type {
  name: string
}

interface abilities {
  ability: ability;
}

interface ability {
  name: string;
}